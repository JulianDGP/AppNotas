package org.ensolvers.app.models.dtos;

import java.io.Serializable;

public class UserDto implements Serializable {

    private Long id;
    private String name;
    private String userName;

    // Constructor
    public UserDto(Long id, String name, String userName) {
        this.id = id;
        this.name = name;
        this.userName = userName;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUserName() {
        return userName;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
