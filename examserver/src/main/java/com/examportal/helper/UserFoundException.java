package com.examportal.helper;

public class UserFoundException extends Exception {
    public UserFoundException() {
        super("User of this name already exists in the DB! Try again with a new username!");
    }
    
    public UserFoundException(String msg) {
        super(msg);
    }
}