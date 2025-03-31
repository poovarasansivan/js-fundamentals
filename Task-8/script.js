const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    window.location.hash = href;
    handleLocation();
};

const routes = {
    "/": "Home",
    "/services": "Services",
    "/about": "About",
    "/contact": "Contact"
};

const handleLocation = async () => {
    const path = window.location.hash.replace("#", "") || "/";
    const route = routes[path] || "Home";
    try {
        const response = await fetch(`./pages/${route}.html`);
        if (!response.ok) throw new Error("Page not found");
        const html = await response.text();
        document.getElementById("content").innerHTML = html;
        document.title = route;
    } catch (error) {
        document.getElementById("content").innerHTML = `<h1>404 - Page Not Found</h1>`;
        console.error(error);
    }
};

window.addEventListener("hashchange", handleLocation);
window.route = route;

handleLocation();
