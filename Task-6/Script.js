const list = document.getElementById("draggable-list");
let draggedItem = null;

function handleDragstart(e) {
    draggedItem = this;
    this.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.innerHTML);
}

function handleDragover(e) {
    e.preventDefault();
    this.classList.add("drag-over");
    e.dataTransfer.dropEffect = "move";
}

function handleDragEnter(e) {
    e.preventDefault();
    if (this !== draggedItem) {
        this.classList.add("drag-over");
    }
}

function handleDragLeave() {
    this.classList.remove("drag-over");
}

function handleDrop(e) {
    e.stopPropagation();
    this.classList.remove("drag-over");

    if (draggedItem !== this) {
        const draggedHTML = draggedItem.innerHTML;
        draggedItem.innerHTML = this.innerHTML;
        this.innerHTML = draggedHTML;
    }

    return false;
}

function handleDragEnd() {
    this.classList.remove("dragging");
    list.querySelectorAll(".list-item").forEach((item) => item.classList.remove("drag-over"));
}

const items = list.querySelectorAll(".list-item");
items.forEach((item) => {
    item.addEventListener("dragstart", handleDragstart);
    item.addEventListener("dragover", handleDragover);
    item.addEventListener("dragenter", handleDragEnter);
    item.addEventListener("dragleave", handleDragLeave);
    item.addEventListener("drop", handleDrop);
    item.addEventListener("dragend", handleDragEnd);
});
