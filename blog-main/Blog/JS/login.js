const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleButton = document.getElementById('toggle-btn');
const toggleText = document.getElementById('toggle-text');
const messageDiv = document.getElementById('message');

// Toggle between login and signup forms
toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (signupForm.style.display === "none") {
        signupForm.style.display = "block";
        loginForm.style.display = "none";
        toggleText.innerHTML = "Already have an account? <a href='#' id='toggle-btn'>Log In</a>";
        document.getElementById('form-title').innerText = "Sign Up";
    } else {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
        toggleText.innerHTML = "Don't have an account? <a href='window.location.href='login.html'' id='toggle-btn'>Sign Up</a>";
        document.getElementById('form-title').innerText = "Login";
    }
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Retrieve existing users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let existingUser = users.find(user => user.email === email);

    if (existingUser && existingUser.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(existingUser));
        messageDiv.innerText = 'Login successful! Redirecting to homepage...';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        messageDiv.innerText = 'Incorrect email or password. Please try again.';
    }
});


signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name=document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const user=document.getElementById('welcome-user');

    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let existingUser = users.find(user => user.email === email);

    if (!existingUser) {
        
        const newUser = { name,email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        messageDiv.innerText = 'Sign up successful! Redirecting to homepage...';
        user.innerText=`${name}`;
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        messageDiv.innerText = 'Email already exists. Please log in instead.';
    }
});
