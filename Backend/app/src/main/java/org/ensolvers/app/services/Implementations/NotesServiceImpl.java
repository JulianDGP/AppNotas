package org.ensolvers.app.services.Implementations;

import org.ensolvers.app.models.Notes;
import org.ensolvers.app.models.Tags;
import org.ensolvers.app.models.User;
import org.ensolvers.app.repositories.NotesRepository;
import org.ensolvers.app.repositories.TagsRepository;
import org.ensolvers.app.repositories.UserRepository;
import org.ensolvers.app.services.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NotesServiceImpl implements NotesService {

    private final NotesRepository notesRepository;
    private final UserRepository userRepository;

    private final TagsRepository tagsRepository;
    @Autowired
    public NotesServiceImpl(NotesRepository notesRepository, UserRepository userRepository, TagsRepository tagsRepository) {
        this.notesRepository = notesRepository;
        this.userRepository = userRepository;
        this.tagsRepository = tagsRepository;
    }


    @Override
    @Transactional(readOnly = true)
    public List<Notes> listAllNotesByUser(Long userId) {
        return notesRepository.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Notes> listNoteById(Long id) {
        return notesRepository.findById(id);
    }

    @Override
    @Transactional
    public Notes registerNote(Long userId, Notes note) {
        Optional<User> o = userRepository.findById(userId);
        if (o.isPresent()) {
            User user = o.get();
            note.setUser(user);

            if (note.getTags() != null) {
                List<Tags> updatedTags = new ArrayList<>();
                for (Tags tag : note.getTags()) {
                    // Check if the tag with this name already exists
                    Optional<Tags> existingTag = tagsRepository.findByName(tag.getName());
                    if (existingTag.isPresent()) {
                        // Use the existing tag
                        updatedTags.add(existingTag.get());
                    } else {
                        // Save the new tag
                        updatedTags.add(tagsRepository.save(tag));
                    }
                }
                // Set the updated list of tags to the note
                note.setTags(updatedTags);
            }

        }
        return notesRepository.save(note);
    }

    @Override
    @Transactional
    public void deleteNotes(Long id) {
        notesRepository.deleteById(id);
    }

    @Override
    @Transactional
    public List<Notes> getNotesByTag(String tagName) {
        return notesRepository.findByTags_Name(tagName);
    }
}