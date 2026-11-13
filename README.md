# Scale from 1 user to 1 million

One Express + Postgres app, grown one system design concept at a time.
Every concept is its own branch and pull request. Every merge is tagged.

## Run it
```bash
cp .env.example .env
npm install
npm run db:up        # Postgres in docker on localhost:5432
npm run seed         # 1,000,000 products
npm run dev          # server on http://localhost:3000
npm run load -- http://localhost:3000/health 100 15
```

## Useful commands
| Command | What it does |
|---|---|
| `npm run db:psql` | open psql inside the container |
| `npm run db:reset` | wipe the database and start fresh |
| `npm run seed -- 500000` | seed a different number of rows |
| `npm run load -- <url> <connections> <seconds>` | autocannon load test |

## Benchmarks
Same test every time: 100 connections, 15 seconds, one machine.

| Tag | Concept | Req/s | p50 | p99 |
|---|---|---|---|---|
| v1-setup | hello world ceiling (`/health`) | | | |

## Git workflow
- `main` always works.
- One branch per concept: `feat/...`, `perf/...`, `chore/...`
- Open a PR, fill in the template, merge with a merge commit.
- Tag after merge: `v1-setup`, `v2-baseline`, ...
