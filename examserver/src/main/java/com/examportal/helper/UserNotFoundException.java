package com.examportal.helper;

public class UserNotFoundException extends Exception {
    
    public UserNotFoundException() {
        super("User of this name does not exist in the DB! Try again with a new username!");
    }
    
    public UserNotFoundException(String msg) {
        super(msg);
    }
}