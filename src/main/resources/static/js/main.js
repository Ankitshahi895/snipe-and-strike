import { Game } from './game.js';
import { fetchHighScores, submitScore, registerUser, loginUser, initScoreDisplay } from './api.js';

class GameApp {
  constructor() {
    this.game = new Game(document.getElementById('game-canvas'));
    this.initElements();
    this.bindEvents();
    this.initGame();
  }

  initElements() {
    // UI Elements
    this.gameMenu = document.getElementById('game-menu');
    this.gameOverScreen = document.getElementById('game-over');
    this.startButton = document.getElementById('start-game');
    this.restartButton = document.getElementById('restart-game');
    this.submitScoreButton = document.getElementById('submit-score');
    this.playerNameInput = document.getElementById('player-name');
    this.finalScoreElement = document.getElementById('final-score');
    this.scoresList = document.getElementById('scores-list');
    this.difficultySelect = document.getElementById('difficulty');
    this.logoutButton = document.getElementById('logout-btn');
  }

    bindEvents() {
      // Game control events
      if (this.startButton) {
        this.startButton.addEventListener('click', () => this.startGame());
      }

      if (this.restartButton) {
        this.restartButton.addEventListener('click', () => this.restartGame());
      }

      if (this.submitScoreButton) {
        this.submitScoreButton.addEventListener('click', () => this.handleScoreSubmission());
      }

      if (this.logoutButton) {
        this.logoutButton.addEventListener('click', () => this.handleLogout());
      }

      // Game event callbacks
      this.game.onGameOver = (score) => this.handleGameOver(score);
    }


  async initGame() {
    try {
      // Initialize score display
      await initScoreDisplay();

      // Load initial high scores
      const highScores = await fetchHighScores();
      this.displayHighScores(highScores);

      // Check authentication status
      await this.checkAuthStatus();
    } catch (error) {
      console.error('Initialization error:', error);
      this.displayHighScores([]);
    }
  }

  async startGame() {
    const selectedDifficulty = this.difficultySelect.value;
    this.game.setDifficulty(selectedDifficulty);
    this.gameMenu.classList.add('hidden');
    this.game.start();
  }

  restartGame() {
    this.gameOverScreen.classList.add('hidden');
    this.game.reset();
    this.game.start();
  }

  async handleScoreSubmission() {
    const playerName = this.playerNameInput.value.trim();
    if (!playerName) {
      Swal.fire('Error', 'Please enter your name', 'error');
      return;
    }

    try {
      this.submitScoreButton.disabled = true;
      this.submitScoreButton.textContent = 'Submitting...';

      await submitScore(playerName, this.game.score);

      const highScores = await fetchHighScores();
      this.displayHighScores(highScores);

      this.submitScoreButton.textContent = 'Submitted!';
      Swal.fire('Success', 'Score submitted successfully!', 'success');
    } catch (error) {
      console.error('Score submission failed:', error);
      this.submitScoreButton.disabled = false;
      this.submitScoreButton.textContent = 'Submit Score';
      Swal.fire('Error', 'Failed to submit score. Please try again.', 'error');
    }
  }

  handleGameOver(score) {
    this.finalScoreElement.textContent = score;
    this.gameOverScreen.classList.remove('hidden');
    this.playerNameInput.value = '';
    this.submitScoreButton.disabled = false;
    this.submitScoreButton.textContent = 'Submit Score';
  }

  displayHighScores(scores) {
    this.scoresList.innerHTML = '';

    if (!scores || scores.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No scores yet. Be the first!';
      this.scoresList.appendChild(li);
      return;
    }

    scores.slice(0, 10).forEach((score, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${index + 1}. ${score.playerName || score.name}</span>
        <span>${score.score || score.value}</span>
      `;
      this.scoresList.appendChild(li);
    });
  }

  async checkAuthStatus() {
    try {
      const response = await fetch('/api/auth/status', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Not authenticated');
      }

      const { authenticated, username } = await response.json();
      if (authenticated) {
        this.playerNameInput.value = username || '';
        this.playerNameInput.disabled = !!username;
      }
    } catch (error) {
      console.log('Authentication check:', error.message);
    }
  }

  async handleLogout() {
    try {
      const result = await Swal.fire({
        title: 'Logout?',
        text: 'Are you sure you want to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout'
      });

      if (result.isConfirmed) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        });
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
      Swal.fire('Error', 'Logout failed', 'error');
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GameApp();
});