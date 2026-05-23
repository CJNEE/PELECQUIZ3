# Plan Approval - Task Management System (Django DRF + React)

## Information Gathered
- Repository currently contains only:
  - `README.md`
  - `LASTPELEC/` (empty)
  - No existing Django/React code detected.
- Therefore we will scaffold both backend and frontend from scratch inside this workspace.

## Plan
### Backend (Django REST Framework)
1. Create Django project (e.g., `task_backend`) and app (e.g., `tasks`).
2. Implement `Task` model:
   - `title` (string)
   - `is_completed` (boolean, default `False`)
3. Implement serializer for `Task`.
4. Implement API view supporting:
   - `GET /api/tasks/` (list all tasks)
   - `POST /api/tasks/` (create a new task)
5. Configure URL routing:
   - `/api/tasks/`
6. Add CORS configuration so React can call backend (e.g., via `django-cors-headers`).
7. Ensure backend runs locally.

### Frontend (React)
1. Create React app (e.g., `task_frontend`) using Vite.
2. Implement UI:
   - On load: `fetch('http://localhost:8000/api/tasks/')` and display tasks.
   - Form: input `title` + submit button.
   - On submit: `POST` to `http://localhost:8000/api/tasks/`.
3. Handle state (loading/error) minimally.
4. Ensure frontend runs locally and works with backend.

### Deployment Notes (for the quiz submission links)
1. Provide GitHub repository containing both backend and frontend.
2. PythonAnywhere link: backend only (with WSGI config).
3. Vercel link: frontend only (with API URL env var).

## Dependent Files to be edited / created
- New: `task_backend/` (Django)
- New: `task_frontend/` (React)
- New/Update: CORS settings, API URLs, React components

## Followup steps
- Run backend: `python manage.py runserver`
- Run frontend: `npm run dev`
- Validate:
  - GET returns tasks
  - POST creates tasks and appears in list

<ask_followup_question>
Approve creating fresh Django+DRF backend and React frontend scaffolding in this repo, following the exact requirements (Task model + /api/tasks/ GET/POST + React fetch/add UI)?
</ask_followup_question>

