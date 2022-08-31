# Basic Part

## Basic Tasks

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

# Challenging Part

## Tasks

- [ ] Display flags instead of country text code via the task given api
- [ ] Drag and drop for reordering
- [ ] Add PostgreSQL and _Dockerized_ it, use it as a database, remove the in-memory strategy
- [ ] CSS animation after drivers reorder
- [ ] Basic tests for backend using Jest
