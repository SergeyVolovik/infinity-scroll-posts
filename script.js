const posts__container = document.getElementById('posts-container'),
    loader = document.getElementById('loader'),
    filter = document.getElementById('filter');

let limit = 5,
    page = 1;

async function getPosts() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    const data = await res.json();
    return data;
}

async function showPost() {
    const posts = await getPosts();

    posts.forEach((post) => {
        const post__body = document.createElement('div');
        post__body.classList.add('post');
        post__body.innerHTML = `
            <div class="post-number">${post.id}</div>
                <div class="post-info">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-body">
                    ${post.body}
                    </p>
            </div>
        `;

        posts__container.appendChild(post__body);
    });
}

function filterPosts(e) {
    const term = e.target.value.toUpperCase(),
        posts = document.querySelectorAll('.post');

    posts.forEach((post) => {
        const post__title = post
                .querySelector('.post-title')
                .innerText.toUpperCase(),
            post__text = post
                .querySelector('.post-body')
                .innerText.toUpperCase();

        if (post__title.indexOf(term) > -1 || post__text.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

showPost();

filter.addEventListener('input', filterPosts);

function showLoader() {
    loader.classList.add('show');

    setTimeout(() => {
        loader.classList.remove('show');

        setTimeout(() => {
            page++;
            showPost();
        }, 100);
    }, 1000);
}

window.addEventListener('scroll', () => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoader();
    }
});
