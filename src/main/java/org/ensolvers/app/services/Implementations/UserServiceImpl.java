package org.ensolvers.app.services.Implementations;

import org.ensolvers.app.models.User;
import org.ensolvers.app.repositories.UserRepository;
import org.ensolvers.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> listAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)

    public Optional<User> listUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findUser(String username, String password) {
        User user = userRepository.findUserByUserName(username);

        if (user != null && user.getPassword().equals(password)) {
            return Optional.of(user);
        } else {
            return Optional.empty();
        }
    }

}
