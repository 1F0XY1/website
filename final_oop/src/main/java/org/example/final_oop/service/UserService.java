package org.example.final_oop.service;

import org.example.final_oop.model.User;
import org.example.final_oop.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository repository;

    public User registerUser(User user) {
        try {
            // Clear any provided ID to ensure auto-generation
            user.setId(null);

            // Validate user data
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                throw new IllegalArgumentException("Username cannot be empty");
            }
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("Email cannot be empty");
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                throw new IllegalArgumentException("Password cannot be empty");
            }

            // Check if email already exists
            if (repository.existsByEmail(user.getEmail())) {
                throw new IllegalArgumentException("Email is already in use");
            }

            logger.info("Attempting to save user: {}", user.getEmail());
            User savedUser = repository.save(user);
            logger.info("User saved successfully with ID: {}", savedUser.getId());

            return savedUser;
        } catch (Exception e) {
            logger.error("Error saving user", e);
            throw new RuntimeException("Failed to save user: " + e.getMessage());
        }
    }

    public Optional<User> getUserById(Long id) {
        return repository.findById(id);
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public Optional<User> loginUser(String email, String password) {
        return repository.findByEmail(email);
    }

    public User updateUsername(Long id, String newUsername) {
        if (newUsername == null || newUsername.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }

        User user = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setUsername(newUsername.trim());
        return repository.save(user);
    }

    public User updateEmail(Long id, String newEmail) {
        if (newEmail == null || newEmail.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }

        User user = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Check if new email is already in use by another user
        if (!user.getEmail().equals(newEmail) && repository.existsByEmail(newEmail)) {
            throw new IllegalArgumentException("Email is already in use");
        }

        user.setEmail(newEmail.trim());
        return repository.save(user);
    }
    public User updatePassword(Long id, String newPassword) {
        if (newPassword == null || newPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }

        User user = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setPassword(newPassword);
        return repository.save(user);
    }
}
