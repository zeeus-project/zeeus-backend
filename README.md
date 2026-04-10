# ZEEUS — Startup Sustainability Evaluation Tool
### Zero Emissions Entrepreneurship for Universal Sustainability

A full-stack web application that transforms the Excel-based ZEEUS Startup Sustainability Evaluation Tool into a scalable, multi-user web platform. Built for the ZEEUS Hackathon 2026.

---

## What it does

- Implements **Stage I (Inside-Out)** — Financial, Environmental, Social and Governance impact assessment
- Implements **Stage II (Outside-In)** — Risk and Opportunity evaluation with matrix scoring
- Generates a **Results Dashboard** with scorecards, material topic alerts, and score visualisations
- Provides **SDG Alignment** mapped from NACE industry division and startup stage
- Includes an **AI Sustainability Advisor** powered by Llama 3.3 (via Groq) for action plans
- Exports a full **PDF report** and **CSV** of raw scores
- Role-based access with a **Admin Panel** for evaluation oversight
- Built-in **User Manual** drawn from the official ZEEUS documentation

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, TailwindCSS |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL 16 |
| AI | Groq — Llama 3.3 70B |
| Containerisation | Docker + Docker Compose |

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git

---

## Getting Started

### 1. Clone all three repositories into the same folder

```bash
mkdir zeeus && cd zeeus
git clone https://github.com/zeeus-project/zeeus-deploy.git
git clone https://github.com/zeeus-project/zeeus-backend.git
git clone https://github.com/zeeus-project/zeeus-frontend.git
```

Your folder structure should look like this:

```
zeeus/
├── zeeus-deploy/
├── zeeus-backend/
└── zeeus-frontend/
```

### 2. Set up environment variables

```bash
cd zeeus-deploy
cp env.example .env
```

The `.env` file already contains a working Groq API key for demo purposes.

### 3. Run the application

```bash
docker compose up --build
```

This will:
- Pull the PostgreSQL 16 image
- Build and start the backend container on port 3001
- Build and start the frontend container on port 3000
- Automatically apply the database schema on first run

Wait for all three containers to show as healthy, then open:

```
http://localhost:3000
```

### 4. Create an account and start evaluating

Register a new account, sign in, and create your first evaluation.

---

## Admin Access

To promote a user to admin, run the following after registering:

```bash
docker exec -it zeeus-db psql -U zeeus -d zeeus
```

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
\q
```

Then sign out and back in to access the Admin Panel.

---

## Stopping the application

```bash
docker compose down
```

To also delete the database volume (fresh start):

```bash
docker compose down -v
```

---

## Architecture

```
zeeus-frontend  (Next.js)  :3000
      │
      │ HTTP REST API
      ▼
zeeus-backend   (Express)  :3001
      │
      │ PostgreSQL
      ▼
zeeus-db        (Postgres)  :5432
```

---

## Repositories

| Repo | Description |
|------|-------------|
| [zeeus-deploy](https://github.com/zeeus-project/zeeus-deploy) | Docker Compose setup |
| [zeeus-backend](https://github.com/zeeus-project/zeeus-backend) | Node.js REST API |
| [zeeus-frontend](https://github.com/zeeus-project/zeeus-frontend) | Next.js web app |

---

## Supported by

ClimateKIC · Funded by the European Union · EIT Higher Education Initiative
