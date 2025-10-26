package io.github.abbassizied.sms.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import io.github.abbassizied.sms.entities.ERole;
import io.github.abbassizied.sms.entities.Role;
import io.github.abbassizied.sms.repositories.RoleRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

/**
 * Initializes default roles at application startup if they don't exist.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("Initializing default roles...");
        createRoleIfNotFound(ERole.ROLE_ADMIN);
        createRoleIfNotFound(ERole.ROLE_SUPER_ADMIN);
        createRoleIfNotFound(ERole.ROLE_USER);
        // Add other roles as needed
        log.info("Role initialization completed.");
    }

    private void createRoleIfNotFound(ERole roleName) {
        Optional<Role> role = roleRepository.findByName(roleName);
        if (role.isEmpty()) {
            Role newRole = new Role();
            newRole.setName(roleName);
            roleRepository.save(newRole);
            log.info("Created role: {}", roleName);
        } else {
            log.debug("Role already exists: {}", roleName);
        }
    }
}