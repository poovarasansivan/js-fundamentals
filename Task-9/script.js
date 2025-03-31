const postcontainer = document.getElementById("container");
const loading = document.querySelector(".loader");

let limit = 10;
let page = 1;

async function getPosts() {
    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
        );
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
}

async function displayPosts() {
    const posts = await getPosts();

    posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        postcontainer.appendChild(postElement);
    });
}

function loadMorePosts() {
    loading.classList.add("show");

    setTimeout(() => {
        page++;
        displayPosts();
        loading.classList.remove("show");
    }, 1000);
}

displayPosts();

window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMorePosts();
    }
});
