package io.github.abbassizied.sms.controllers;

import java.util.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import io.github.abbassizied.sms.dtos.requests.*;
import io.github.abbassizied.sms.dtos.responses.*;
import io.github.abbassizied.sms.entities.*;
import io.github.abbassizied.sms.jwt.JwtUtils;
import io.github.abbassizied.sms.repositories.*;
import io.github.abbassizied.sms.services.UserDetailsImpl;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    // -----------------------------
    // 🔐 SIGNUP
    // -----------------------------
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user
        User user = User.builder()
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .build();

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            // Default role: USER
            Role defaultRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new IllegalStateException("Error: Default role not found."));
            roles.add(defaultRole);
        } else {
            strRoles.forEach(roleName -> {
                ERole eRole;
                switch (roleName.toLowerCase()) {
                    case "admin" -> eRole = ERole.ROLE_ADMIN;
                    case "super admin", "super_admin" -> eRole = ERole.ROLE_SUPER_ADMIN;
                    case "user" -> eRole = ERole.ROLE_USER;
                    default -> throw new IllegalArgumentException("Error: Unknown role " + roleName);
                }

                Role role = roleRepository.findByName(eRole)
                        .orElseThrow(() -> new IllegalStateException("Error: Role " + eRole + " not found."));
                roles.add(role);
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    // -----------------------------
    // 🔑 SIGNIN
    // -----------------------------
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = new ArrayList<>(userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .toList());

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

}