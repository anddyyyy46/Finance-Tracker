package com.finance_tracker.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.finance_tracker.backend.Exception.UserNotFoundException;
import com.finance_tracker.backend.dto.ReadUserDto;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public UserService(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
        return user;
    }

    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
        return user;
    }

    public boolean userWithEmailExists(String email) {
        return userRepository.findByEmail(email) == null;
    }

    public ReadUserDto getUserDetails(Authentication authentication) {
        String email = authentication.getName();
        User user = this.getUserByEmail(email);
        ReadUserDto readUserDto = modelMapper.map(user, ReadUserDto.class);
        System.out.println(readUserDto.toString());
        return readUserDto;

    }
}
