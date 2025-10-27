package com.mibcommerce.auth.controller;

import com.mibcommerce.auth.dto.JwtRequestDto;
import com.mibcommerce.auth.dto.JwtResponseDto;
import com.mibcommerce.auth.dto.RegisterRequestDto;
import com.mibcommerce.auth.dto.RegisterResponseDto;
import com.mibcommerce.auth.entity.User;
import com.mibcommerce.auth.repository.UserRepository;
import com.mibcommerce.auth.security.JwtHelper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JwtHelper jwtHelper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserDetailsService userDetailsService,
                          AuthenticationManager authenticationManager,
                          JwtHelper jwtHelper,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
        this.jwtHelper = jwtHelper;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDto registerRequest) {

        // Check if username already exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(RegisterResponseDto.builder()
                            .message("Error: Username is already taken!")
                            .build());
        }

        // Check if email already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(RegisterResponseDto.builder()
                            .message("Error: Email is already in use!")
                            .build());
        }

        // Create new user
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");

        User user = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .phoneNumber(registerRequest.getPhoneNumber())
                .roles(roles)
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok(RegisterResponseDto.builder()
                .message("User registered successfully!")
                .username(user.getUsername())
                .email(user.getEmail())
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> login(@RequestBody JwtRequestDto jwtRequestDto) {
        authenticate(jwtRequestDto.getUsername(), jwtRequestDto.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequestDto.getUsername());
        String token = jwtHelper.generateToken(userDetails);

        JwtResponseDto response = JwtResponseDto.builder()
                .username(userDetails.getUsername())
                .token(token)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDetails> getLoggedInUser(@RequestHeader("Authorization") String tokenHeader) {
        String token = extractTokenFromHeader(tokenHeader);
        if(token != null) {
            String username = jwtHelper.getUsernameFromToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            return new ResponseEntity<>(userDetails, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    private String extractTokenFromHeader(String tokenHeader) {
        if(tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            return tokenHeader.substring(7);
        }
        return null;
    }

    private void authenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);
        try{
            authenticationManager.authenticate(authenticationToken);
        }catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password.");
        }
    }
}