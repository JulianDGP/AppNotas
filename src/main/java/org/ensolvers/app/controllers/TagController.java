package org.ensolvers.app.controllers;

import jakarta.validation.Valid;
import org.ensolvers.app.models.Tags;
import org.ensolvers.app.repositories.TagsRepository;
import org.ensolvers.app.services.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class TagController {

    private final TagsRepository tagsRepository;
    private final TagsService tagsService;

    @Autowired
    public TagController(TagsRepository tagsRepository, TagsService tagsService) {
        this.tagsRepository = tagsRepository;
        this.tagsService = tagsService;
    }

    @GetMapping("/tags")
    public Iterable<Tags> getAllTags() {
        return tagsRepository.findAll();
    }

    @PostMapping( "/tags")
    public ResponseEntity<?> registerTag(@Valid @RequestBody Tags tag, BindingResult result) {
        if (result.hasErrors()) {
            return validate(result);
        }
        Optional<Tags> existingTag = tagsRepository.findByName(tag.getName());

        if(existingTag.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Collections.singletonMap("error", "The tag already exists in the database"));
        }

        Tags tagDb = tagsService.registerTag(tag);
        return ResponseEntity.status(HttpStatus.CREATED).body(tagDb);
    }

    @PutMapping("/tags/{id}")
    public ResponseEntity<?> updateTag(@Valid @RequestBody Tags tag, BindingResult result, @PathVariable Long id) {
        if (result.hasErrors()) {
            return validate(result);
        }
        Optional<Tags> o = tagsService.listTagById(id);
        if (o.isPresent()) {
            Tags tagDb = o.get();
            tagDb.setName(tag.getName());
            return ResponseEntity.status(HttpStatus.OK).body(tagsService.registerTag(tagDb));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/tags/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Tags> o = tagsService.listTagById(id);
        if (o.isPresent()) {
            tagsService.deleteTags(id);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    private static ResponseEntity<Map<String, String>> validate(BindingResult result) {
        Map<String, String> errores = new HashMap<>();
        result.getFieldErrors().forEach(err -> errores.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errores);
    }

}
