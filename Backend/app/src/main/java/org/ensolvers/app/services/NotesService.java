package org.ensolvers.app.services;

import org.ensolvers.app.models.Notes;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface NotesService {

    List<Notes> listAllNotesByUser(Long userId);

    Optional<Notes> listNoteById(Long noteId);

    Notes registerNote(Long userId, Notes note);

    void deleteNotes(Long id);

    List<Notes> getNotesByTag(String tagName);

}
