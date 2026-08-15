# product-app — Copilot Instructions

## Project Overview

**product-app** is a single-page application built with React and Vite. It provides three core features: user authentication (Login), browsing a list of products (Product List), and viewing the details of a single product (Product Detail).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build tool | Vite |
| Language | TypeScript |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| Testing | Vitest + React Testing Library |

## Features

- **Login** — authenticate users and protect routes behind an auth guard.
- **Product List** — fetch and display a paginated/filterable list of products.
- **Product Detail** — fetch and display full information for a single product by ID.

## Notes for Copilot

- Coding conventions are defined in separate `.instructions.md` files under `.github/instructions/`.
- Follow those instruction files when generating or modifying code.
- Detailed tech-stack rules are auto-applied from .github/instructions/ based on file type (see applyTo in each file)
