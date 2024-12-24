package org.example.final_oop.service;

import org.example.final_oop.model.MenuItem;
import org.example.final_oop.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository repository;

    public List<MenuItem> getAllMenuItems() {
        return repository.findAll();
    }

    public MenuItem addMenuItem(MenuItem item) {
        return repository.save(item);
    }

    public void deleteMenuItem(Long id) {
        repository.deleteById(id);
    }


}
