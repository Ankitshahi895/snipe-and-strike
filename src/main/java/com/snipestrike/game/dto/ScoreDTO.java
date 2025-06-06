package com.snipestrike.game.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ScoreDTO {
    @NotNull(message = "Name cannot be null")
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    public String name;

    @Min(value = 0, message = "Score must be a positive number")
    public int score;
}
