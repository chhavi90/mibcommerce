package com.mibcommerce.auth.controller;

import com.mibcommerce.auth.dto.JwtRequestDto;
import com.mibcommerce.auth.dto.JwtResponseDto;
import com.mibcommerce.auth.security.JwtHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JwtHelper jwtHelper;

    public AuthController(UserDetailsService userDetailsService,
                          AuthenticationManager authenticationManager,
                          JwtHelper jwtHelper) {
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
        this.jwtHelper = jwtHelper;
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
