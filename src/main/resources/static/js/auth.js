function register() {
  const user = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  fetch("/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(res => {
      if (res.ok) {
        return res.text();
      } else {
        return res.text().then(msg => Promise.reject(msg));
      }
    })
    .then(msg => {
      Swal.fire({
        icon: 'success',
        title: 'Registered Successfully!',
        text: 'Redirecting to login page...',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "/login"; // Update to your login route
      });
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err
      });
    });
}

function login() {
  const user = {
    username: document.getElementById("loginUsername").value,
    password: document.getElementById("loginPassword").value
  };

  fetch("/api/auth/login", { // Updated to match Spring Security endpoint
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(res => {
      if (res.ok) {
        window.location.href = "/index"; // Redirect to /index after successful login
      } else {
        return res.text().then(msg => alert(msg));
      }
    })
    .catch(err => console.error(err));
}

function logout() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out of the game.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      })
      .then(res => {
        if (res.ok) {
          Swal.fire({
            title: 'Logged out!',
            text: 'You have been successfully logged out.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            window.location.href = "/login"; // Adjust path as needed
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Logout failed. Try again.',
            icon: 'error'
          });
        }
      })
      .catch(err => {
        console.error("Logout error:", err);
        Swal.fire('Oops!', 'Something went wrong!', 'error');
      });
    }
  });
}
