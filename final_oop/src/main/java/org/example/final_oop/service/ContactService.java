package org.example.final_oop.service;

import org.example.final_oop.model.Contact;
import org.example.final_oop.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public Contact saveContact(Contact contact) {
        contact.setTimestamp(LocalDateTime.now().toString());
        return contactRepository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }
} 