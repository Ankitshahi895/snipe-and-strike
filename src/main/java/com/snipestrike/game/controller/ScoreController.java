package com.snipestrike.game.controller;

import com.snipestrike.game.dto.ScoreDTO;
import com.snipestrike.game.model.Score;
import com.snipestrike.game.repository.ScoreRepository;
import com.snipestrike.game.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/scores")
public class ScoreController {

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private UserRepository userRepository;

    // POST /scores/submit - Submits a score for the authenticated user
    @PostMapping("/submit")
    public ResponseEntity<String> submitScore(@RequestBody ScoreDTO scoreDto) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = principal.getUsername();

        var optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        var user = optionalUser.get();

        Score score = new Score();
        score.setUserId(user.getId());
        score.setName(scoreDto.name);     // Set name from DTO
        score.setScore(scoreDto.score);   // Set score from DTO

        scoreRepository.save(score);
        return ResponseEntity.ok("Score submitted successfully!");
    }


    // GET /scores - Public endpoint to list all scores
    @GetMapping
    public ResponseEntity<List<Score>> getAllScores() {
        List<Score> scores = scoreRepository.findAll();
        return ResponseEntity.ok(scores);
    }

    // GET /scores/user/{userId} - Authenticated user can get only their own scores
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Score>> getUserScores(@PathVariable Long userId) {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = principal.getUsername();

        var optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty() || !optionalUser.get().getId().equals(userId)) {
            return ResponseEntity.status(403).body(null); // Forbidden
        }

        List<Score> scores = scoreRepository.findByUserId(userId);
        return ResponseEntity.ok(scores);
    }
    @GetMapping("/high-scores")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<List<Score>> getTopScores() {
        List<Score> topScores = scoreRepository.findTop10ByOrderByScoreDesc();
        return ResponseEntity.ok(topScores);
    }

}
