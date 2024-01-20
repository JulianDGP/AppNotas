package org.ensolvers.app.services;


import org.ensolvers.app.models.Notes;
import org.ensolvers.app.models.Tags;

import java.util.Optional;

public interface TagsService {
    Optional<Tags> listTagById(Long tagId);

    Tags registerTag(Tags tag);

    void deleteTags(Long id);
}
