const API_URL = 'http://localhost:8085';

// Register a new user
export async function registerUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Register failed: ${response.status}`);
    }
    const msg = await response.text();
    Swal.fire('Success', msg, 'success');
    return msg;
  } catch (error) {
    Swal.fire('Error', error.message || 'Registration failed', 'error');
    throw error;
  }
}

// Login user
export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include',
      body: new URLSearchParams({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Invalid username or password');
    }
    Swal.fire('Logged In', 'You have successfully logged in.', 'success');
    return 'Login successful';
  } catch (error) {
    Swal.fire('Login Failed', error.message || 'Please try again', 'error');
    throw error;
  }
}

// Logout user
export async function logoutUser() {
  try {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Logout failed');
    Swal.fire('Logged Out', 'You have been logged out.', 'success');
    return 'Logout successful';
  } catch (error) {
    Swal.fire('Error', error.message || 'Logout failed', 'error');
    throw error;
  }
}

// Submit score for logged in user
export async function submitScore(name, score) {
  try {
    const response = await fetch(`${API_URL}/scores/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, score }),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Submit score failed: ${response.status}`);
    }
    const msg = await response.text();
    Swal.fire('Score Submitted', msg, 'success');
    return msg;
  } catch (error) {
    Swal.fire('Error', error.message || 'Submit score failed', 'error');
    throw error;
  }
}

export async function fetchHighScores() {
    try {
        const response = await fetch(`${API_BASE_URL}/scores/high-scores`, {
            method: 'GET',
            credentials: 'include', // Include cookies for authenticated requests
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const scores = await response.json();
        return Array.isArray(scores) ? scores : [];
    } catch (error) {
        console.error('Failed to fetch high scores:', error);
        return []; // Return empty array on failure
    }
}
export function renderScores(container, scores) {
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Handle empty state
    if (!scores || scores.length === 0) {
        container.innerHTML = '<li>No scores yet. Be the first!</li>';
        return;
    }

    // Render each score
    scores.slice(0, 10).forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${index + 1}. ${score.playerName || score.name}</span>
            <span>${score.score}</span>
        `;
        container.appendChild(listItem);
    });
}

export async function initScoreDisplay() {
    try {
        const scoresListElement = document.getElementById('scores-list');
        if (scoresListElement) {
            const scores = await fetchHighScores();
            renderScores(scoresListElement, scores);
        }
    } catch (error) {
        console.error('Failed to initialize score display:', error);
    }
}

// Initialize when imported
document.addEventListener('DOMContentLoaded', initScoreDisplay);
