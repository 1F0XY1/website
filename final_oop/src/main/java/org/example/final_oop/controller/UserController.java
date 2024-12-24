package org.example.final_oop.controller;

import org.example.final_oop.model.LoginRequest;
import org.example.final_oop.model.User;
import org.example.final_oop.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            logger.info("Received registration request for email: {}", user.getEmail());
            User savedUser = service.registerUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            logger.error("Registration failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during registration", e);
            return ResponseEntity.internalServerError().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            logger.info("Login attempt for email: {}", loginRequest.getEmail());
            Optional<User> user = service.loginUser(loginRequest.getEmail(), loginRequest.getPassword());

            if (user.isPresent()) {
                User loggedInUser = user.get();
                // Don't send password back to client
                loggedInUser.setPassword(null);
                return ResponseEntity.ok(loggedInUser);
            } else {
                return ResponseEntity.status(401).body("Invalid email or password");
            }
        } catch (Exception e) {
            logger.error("Login failed: ", e);
            return ResponseEntity.internalServerError().body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = service.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @GetMapping
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

}
