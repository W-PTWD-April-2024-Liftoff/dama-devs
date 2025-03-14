package com.launchcode.dama_devs.models;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import jakarta.persistence.Entity;

import java.util.ArrayList;
import java.util.List;


@Entity
public class User extends AbstractEntity {
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @NotNull
    private String username;

    @NotNull
    private String pwHash;

    @Getter
    @OneToMany(mappedBy = "user")
    private final List<Comment> comments = new ArrayList<>();

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.pwHash = encoder.encode(password);
    }

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }

    public String getUsername() {

        return username;
    }


}
