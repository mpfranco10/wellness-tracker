# Technical Design

This document describes the main technical decisions and architecture of the wellness tracker.

The technical design will evolve as implementation decisions are made.

## Frontend

The frontend will be built as a responsive single-page application.

### Core

- React
- TypeScript
- Vite
- Yarn

### UI & Styling

- shadcn/ui
- Tailwind CSS

shadcn/ui is used as the component foundation while keeping the components customizable within the project.

Tailwind CSS is used for styling, responsive layouts, and design customization.

### Data Fetching

- TanStack Query

TanStack Query will manage server state, including data fetching, caching, mutations, and synchronization with the backend API.

### Forms & Validation

- React Hook Form
- Zod

React Hook Form will manage form state, while Zod will provide schema-based validation.

### Data Visualization

- Recharts

Recharts will be used for visualizations such as weight and activity trends.

## Backend

The backend will expose a REST API consumed by the frontend.

### Core

- Node.js
- TypeScript
- Fastify

## Database

- PostgreSQL

PostgreSQL will be used as the relational database for user profiles, weight entries, meals, exercise sessions, and related data.

Database access tooling is still to be decided.

## Architecture

The current high-level architecture is:

Frontend → REST API → Backend → Database

Additional services will be introduced for features such as authentication, image storage, and AI-assisted meal analysis.

## Decisions Still Pending

- Database access: Prisma, Drizzle, or another approach
- Authentication strategy
- Image storage
- AI integration
- Deployment and hosting
- Testing strategy
