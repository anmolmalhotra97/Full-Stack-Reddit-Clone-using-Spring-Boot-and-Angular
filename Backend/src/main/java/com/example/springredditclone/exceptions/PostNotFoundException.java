package com.example.springredditclone.exceptions;

public class PostNotFoundException extends RuntimeException {
    public PostNotFoundException(String exceptionMessage) {
        super(exceptionMessage);
    }
}
