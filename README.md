# First Part

## Tasks

- [x] Backend
  - [x] Get drivers list. GET /api/drivers
  - [x] Post overtake, modify place by one. POST /api/drivers/{driverId}/overtake
  - [x] Host static image files.
- [x] Frontend
  - [x] Single page /drivers
  - [x] /drivers lists based on GET /api/drivers.
  - [x] Display on the _Card_: name, team, place, code, _photo_
  - [x] Button for POST /api/drivers/{driverId}/overtake
  - [x] Minimal styling

# Second Part

## Tasks

- [x] Display country flags via api
- [x] Drag and drop for reordering
- [ ] Add PostgreSQL and _Dockerized_ it, use it as a database, remove the in-memory strategy
- [ ] CSS animation after drivers reorder
- [ ] Basic tests for backend using Jest

# Dependencies

## First Part

- nodejs
- npm
  - pnpm (optional)
  - yarn (optional)

## Second Part (after First Part)

- docker
- docker-composer

# Usage

## Install

```sh
# terminal A
# backend
# ! The current directory is the root directory
cd backend
pnpm install

# terminal B
# frontend
# ! The current directory is the root directory
cd frontend
pnpm install
```

## Run Dev

```sh
# terminal A
# backend
# ! The current directory is the root directory
cd backend
# pnpm install
pnpm run dev

# terminal B
# frontend
# ! The current directory is the root directory
cd frontend
# pnpm install
pnpm run start

# ! In First Part Will run at host: http://localhost:3771
# ! In Second Part Will run at host: http://localhost:3000
```

## Build

```sh
# terminal A
# backend
# ! The current directory is the root directory
cd backend
# pnpm install
pnpm run build

# terminal B
# frontend
# ! The current directory is the root directory
cd frontend
# pnpm install
pnpm run build
```

## Run Production

```sh
# terminal A
cd backend
pnpm run serve
```

# Detailing Test Results

## First Part

- Tests succeeded by manual checks.

## Second Part

- Partly tested in NodeJS
- NOT FINISHED

# NOT FINISHED

- Failed at the task, "Add PostgreSQL and _Dockerized_ it, use it as a database, remove the in-memory strategy"

  - Reason: out of time by wrong decision
  - Solution in the Future:
    - A library _TypeORM_ was known by the developer already

# VERSIONS

## First Part

```sh
# pwd: root dir
git checkout core
```

## Second Part (Unfinished)

```sh
# pwd: root dir
git checkout master
```
