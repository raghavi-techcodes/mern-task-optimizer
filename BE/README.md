
# Task Management System

A full-stack web application built using React.js, Node.js, Express.js, and MongoDB for managing tasks with role-based access.

## Features
- Role-based authentication (Customer, Employee, General User)
- Task creation, assignment, and tracking
- Secure JWT authentication
- RESTful API architecture

## Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Live & Source
- Live App: https://profound-squirrel-03efdb.netlify.app  
- Backend API: https://taskmanager-clbj.onrender.com  
- Frontend Repo: https://github.com/Vijayarajvijay/Task-Manager-FE  
- API Docs (Postman): https://documenter.getpostman.com/view/30449043/2s9YyqjNTJ

## Setup (Local)
bash
git clone https://github.com/Vijayarajvijay/Task-Manager-FE
cd task-management
npm install
npm start


.env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

## Sample Login

Employee

* Email: [employee1@gmail.com](mailto:employee1@gmail.com)
* Password: Password@123

Customer

* Email: [customer1@gmail.com](mailto:customer1@gmail.com)
* Password: Password@123