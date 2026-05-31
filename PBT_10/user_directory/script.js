const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);

        if (!res.ok) {
            throw new Error("Lỗi tải users");
        }

        return res.json();
    },

    async getUser(id) {
        const res = await fetch(
            `${this.baseURL}/users/${id}`
        );

        if (!res.ok) {
            throw new Error("Không tìm thấy user");
        }

        return res.json();
    },

    async createUser(data) {
        const res = await fetch(
            `${this.baseURL}/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!res.ok) {
            throw new Error("Tạo user thất bại");
        }

        return res.json();
    },

    async updateUser(id,data) {
        const res = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
        );

        if (!res.ok) {
            throw new Error("Cập nhật thất bại");
        }

        return res.json();
    },

    async deleteUser(id) {
        const res = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method:"DELETE"
            }
        );

        if (!res.ok) {
            throw new Error("Xóa thất bại");
        }

        return true;
    }
};

const ui = {

    renderUsers(users) {

        userList.innerHTML = users.map(user => `
            <div class="user-card">
                <h3>${user.name}</h3>

                <p>${user.email}</p>

                <div class="actions">
                    <button
                        class="edit"
                        onclick="editUser(${user.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete"
                        onclick="removeUser(${user.id})"
                    >
                        Delete
                    </button>
                </div>
            </div>
        `).join("");
    },

    showLoading() {

        loader.innerHTML = `
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
        `;
    },

    hideLoading() {
        loader.innerHTML = "";
    },

    showSuccess(message) {
        showToast(message,"success");
    },

    showError(message) {
        showToast(message,"error");
    }
};

const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("searchInput");

let users = [];

async function loadUsers() {

    try {

        ui.showLoading();

        users = await api.getUsers();

        ui.renderUsers(users);

    } catch(error) {

        ui.showError(error.message);

    } finally {

        ui.hideLoading();

    }
}

userForm.addEventListener("submit", async e => {

    e.preventDefault();

    const id = document.getElementById("userId").value;

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };

    try {

        if(id){

            const updated =
                await api.updateUser(id,data);

            users = users.map(user =>
                user.id == id
                ? updated
                : user
            );

            ui.showSuccess(
                "Cập nhật user thành công"
            );

        } else {

            const created =
                await api.createUser(data);

            created.id = Date.now();

            users.unshift(created);

            ui.showSuccess(
                "Thêm user thành công"
            );
        }

        ui.renderUsers(users);

        userForm.reset();

        document.getElementById(
            "userId"
        ).value = "";

    } catch(error){

        ui.showError(error.message);

    }
});

async function editUser(id){

    try{

        const user =
            await api.getUser(id);

        document.getElementById(
            "userId"
        ).value = user.id;

        document.getElementById(
            "name"
        ).value = user.name;

        document.getElementById(
            "email"
        ).value = user.email;

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }catch(error){

        ui.showError(error.message);

    }
}

async function removeUser(id){

    const confirmDelete =
        confirm("Bạn có chắc muốn xóa?");

    if(!confirmDelete) return;

    try{

        await api.deleteUser(id);

        users = users.filter(
            user => user.id !== id
        );

        ui.renderUsers(users);

        ui.showSuccess(
            "Đã xóa user"
        );

    }catch(error){

        ui.showError(error.message);

    }
}

searchInput.addEventListener("input", e => {

    const keyword =
        e.target.value.toLowerCase();

    const filtered = users.filter(user =>
        user.name.toLowerCase()
            .includes(keyword)
        ||
        user.email.toLowerCase()
            .includes(keyword)
    );

    ui.renderUsers(filtered);
});

function showToast(message,type){

    const toast = document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.textContent = message;

    document
        .getElementById("toast")
        .appendChild(toast);

    setTimeout(() => {
        toast.remove();
    },3000);
}

loadUsers();