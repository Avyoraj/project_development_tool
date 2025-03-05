# 🛠️ Project Management Tool

## 📌 Description

This project is a **full-stack** project management tool that allows users to **create, manage, and track tasks** within projects. The application is built using a **React frontend** and an **Express backend**, with **MongoDB** as the database. The frontend is styled with **Tailwind CSS** 🎨 and features **drag-and-drop functionality** using `react-beautiful-dnd` 🖱️. The backend is powered by **Mongoose** for MongoDB interactions and **Joi** for input validation.

---

## 🏗️ Tech Stack

### 🌐 Frontend
- ⚛️ **React**
- 🎨 **Tailwind CSS**
- 🖱️ **react-beautiful-dnd** (for drag-and-drop functionality)

### 🖥️ Backend
- 🚀 **Express.js**
- 🛢️ **MongoDB & Mongoose**
- ✅ **Joi** (for input validation)

### 🛠️ Other Tools
- 🔄 **Axios** (for API requests)
- 🚏 **React Router** (for navigation)
- 🎉 **React Hot Toast** (for notifications)
- 🧪 **Jest & React Testing Library** (for testing)

---

## ⚙️ Backend Structure

<details>
  <summary>📂 Click to expand</summary>

### 📜 `backend/models/index.js`
- 🏗️ Defines Mongoose schemas for `task` and `project`.
- 📤 Exports the `Project` model.

### 🌍 `backend/server.js`
- 🚀 Sets up the Express server.
- 🔗 Connects to MongoDB using Mongoose.
- 🛡️ Configures middleware (CORS, JSON parsing, URL encoding).
- 🛣️ Defines API routes.

### 🛤️ `backend/routes/index.js`
- ✍️ Defines CRUD routes for **projects and tasks**.
- 🛠️ Uses **Joi** for input validation.
- 🗄️ Interacts with MongoDB using **Mongoose**.

### 📌 `backend/controllers/index.js`
- 📦 Currently empty but can be used for **business logic** in the future.

### 🛠️ `backend/package.json`
- 📋 Lists **dependencies** and **scripts**.
- 🎬 Specifies **entry point** (`server.js`).

</details>

---

## 🎨 Frontend Structure

<details>
  <summary>📂 Click to expand</summary>

### 🏠 `frontend/src/App.js`
- 🚏 Sets up **React Router**.
- 🔔 Includes **toast notifications**.

### 🖼️ `frontend/src/components/AppLayout.js`
- 📌 Defines the **app layout** with a **navbar** and **sidebar**.

### 🎛️ `frontend/src/components/DropdownMenu.js`
- 🔽 Dropdown menu for **tasks** (edit/delete options).

### 📝 `frontend/src/components/EditProjectModal.js`
- 🏗️ Modal for **editing projects**.

### 📌 `frontend/src/components/TaskModal.js`
- 📝 Displays **task details** in a modal.

### 🖱️ `frontend/src/components/Task.js`
- 🎯 Handles **drag-and-drop** tasks using `react-beautiful-dnd`.

### 📋 `frontend/src/components/Sidebar.js`
- 📌 Lists all **projects**.
- ➕ Allows **creating new projects**.

### 🏗️ `frontend/src/components/AddTaskModal.js`
- ➕ Modal for **adding or editing tasks**.

### 🏗️ `frontend/src/components/AddProjectModal.js`
- ➕ Modal for **adding or editing projects**.

### ⚡ `frontend/src/setupTests.js`
- 🧪 Sets up **Jest & React Testing Library**.

### 🌍 `frontend/.env`
- 🔐 Stores **environment variables** (e.g., API URL).

### 🎨 `frontend/tailwind.config.js`
- 🖌️ Configures **Tailwind CSS**.

</details>

---

## 🎯 Features
- ✅ **Create, edit, and delete projects** 🏗️
- ✅ **Add and manage tasks within projects** ✅
- ✅ **Drag-and-drop task organization** 🖱️
- ✅ **Responsive UI with Tailwind CSS** 📱
- ✅ **Toast notifications for feedback** 🔔
- ✅ **Smooth API interactions using Axios** 🔄
- ✅ **Secure backend with Joi validation** 🛡️
- ✅ **Testing setup with Jest & React Testing Library** 🧪

---

🚀 **Let's build something amazing!** 🚀