package org.example.final_oop.controller;

import org.example.final_oop.model.Contact;
import org.example.final_oop.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<?> submitContact(@RequestBody Contact contact) {
        try {
            Contact savedContact = contactService.saveContact(contact);
            return ResponseEntity.ok(savedContact);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error submitting contact form: " + e.getMessage());
        }
    }

    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }
} 