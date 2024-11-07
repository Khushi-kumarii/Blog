// Fetch and display courses
fetch('/courses')
    .then(response => response.json())
    .then(courses => {
        const courseList = document.getElementById('course-list');
        courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <button onclick="redirectToPayment()">Buy Now</button>
            `;
            courseList.appendChild(courseDiv);
        });
    })
    .catch(error => console.error('Error:', error));

// Fetch and display blog posts
fetch('/blog')
    .then(response => response.json())
    .then(posts => {
        const blogList = document.getElementById('blog-list');
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p><em>Publish Date: ${post.publish_time}</em></p>
            `;
            blogList.appendChild(postDiv);
        });
    })
    .catch(error => console.error('Error:', error));

function redirectToPayment() {
    window.location.href = '/payment';
}
