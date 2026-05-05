# 📊 ProjectPulse - Project Management Tool

A full-stack Project Management web application built using Django (REST API) for backend and React (TypeScript) for frontend. The system allows users to register, login, and manage projects and tasks efficiently.

---

# 🚀 Live Demo

Frontend (Vercel): https://project-management-tool-nu-eight.vercel.app/  
Backend (Render): https://project-management-tool-msxy.onrender.com  
GitHub Repo: https://github.com/yAnchalSharmaofficial/Project-Management-Tool.git  

---

# 🔑 Demo Access

To explore the deployed application and test features with existing data, you can use the demo account:

- Email: test2@gmail.com  
- Password: 0102 

👉 Use these credentials on the Login page to access the deployed data and test the full functionality of the application.

# 📁 Project Structure

Backend (Django):

project_manager/
├── accounts/        # Authentication (login/register)
├── projects/        # Project & Task APIs
├── project_manager/ # Settings & URLs
└── manage.py

Frontend (React):

frontend/
├── src/
│   ├── api/         # Axios API calls
│   ├── pages/       # Login, Register, Dashboard
│   ├── components/  # UI Components
│   └── App.tsx

---

# ✨ Features

Authentication:
- User registration and login
- JWT authentication (access + refresh token)
- Protected routes in frontend

Project Management:
- Create, update, delete projects
- Project status (active / completed)
- Search projects
- Pagination support

Task Management:
- Create tasks under projects
- Update task status (todo / in-progress / done)
- Due date tracking
- Filter tasks by status

Dashboard:
- Clean card-based UI
- Real-time refresh after CRUD operations
- Success/error message handling

UI/UX:
- Material UI based design
- Responsive layout
- Consistent PageHeader across pages
- SaaS-style clean interface

---

# 🛠 Tech Stack

Frontend:
- React + TypeScript
- Axios
- React Router DOM
- Material UI

Backend:
- Django REST Framework
- SimpleJWT Authentication
- PostgreSQL
- Django ORM

Deployment:
- Vercel (Frontend)
- Render (Backend + Database)

---

# ⚙️ Backend Setup

Clone repository:
git clone https://github.com/yAnchalSharmaofficial/Project-Management-Tool.git
cd Project-Management-Tool/backend

Create virtual environment:
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

Install dependencies:
pip install -r requirements.txt

Run migrations:
python manage.py makemigrations
python manage.py migrate

Start server:
python manage.py runserver

Backend runs at:
http://127.0.0.1:8000/

---

# 💻 Frontend Setup

cd frontend
npm install

Environment variables:
REACT_APP_API_URL=https://project-management-tool-msxy.onrender.com

Start frontend:
npm start

Frontend runs at:
http://localhost:3000/

---

# ⚠️ Known Limitations

- No role-based access control (admin/user separation)

---

# 🚀 Future Improvements

- Role-based access system
- Dark mode support
- Email notifications

---

# 👨‍💻 Author

Anchal Sharma  
GitHub: https://github.com/yAnchalSharmaofficial