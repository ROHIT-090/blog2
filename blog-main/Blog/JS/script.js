let blogsArray = JSON.parse(localStorage.getItem('blogsArray')) || [];

function isLoggedIn() {
    return localStorage.getItem('loggedInUser') !== null;
}
function updateAuthButton() {
    const authButton = document.getElementById('auth-button');
    const welcomeUser = document.getElementById('welcome-user');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (isLoggedIn()) {
        authButton.innerText = 'Sign Out';
        welcomeUser.innerText = `Welcome, ${loggedInUser.name}`;
    } else {
        authButton.innerText = 'Login/Signup';
        welcomeUser.innerText = '';  // Clear the username if not logged in
    }
}

function handleAuthButton() {
    const authButton = document.getElementById('auth-button');
    if (isLoggedIn()) {
        localStorage.removeItem('loggedInUser');
        alert('You have been signed out.');
        updateAuthButton();
    } else {
        window.location.href = 'login.html';
    }
}


function renderBlogs() {
    const blogsContainer = document.getElementById('blogs');
    blogsContainer.innerHTML = '';

    blogsArray.forEach((blog, index) => {
        const blogSection = document.createElement('section');
        blogSection.classList.add('blog-post');
        blogSection.innerHTML = `
            <h2 id="blog${index}" >${blog.title}</h2>
            <p class="summary">${blog.summary}</p>
            <button class="read-more-btn" data-id="blog${index}-content">Read More</button>
        `;
        blogsContainer.appendChild(blogSection);
    });

    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const blogId = button.getAttribute('data-id').split('-')[0].replace('blog', '');
            const blog = blogsArray[blogId];

          
            localStorage.setItem('currentBlog', JSON.stringify(blog));

            
            window.location.href = 'blogpost.html';
        });
    });
}
function addBlog(newBlog) {
   
    blogsArray.push(newBlog);
    
    localStorage.setItem('blogsArray', JSON.stringify(blogsArray));
}

if (window.location.pathname.includes('createblog.html')) {
    if (!isLoggedIn()) {
        alert('You need to log in to create a blog. Redirecting to login/signup...');
        window.location.href = 'login.html'; // Redirect to your login page
    } else {
        document.getElementById('blog-form').addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('blog-title').value;
            const summary = document.getElementById('blog-summary').value;
            const content = document.getElementById('blog-content').value;

            const newBlog = {
                title,
                summary,
                content
            };

            addBlog(newBlog);
            window.location.href = 'index.html';
        });
    }
}


if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    renderBlogs();
    updateAuthButton(); 
}
