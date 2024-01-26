package org.ensolvers.app.repositories;

import org.ensolvers.app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findUserByUserName(String username);
}
