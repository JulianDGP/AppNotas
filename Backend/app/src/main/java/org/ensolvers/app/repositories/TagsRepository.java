package org.ensolvers.app.repositories;

import org.ensolvers.app.models.Tags;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TagsRepository extends CrudRepository<Tags, Long> {
    Optional<Tags> findByName(String name);
}
