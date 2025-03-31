# Task Name - Infinite Scrolling Content Loader

-  Create a Infinite Scrolling content loader page when a user scroll the page and come to end of the page content then dynamically loads the content according to limit based.

# Step By Step Explanation

1. Variable Declartions

```
const postcontainer = document.getElementById("container");
const loading = document.querySelector(".loader");

let limit = 10;
let page = 1;
```

- `postcontainer` - Stores a reference to the container element where the posts will be displayed.
- `loading` - Stores a reference to the loader element that shows a loading animation while new posts are being fetched.
- `limit` - The number of posts to fetch per request.
- `page`- Tracks the current page number to be fetched.

2. Fetching the Posts

```
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
```

- Uses `async` to define an asynchronous function.
- Uses `fetch()` to get data from a public API:
- The `_limit` query parameter specifies how many posts to fetch at a time.
- The `_page` parameter specifies which page of posts to retrieve.
- Parses the JSON data using await `res.json()`.
- Returns the fetched data.

3. Displaying the post

```
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

```

- Calls `getPosts()` to fetch the list of posts.
- Loops through each post using `forEach()` and dynamically creates a `div` element for each post.
- Adds the `post` CSS class to the newly created element.
- Uses `innerHTML` to insert the post's ID, title, and body.
- Appends the newly created post element to the `postcontainer`.

4. Load More post functions

```
function loadMorePosts() {
    loading.classList.add("show");

    setTimeout(() => {
        page++;
        displayPosts();
        loading.classList.remove("show");
    }, 1000);
}
```

- Adds the `show` class to the loader, making it visible.
- Uses `setTimeout()` to simulate a delay (1 second) for loading.
- Increments the `page` number to load the next set of posts.
- Calls `displayPosts()` to fetch and display more posts.
- Removes the `show` class to hide the loader.

5. Infinite Scrolling Display 

```
window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMorePosts();
    }
});
```

- Attaches an event listener to the scroll event on the window object.
- Uses destructuring assignment to get:
        1. `scrollTop`: The number of pixels scrolled from the top.
        2. `scrollHeight`: The total height of the page content, including content not visible on the screen.
        3. `clientHeight`: The visible height of the content in the viewport.
- The condition checks whether the user has scrolled to the bottom (or near the bottom) of the page: This calculation ensures the next set of posts is loaded before reaching the absolute bottom.
- Calls `loadMorePosts()` to fetch and display the next batch.



# Infinite Content Scrolling Demo

![infinite-scrolling](./assets/scroll.gif)