package org.example.final_oop.controller;

import org.example.final_oop.model.Booking;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    
    @GetMapping("/test")
    public ResponseEntity<String> testConnection() {
        return ResponseEntity.ok("Backend is connected!");
    }

    // Simulate a database
    private List<Booking> bookings = new ArrayList<>();

    // GET method to retrieve all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookings;
    }

    // POST method to create a new booking
    @PostMapping
    public ResponseEntity<String> createBooking(@RequestBody Booking booking) {
        try {
            bookings.add(booking);
            return ResponseEntity.ok("Booking created successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create booking: " + e.getMessage());
        }
    }

    // DELETE method to remove a booking
    @DeleteMapping("/{email}")
    public String deleteBooking(@PathVariable String email) {
        Optional<Booking> bookingToDelete = bookings.stream()
                .filter(booking -> booking.getEmail().equals(email))
                .findFirst();

        if (bookingToDelete.isPresent()) {
            bookings.remove(bookingToDelete.get());
            return "Booking with email " + email + " deleted successfully!";
        }
        return "Booking not found for email: " + email;
    }
}
