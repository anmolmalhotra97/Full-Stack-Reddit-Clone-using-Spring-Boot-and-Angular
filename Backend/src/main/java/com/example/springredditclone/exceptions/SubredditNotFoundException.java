package com.example.springredditclone.exceptions;

public class SubredditNotFoundException extends RuntimeException {

    public SubredditNotFoundException(String exceptionMessage) {
        super(exceptionMessage);
    }
}
