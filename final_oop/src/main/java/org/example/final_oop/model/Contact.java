package org.example.final_oop.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "contacts")
@Data
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, length = 1000)
    private String message;

    private String timestamp;
} 