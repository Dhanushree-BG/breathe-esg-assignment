# Breathe ESG Dashboard

## Overview

Breathe ESG Dashboard is a full-stack web application built using:

- Django REST Framework
- React JS
- SQLite
- Axios

The application allows ingestion and review of ESG emission records.

---

## Features

- SAP CSV Upload
- Emission Record Processing
- Automatic Validation
- Flagged Record Detection
- Analyst Approval Workflow
- Dashboard Summary Cards
- Real-time Record Updates

---

## Tech Stack

### Backend
- Django
- Django REST Framework
- SQLite

### Frontend
- React
- Vite
- Axios

---

## Validation Rules

- Negative quantities are flagged
- Records can be approved manually
- Status values:
  - PENDING
  - APPROVED
  - FLAGGED

---

## API Endpoints

### Upload SAP File

POST

/api/sap/upload/

### Get Records

GET

/api/records/

### Approve Record

POST

/api/approve/<id>/

---

## How To Run

### Backend

```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## Author

Dhanushree B G