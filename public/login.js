document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
      
        // Implement your authentication logic here
        if (username === 'admin' && password === 'admin') {
          alert('Login successful');
          // Redirect to the course form page after successful login
          window.location.href = 'form';
        } else {
          alert('Invalid username or password');
        }
      });
    }
  });
  