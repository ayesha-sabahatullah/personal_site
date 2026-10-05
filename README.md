# AI StudyOS — Phase 0 Foundation

Working base for the student: Next.js + FastAPI + PostgreSQL skeleton with all 9 tables migrated.
Student builds features from Phase 1 onward; setup is already done.

Companion docs: `AI StudyOS — Simplified PRD (Student Edition).md`, `AI StudyOS — Project Management Plan.md`.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 + TypeScript + Tailwind (in `frontend/`) |
| Backend | FastAPI + SQLAlchemy 2.0 + Alembic (in `backend/`, deps via `uv` + `pyproject.toml`) |
| DB | PostgreSQL 16 (Docker Compose or local) |
| Auth (Phase 1) | JWT + bcrypt stubs in `app/core/security.py` |
| PDF/AI (Phase 3) | PyMuPDF + one LLM API, stubs in `app/services/` |

## Quickstart (5 min)

### 0. Prerequisites

- `uv` ([install](https://docs.astral.sh/uv/getting-started/installation/)) — manages the Python version, virtualenv, and all backend deps. No manual `venv`/`pip` needed.
- Node 18+ (`node --version`), PostgreSQL running.
- Either Docker Desktop **or** a local Postgres on port 5432.

### 1. Database

```powershell
# Option A — Docker (recommended)
docker compose up -d
# Option B — local Postgres: create db `aistudyos`
# psql -U postgres -c "CREATE DATABASE aistudyos;"
```

### 2. Backend

```powershell
cd backend
uv sync
copy ..\.env.example .env
# edit .env → set DATABASE_URL + JWT_SECRET_KEY
uv run alembic upgrade head
uv run pytest -q
uv run uvicorn app.main:app --reload --port 8000
# → http://localhost:8000/docs  and  http://localhost:8000/health → {"status":"ok"}
```

Seed demo data (optional):

```powershell
uv run seed.py
# login later with demo@studyos.local / demo1234 (Phase 1 wires it up)
```

> Deps live in `backend/pyproject.toml` + `backend/uv.lock` (source of truth). `uv sync` creates/updates `.venv/`; always run backend commands with the `uv run` prefix so they use the project venv.

### 3. Frontend

```powershell
cd frontend
npm install
copy .env.example .env.local
npm run dev
# → http://localhost:3000 (nav shows all 7 screens as placeholders)
```

## Folder map

```
backend/app/
  main.py            app factory, CORS, router wiring, /health
  core/config.py     .env loader (single source of truth)
  core/database.py   engine + SessionLocal + get_db dependency
  core/security.py   bcrypt helpers (JWT in Phase 1)
  models/            one file per table + base.py + __init__.py
  schemas/           Pydantic (student fills Phase 1+)
  routers/           health.py (real) + auth/tasks/plan/documents/quiz/tutor stubs
  services/          planner.py / ai.py / pdf.py stubs with PRD formula in docstring
backend/alembic/     env.py (reads DATABASE_URL) + versions/0001_phase0_initial.py
backend/tests/       test_health.py (no DB) + test_models.py (SQLite in-memory)
backend/seed.py      demo user + course + 3 tasks (idempotent)
frontend/app/        layout + page (dashboard) + login/register/planner/documents/kits/[id]/tutor/progress
frontend/lib/api.ts  typed fetch helper (reads NEXT_PUBLIC_API_URL, attaches Bearer token)
frontend/components/ nav.tsx + ui/button.tsx (shadcn-style pattern)
```

## Schema (9 tables)

users → courses → tasks → sessions; courses → documents → study_kits → questions;
documents → quiz_results; users → quiz_results + chat_messages.
Concepts/flashcards/options are JSON columns to keep the schema small.
See `PHASE0_HANDOVER.md` for the ER diagram + column details.

## Rules after Phase 0

1. Schema changes only via **new** Alembic migrations — never edit the DB by hand, never edit `0001_phase0_initial.py`.
2. No secrets in git — only in `.env` / `.env.local` (both git-ignored). API key stays in backend `.env`.
3. Small PRs, one phase at a time. Mentor reviews before merge.

## What Phase 0 proves (exit check M0)

- `docker compose up` starts the DB (or local PG works).
- `uv run alembic upgrade head` creates all 9 tables.
- `/docs` opens, `/health` returns OK, `npm run dev` shows navigation.
- `uv run seed.py` runs without duplicating data.
