package org.ensolvers.app.controllers;

import jakarta.validation.Valid;
import org.ensolvers.app.models.Notes;
import org.ensolvers.app.services.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class NoteController {

    private final NotesService notesService;

    @Autowired
    public NoteController(NotesService notesService) {
        this.notesService = notesService;
    }


    @GetMapping("/{userId}/notes")
    public ResponseEntity<List<Notes>> listAllNotesForUser(@PathVariable Long userId){
        return ResponseEntity.ok(notesService.listAllNotesByUser(userId));
    }

    @GetMapping("/{userId}/notes/{id}")
    public ResponseEntity<?> getNoteById(@PathVariable Long userId, @PathVariable Long id) {
        Optional<Notes> note = notesService.listNoteById(id);
        if (note.isPresent()) {
            if (note.get().getUser().getId().equals(userId)) {
                return ResponseEntity.ok(note.get());
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("error", "No tienes acceso a esta nota"));
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{userId}/notes/tags/{tagName}")
    public ResponseEntity<List<Notes>> getNotesByTagName(@PathVariable Long userId, @PathVariable String tagName) {
        List<Notes> notes = notesService.getNotesByTag(tagName);

        // Filtra las notas para solo incluir aquellas que pertenecen al usuario
        List<Notes> filteredNotes = notes.stream()
                .filter(note -> note.getUser().getId().equals(userId))
                .collect(Collectors.toList());

        return ResponseEntity.ok(filteredNotes);
    }


    @PostMapping("/{userId}/notes")
    public ResponseEntity<?> createNote(@PathVariable Long userId,
                                        @Valid @RequestBody Notes note, BindingResult result){
        if(result.hasErrors()){
            return validate(result);
        }

        Notes noteDb = notesService.registerNote(userId,note);
        return ResponseEntity.status(HttpStatus.CREATED).body(noteDb);

    }

    @PutMapping("/{userId}/notes/{id}")
    public ResponseEntity<?> updateNote(@PathVariable Long userId, @PathVariable Long id,
                                        @Valid @RequestBody Notes noteDetails, BindingResult result) {
        if (result.hasErrors()) {
            return validate(result);
        }

        Optional<Notes> noteFromDB = notesService.listNoteById(id);
        if (noteFromDB.isPresent()) {
            if (noteFromDB.get().getUser().getId().equals(userId)) {
                Notes note = noteFromDB.get();
                note.setTitle(noteDetails.getTitle());
                note.setContent(noteDetails.getContent());
                note.setTags(noteDetails.getTags());
                notesService.registerNote(userId, note);
                return ResponseEntity.ok(note);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("error", "No tienes acceso para editar esta nota"));
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{userId}/notes/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long userId, @PathVariable Long id) {
        Optional<Notes> noteFromDB = notesService.listNoteById(id);
        if (noteFromDB.isPresent()) {
            if (noteFromDB.get().getUser().getId().equals(userId)) {
                notesService.deleteNotes(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("error", "No tienes acceso para eliminar esta nota"));
            }
        }
        return ResponseEntity.notFound().build();
    }

    private static ResponseEntity<Map<String, String>> validate(BindingResult result) {
        Map<String, String> errores = new HashMap<>();
        result.getFieldErrors().forEach(err -> errores.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errores);
    }
}


/*    @GetMapping("/{userId}/notes/{id}")
    public ResponseEntity<?> getNoteById(@PathVariable Long userId, @PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();

        Optional<Notes> note = notesService.listNoteById(id);
        if (note.isPresent()) {
            if (note.get().getUser().getUserName().equals(loggedInUsername)) {
                return ResponseEntity.ok(note.get());
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("error", "No tienes acceso a esta nota"));
            }
        }
        return ResponseEntity.notFound().build();
    }*/