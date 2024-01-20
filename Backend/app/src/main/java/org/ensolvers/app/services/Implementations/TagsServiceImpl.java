package org.ensolvers.app.services.Implementations;

import org.ensolvers.app.models.Tags;
import org.ensolvers.app.repositories.TagsRepository;
import org.ensolvers.app.services.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TagsServiceImpl implements TagsService {

    private final TagsRepository tagsRepository;

    @Autowired
    public TagsServiceImpl(TagsRepository tagsRepository) {
        this.tagsRepository = tagsRepository;
    }

    @Override
    public Optional<Tags> listTagById(Long tagId) {
        return tagsRepository.findById(tagId);
    }

    @Override
    public Tags registerTag(Tags tag) {
        return tagsRepository.save(tag);
    }

    @Override
    public void deleteTags(Long id) {
        tagsRepository.deleteById(id);
    }
}
