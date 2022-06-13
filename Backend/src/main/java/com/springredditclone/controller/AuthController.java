package com.springredditclone.controller;

import com.springredditclone.dto.RegisterRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/auth")
public class AuthController {

    @PostMapping(value = "/signup")
    public void signup(@RequestBody RegisterRequest registerRequest){

    }
}
