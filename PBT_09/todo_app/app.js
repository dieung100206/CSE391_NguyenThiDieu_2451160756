const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const countElement = document.getElementById("count");
const clearCompletedBtn = document.getElementById("clearCompleted");

let todos =
    JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

// =======================
// SAVE
// =======================

function saveTodos() {
    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}

// =======================
// COUNT
// =======================

function updateCount() {
    const activeCount =
        todos.filter(todo => !todo.completed).length;

    countElement.textContent =
        `${activeCount} items left`;
}

// =======================
// RENDER
// =======================

function renderTodos() {

    todoList.innerHTML = "";

    let filtered = todos;

    if (currentFilter === "active") {
        filtered =
            todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
        filtered =
            todos.filter(todo => todo.completed);
    }

    filtered.forEach(todo => {

        const li =
            document.createElement("li");

        li.className = "todo-item";

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.dataset.id = todo.id;

        const span =
            document.createElement("span");

        span.className = "todo-text";
        span.textContent = todo.text;

        const deleteBtn =
            document.createElement("button");

        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "❌";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });

    updateCount();
    saveTodos();
}

// =======================
// ADD TODO
// =======================

function addTodo() {

    const text =
        todoInput.value.trim();

    if (!text) return;

    todos.push({
        id: Date.now(),
        text,
        completed: false
    });

    todoInput.value = "";

    renderTodos();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {
        addTodo();
    }

});

// =======================
// EVENT DELEGATION
// =======================

todoList.addEventListener("click", e => {

    const li =
        e.target.closest(".todo-item");

    if (!li) return;

    const id =
        Number(li.dataset.id);

    const todo =
        todos.find(t => t.id === id);

    if (!todo) return;

    // DELETE

    if (e.target.classList.contains("delete-btn")) {

        todos =
            todos.filter(t => t.id !== id);

        renderTodos();

        return;
    }

    // TOGGLE

    if (e.target.classList.contains("todo-text")) {

        todo.completed =
            !todo.completed;

        renderTodos();
    }

});

// =======================
// EDIT TODO
// =======================

todoList.addEventListener("dblclick", e => {

    if (!e.target.classList.contains("todo-text"))
        return;

    const span = e.target;

    const li =
        span.closest(".todo-item");

    const id =
        Number(li.dataset.id);

    const todo =
        todos.find(t => t.id === id);

    const input =
        document.createElement("input");

    input.className = "edit-input";
    input.value = todo.text;

    span.replaceWith(input);

    input.focus();

    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            todo.text =
                input.value.trim() ||
                todo.text;

            renderTodos();
        }

    });

});

// =======================
// FILTER
// =======================

document
    .querySelectorAll(".filter")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            document
                .querySelectorAll(".filter")
                .forEach(b =>
                    b.classList.remove("active")
                );

            btn.classList.add("active");

            currentFilter =
                btn.dataset.filter;

            renderTodos();

        });

    });

// =======================
// CLEAR COMPLETED
// =======================

clearCompletedBtn
    .addEventListener("click", () => {

        todos =
            todos.filter(
                todo => !todo.completed
            );

        renderTodos();

    });

// =======================
// INITIAL RENDER
// =======================

renderTodos();