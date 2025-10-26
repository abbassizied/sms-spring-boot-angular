package io.github.abbassizied.sms.dtos.requests;

import java.util.Set;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    @NotBlank
    private String username;

    @Email
    private String email;

    private String password;

    private Set<String> roles;
}