# Project Management Tool

## Description

This project is a full-stack project management tool that allows users to create, manage, and track tasks within projects. The application is built using a React frontend and an Express backend, with MongoDB as the database. The frontend uses Tailwind CSS for styling and `react-beautiful-dnd` for drag-and-drop functionality. The backend uses Mongoose for MongoDB interactions and Joi for input validation.

## Tech Stack

- **Frontend**: React, Tailwind CSS, `react-beautiful-dnd`
- **Backend**: Express, Mongoose, Joi
- **Database**: MongoDB
- **Other Tools**: Axios, React Router, React Hot Toast, Jest, React Testing Library

## Backend

<details>
  <summary>Click to expand</summary>

### `backend/models/index.js`
- Defines the Mongoose schemas for `task` and `project`.
- Exports the `Project` model.

### `backend/server.js`
- Sets up the Express server.
- Connects to MongoDB using Mongoose.
- Configures middleware for CORS, JSON parsing, and URL encoding.
- Defines the API routes.

### `backend/routes/index.js`
- Defines the API routes for handling CRUD operations on projects and tasks.
- Uses Joi for input validation.
- Interacts with the MongoDB database using Mongoose.

### `backend/controllers/index.js`
- This file is currently empty. It could be used to define controller functions for handling business logic.

### `backend/.vscode/settings.json`
- Contains VS Code workspace settings, such as the color theme and editor preferences.

### `backend/package.json`
- Lists the dependencies and scripts for the backend project.
- Specifies the entry point (`server.js`) and the development server command (`nodemon`).

</details>

## Frontend

<details>
  <summary>Click to expand</summary>

### `frontend/package.json`
- Lists the dependencies and scripts for the frontend project.
- Specifies the entry point (`src/index.js`) and the build commands.

### `frontend/.vscode/settings.json`
- Contains VS Code workspace settings, such as custom dictionary words.

### `frontend/src/components/AppLayout.js`
- Defines the layout for the application, including the navbar and sidebar.

### `frontend/public/robots.txt`
- Specifies rules for web crawlers about which parts of the site can be accessed.

### `frontend/.gitignore`
- Specifies files and directories to be ignored by Git, such as `node_modules` and `.env`.

### `frontend/src/components/DropdownMenu.js`
- Defines a dropdown menu component for tasks, including options to edit or delete a task.

### `frontend/postcss.config.js`
- Configures PostCSS plugins, such as Tailwind CSS and Autoprefixer.

### `frontend/public/index.html`
- The main HTML file for the React application.

### `frontend/.gitattributes`
- Configures Git to handle text files with LF normalization.

### `frontend/public/manifest.json`
- Defines the web app manifest for the React application, including icons and theme colors.

### `frontend/src/components/EditProjectModal.js`
- Defines a modal component for editing a project (currently a placeholder).

### `frontend/README.md`
- Contains a brief description of the project.

### `frontend/src/App.test.js`
- Contains a basic test for the App component using React Testing Library.

### `frontend/src/index.css`
- Contains global CSS styles for the application, including Tailwind CSS imports.

### `frontend/src/components/Navbar.js`
- Defines the navbar component.

### `frontend/src/components/BtnPrimary.js`
- Defines a primary button component with specific styles.

### `frontend/src/components/BtnSecondary.js`
- Defines a secondary button component with specific styles.

### `frontend/src/index.js`
- The entry point for the React application.
- Renders the App component and sets up React Router.

### `frontend/src/reportWebVitals.js`
- Contains a function to report web vitals for performance monitoring.

### `frontend/tailwind.config.js`
- Configures Tailwind CSS, including custom colors and fonts.

### `frontend/src/components/TaskModal.js`
- Defines a modal component for displaying task details.

### `frontend/src/components/Task.js`
- Defines the main component for displaying and managing tasks within a project.
- Handles drag-and-drop functionality using `react-beautiful-dnd`.

### `frontend/src/components/Sidebar.js`
- Defines the sidebar component, which lists all projects and allows creating new projects.

### `frontend/src/components/ProjectDropdown.js`
- Defines a dropdown menu component for projects, including options to edit or delete a project.

### `frontend/src/components/AddTaskModal.js`
- Defines a modal component for adding or editing a task.

### `frontend/src/components/AddProjectModal.js`
- Defines a modal component for adding or editing a project.

### `frontend/src/setupTests.js`
- Sets up Jest and React Testing Library for testing.

### `frontend/.env`
- Contains environment variables for the frontend project, such as the backend API URL.

### `frontend/src/App.js`
- The main App component.
- Sets up routes using React Router and includes the layout and toast notifications.

</details>