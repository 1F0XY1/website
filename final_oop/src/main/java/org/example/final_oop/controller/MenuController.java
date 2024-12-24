package org.example.final_oop.controller;

import org.example.final_oop.model.MenuItem;
import org.example.final_oop.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {

    @Autowired
    private MenuItemService service;

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return service.getAllMenuItems();
    }

    @PostMapping
    public MenuItem addMenuItem(@RequestBody MenuItem item) {
        return service.addMenuItem(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long id) {
        service.deleteMenuItem(id);
        return ResponseEntity.ok("Item deleted successfully.");
    }
}
