# 📊 Project Management Tool

A full-stack Project Management web application built using **Django (REST API)** for backend and **React (TypeScript)** for frontend.  
The system allows users to register, login, and manage projects and tasks efficiently.

---

## 🚀 Live Demo

Frontend (Vercel):
https://project-management-t-git-b497d2-yanchalsharmaofficials-projects.vercel.app/

Backend (Render):
https://project-management-tool-msxy.onrender.com

---

## 🛠 Tech Stack

### Frontend:
- React.js (TypeScript)
- Axios
- React Router DOM
- Material UI

### Backend:
- Django
- Django REST Framework
- SimpleJWT Authentication
- CORS Headers

### Database:
- PostgreSQL

### Deployment:
- Frontend: Vercel
- Backend: Render

---

## ✨ Features

- User Registration & Login (JWT Authentication)
- Secure API authentication
- Create, Read, Update, Delete (CRUD) Projects
- Task management under projects
- Token-based authorization
- Responsive UI
- REST API integration

---

## 📁 Project Structure

### Backend (Django)

project_manager/
├── accounts/        # Authentication (login/register)
├── projects/        # Project & Task APIs
├── project_manager/ # Settings & URLs
└── manage.py

---

### Frontend (React)

frontend/
├── src/
│   ├── api/         # Axios API calls
│   ├── pages/       # Login, Register, Dashboard
│   ├── components/  # UI Components
│   └── App.tsx

---

## ⚙️ Setup Instructions

---

### 🔧 Backend Setup

```bash
git clone <repo-url>
cd backend

python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver