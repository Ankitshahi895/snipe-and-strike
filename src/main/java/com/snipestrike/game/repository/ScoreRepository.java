package com.snipestrike.game.repository;

import com.snipestrike.game.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByUserId(Long userId);

    // Fetch top N scores ordered by score descending
    List<Score> findTop10ByOrderByScoreDesc();
}
