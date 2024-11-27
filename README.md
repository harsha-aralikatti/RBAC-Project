# RBAC-Project
Role based access control web application using react.js  and tailwind css


Table of Contents
    Introduction
    Features
    Technologies Used
    Setup and Installation
    Project Structure
    Usage
    Screenshots (Optional)
    License

Introduction
   The RBAC Dashboard project is a web-based application designed to manage role-based access control. This system enables administrators to define roles, assign permissions, and control user access based on their roles, ensuring secure and organized resource management.

Features
    User Authentication: Secure login functionality.
    Role Management: Define, update, and delete roles.
    User Management: Add, edit, and remove users.
    Permission Management: Assign and revoke permissions for roles.

Technologies Used
    Frontend
    React: For building the user interface.
    Tailwind CSS: For styling.
    Framer Motion: For smooth animations.

Other Tools
    Lucide-React: For icons.
    Vite: For development server and bundling.
    Tailwind CSS: For utility-first styling.



Setup and Installation

Follow these steps to set up the project locally:
1.Clone the repository:
    git clone https://github.com/harsha-aralikatti/RBAC-Project.git

2.Install dependencies:
    npm install

3.Set up Tailwind CSS: Ensure Tailwind is properly configured by checking the tailwind.config.js.

4.Start the development server:
    npm run dev

5.Build the production version:
    npm run build

6.Run the production server:
    npm run serve



Project Structure
plaintext
Copy code
rbac-dashboard/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable components (Header, Sidebar, Layout)
│   ├── pages/          # Main pages (Dashboard, Users, Roles, Permissions, Login)
│   ├── store/          # State management (authStore)
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── tailwind.config.js  # Tailwind CSS configuration
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation

Usage
Login: Navigate to /login and log in with the admin or user credentials.

Dashboard: Access an overview of the system.

User Management: Navigate to /users to add, edit, or delete users.

Role Management: Navigate to /roles to create or update roles.

Permission Management: Navigate to /permissions to assign or revoke permissions.

