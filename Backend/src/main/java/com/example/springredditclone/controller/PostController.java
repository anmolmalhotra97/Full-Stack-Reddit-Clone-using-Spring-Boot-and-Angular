package com.example.springredditclone.controller;

import com.example.springredditclone.dto.PostRequest;
import com.example.springredditclone.dto.PostResponse;
import com.example.springredditclone.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<Void> createPost(@RequestBody PostRequest postRequest) {
        postService.save(postRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return status(HttpStatus.OK).body(postService.getAllPosts());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
        return status(HttpStatus.OK).body(postService.getPostById(id));
    }

    @GetMapping(value = "by-subreddit/{id}")
    public ResponseEntity<List<PostResponse>> getAllPostsBySubreddit(@PathVariable  Long id) {
        return status(HttpStatus.OK).body(postService.getAllPostsBySubreddit(id));
    }

    @GetMapping(value = "by-user/{username}")
    public ResponseEntity<List<PostResponse>> getAllPostsBySubreddit(@PathVariable String username) {
        return status(HttpStatus.OK).body(postService.getAllPostsByUsername(username));
    }
}
