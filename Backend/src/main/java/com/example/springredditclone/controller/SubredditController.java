package com.example.springredditclone.controller;

import com.example.springredditclone.dto.SubredditDto;
import com.example.springredditclone.service.SubredditService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/subreddit")
@AllArgsConstructor
@Slf4j
public class SubredditController {

    @Autowired
    private SubredditService subredditService;

    @PostMapping(value = "")
    public ResponseEntity<SubredditDto> createSubreddit(@RequestBody SubredditDto subRedditDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(subredditService.save(subRedditDto));
    }

    @GetMapping(value = "")
    public ResponseEntity<List<SubredditDto>> getAllSubreddits() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(subredditService.getAll());
    }
}
