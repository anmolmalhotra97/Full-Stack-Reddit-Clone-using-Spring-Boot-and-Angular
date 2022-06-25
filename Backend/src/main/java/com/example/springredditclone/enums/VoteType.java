package com.example.springredditclone.enums;

import com.example.springredditclone.exceptions.SpringRedditException;

import java.util.Arrays;

public enum VoteType {
    UP_VOTE(1), DOWN_VOTE(-1);

    private int direction;

    VoteType(int direction) {
    }

    public static VoteType lookup(Integer direction) {
        return Arrays.stream(VoteType.values())
                .filter(value -> value.getDirection().equals(direction))
                .findAny()
                .orElseThrow(() -> new SpringRedditException("Vote Not Found"));
    }

    private Integer getDirection() {
        return direction;
    }

}
