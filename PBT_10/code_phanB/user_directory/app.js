const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);

        if (!response.ok) {
            throw new Error(`GET /users lỗi: HTTP ${response.status}`);
        }

        return await response.json();
    },

    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);

        if (!response.ok) {
            throw new Error(`GET /users/${id} lỗi: HTTP ${response.status}`);
        }

        return await response.json();
    },

    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`POST /users lỗi: HTTP ${response.status}`);
        }

        return await response.json();
    },

    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`PUT /users/${id} lỗi: HTTP ${response.status}`);
        }

        return await response.json();
    },

    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`DELETE /users/${id} lỗi: HTTP ${response.status}`);
        }

        return true;
    }
};

const userList = document.getElementById("userList");
const loading = document.getElementById("loading");
const toast = document.getElementById("toast");

const userForm = document.getElementById("userForm");
const userIdInput = document.getElementById("userId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const searchInput = document.getElementById("searchInput");

let users = [];

const ui = {
    renderUsers(usersToRender) {
        userList.innerHTML = "";

        if (usersToRender.length === 0) {
            userList.innerHTML = "<p>Không tìm thấy user nào.</p>";
            return;
        }

        usersToRender.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";

            card.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone || "Chưa có"}</p>

                <div class="card-actions">
                    <button class="detail" onclick="handleDetail(${user.id})">Detail</button>
                    <button class="edit" onclick="handleEdit(${user.id})">Edit</button>
                    <button class="delete" onclick="handleDelete(${user.id})">Delete</button>
                </div>
            `;

            userList.appendChild(card);
        });
    },

    showLoading() {
        loading.classList.remove("hidden");
        userList.innerHTML = "";
    },

    hideLoading() {
        loading.classList.add("hidden");
    },

    showError(message) {
        this.showToast(message, "error");
    },

    showSuccess(message) {
        this.showToast(message, "success");
    },

    showToast(message, type) {
        toast.textContent = message;
        toast.className = `toast ${type}`;

        setTimeout(() => {
            toast.className = "toast hidden";
        }, 3000);
    }
};

async function loadUsers() {
    try {
        ui.showLoading();

        users = await api.getUsers();

        ui.renderUsers(users);
        ui.showSuccess("Tải danh sách users thành công.");
    } catch (error) {
        ui.showError(error.message);
    } finally {
        ui.hideLoading();
    }
}

userForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !email || !phone) {
        ui.showError("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    const userData = {
        name,
        email,
        phone
    };

    const editingId = userIdInput.value;

    if (editingId) {
        await updateUser(editingId, userData);
    } else {
        await createUser(userData);
    }
});

async function createUser(userData) {
    try {
        const createdUser = await api.createUser(userData);

        const newUser = {
            ...userData,
            id: createdUser.id || Date.now()
        };

        users.unshift(newUser);

        ui.renderUsers(users);
        resetForm();
        ui.showSuccess("Thêm user mới thành công.");
    } catch (error) {
        ui.showError(error.message);
    }
}

async function updateUser(id, userData) {
    try {
        const updatedUser = await api.updateUser(id, userData);

        users = users.map(user => {
            if (String(user.id) === String(id)) {
                return {
                    ...user,
                    ...updatedUser,
                    ...userData,
                    id: Number(id)
                };
            }

            return user;
        });

        ui.renderUsers(users);
        resetForm();
        ui.showSuccess("Cập nhật user thành công.");
    } catch (error) {
        ui.showError(error.message);
    }
}

function handleEdit(id) {
    const user = users.find(item => item.id === id);

    if (!user) {
        ui.showError("Không tìm thấy user để sửa.");
        return;
    }

    userIdInput.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    phoneInput.value = user.phone || "";

    submitBtn.textContent = "Cập nhật User";
    cancelBtn.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function handleDelete(id) {
    const confirmDelete = confirm("Bạn có chắc muốn xóa user này không?");

    if (!confirmDelete) {
        return;
    }

    try {
        await api.deleteUser(id);

        users = users.filter(user => user.id !== id);

        ui.renderUsers(users);
        ui.showSuccess("Xóa user thành công.");
    } catch (error) {
        ui.showError(error.message);
    }
}

async function handleDetail(id) {
    try {
        const user = await api.getUser(id);

        alert(
            `Chi tiết User:\n\n` +
            `Tên: ${user.name}\n` +
            `Email: ${user.email}\n` +
            `Phone: ${user.phone}\n` +
            `Website: ${user.website || "Không có"}\n` +
            `Company: ${user.company?.name || "Không có"}`
        );
    } catch (error) {
        ui.showError(error.message);
    }
}

function resetForm() {
    userIdInput.value = "";
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

    submitBtn.textContent = "Thêm User";
    cancelBtn.classList.add("hidden");
}

cancelBtn.addEventListener("click", resetForm);

searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.toLowerCase().trim();

    const filteredUsers = users.filter(user => {
        return (
            user.name.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword)
        );
    });

    ui.renderUsers(filteredUsers);
});

loadUsers();