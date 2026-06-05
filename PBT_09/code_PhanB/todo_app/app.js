const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoCount = document.querySelector("#todoCount");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.querySelector("#clearCompleted");

const STORAGE_KEY = "vanilla_todo_app";

let todos = loadTodos();
let currentFilter = "all";
let clickTimer = null;

renderTodos();

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem(STORAGE_KEY);

    if (savedTodos === null) {
        return [];
    }

    return JSON.parse(savedTodos);
}

function renderTodos() {
    todoList.textContent = "";

    const filteredTodos = getFilteredTodos();

    if (filteredTodos.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "Không có todo nào.";
        todoList.appendChild(emptyMessage);
    } else {
        const fragment = document.createDocumentFragment();

        filteredTodos.forEach(todo => {
            const li = createTodoElement(todo);
            fragment.appendChild(li);
        });

        todoList.appendChild(fragment);
    }

    updateCount();
}

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;

    if (todo.completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "❌";

    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

function getFilteredTodos() {
    if (currentFilter === "active") {
        return todos.filter(todo => todo.completed === false);
    }

    if (currentFilter === "completed") {
        return todos.filter(todo => todo.completed === true);
    }

    return todos;
}

function updateCount() {
    const activeCount = todos.filter(todo => todo.completed === false).length;
    todoCount.textContent = `${activeCount} items left`;
}

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = todoInput.value.trim();

    if (text === "") {
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();

    todoInput.value = "";
    todoInput.focus();
});

todoList.addEventListener("click", function (event) {
    const target = event.target;
    const li = target.closest(".todo-item");

    if (li === null) {
        return;
    }

    const id = Number(li.dataset.id);

    if (target.classList.contains("delete-btn")) {
        deleteTodo(id);
        return;
    }

    if (target.classList.contains("todo-text")) {
        clearTimeout(clickTimer);

        clickTimer = setTimeout(function () {
            toggleTodo(id);
        }, 180);
    }
});

todoList.addEventListener("dblclick", function (event) {
    const target = event.target;

    if (!target.classList.contains("todo-text")) {
        return;
    }

    clearTimeout(clickTimer);

    const li = target.closest(".todo-item");
    const id = Number(li.dataset.id);

    startEditTodo(li, id, target.textContent);
});

todoList.addEventListener("keydown", function (event) {
    const target = event.target;

    if (!target.classList.contains("edit-input")) {
        return;
    }

    if (event.key === "Enter") {
        saveEditTodo(target);
    }

    if (event.key === "Escape") {
        renderTodos();
    }
});

todoList.addEventListener("focusout", function (event) {
    const target = event.target;

    if (!target.classList.contains("edit-input")) {
        return;
    }

    saveEditTodo(target);
});

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return {
                id: todo.id,
                text: todo.text,
                completed: !todo.completed
            };
        }

        return todo;
    });

    saveTodos();
    renderTodos();
}

function startEditTodo(li, id, oldText) {
    li.textContent = "";
    li.dataset.id = id;

    const input = document.createElement("input");
    input.className = "edit-input";
    input.type = "text";
    input.value = oldText;

    li.appendChild(input);

    input.focus();
    input.select();
}

function saveEditTodo(input) {
    const li = input.closest(".todo-item");

    if (li === null) {
        return;
    }

    const id = Number(li.dataset.id);
    const newText = input.value.trim();

    if (newText === "") {
        deleteTodo(id);
        return;
    }

    todos = todos.map(todo => {
        if (todo.id === id) {
            return {
                id: todo.id,
                text: newText,
                completed: todo.completed
            };
        }

        return todo;
    });

    saveTodos();
    renderTodos();
}

filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderTodos();
    });
});

clearCompletedBtn.addEventListener("click", function () {
    todos = todos.filter(todo => todo.completed === false);

    saveTodos();
    renderTodos();
});