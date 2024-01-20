package org.ensolvers.app.controllers;

import org.ensolvers.app.models.Notes;
import org.ensolvers.app.models.Tags;
import org.ensolvers.app.repositories.TagsRepository;
import org.ensolvers.app.services.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagController {

    private final TagsRepository tagsRepository;

    @Autowired
    public TagController(TagsRepository tagsRepository) {
        this.tagsRepository = tagsRepository;
    }

    @GetMapping("/tags")
    public Iterable<Tags> getAllTags() {
        return tagsRepository.findAll();
    }




}
