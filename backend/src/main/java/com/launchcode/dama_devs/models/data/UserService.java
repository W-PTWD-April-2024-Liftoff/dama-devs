package com.launchcode.dama_devs.models.data;

import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.dto.UserDTO;

import java.util.List;

public interface UserService {
    void updateUserRole(Integer userId, String roleName);

    List<User> getAllUsers();

    UserDTO getUserById(Integer id);

    User findByUsername(String username);
}