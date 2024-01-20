package org.ensolvers.app.repositories;

import org.ensolvers.app.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Long> {
}
