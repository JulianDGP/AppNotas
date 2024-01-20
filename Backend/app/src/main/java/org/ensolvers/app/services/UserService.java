package org.ensolvers.app.services;

import org.ensolvers.app.models.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    List<User> listAllUsers();

    Optional<User> listUserById(Long id);

    User registerUser(User user);

    void deleteUser(Long id);
    String findUser(String username, String password);

}
