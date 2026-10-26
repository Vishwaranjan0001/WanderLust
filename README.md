# WanderLust — Travel Listing and Booking App

A server-rendered travel application with searchable stays, account authentication, reviews, and booking workflows.

[Developer profile](https://github.com/Vishwaranjan0001)

## Features and engineering

- Search listings by title, location, country, or category.
- User signup and login with Passport Local.
- MongoDB-backed sessions and Mongoose data models.
- Listing creation with Joi validation and Geoapify geocoding.
- Reviews, booking date validation, and overlap checks.
- Booking price calculation with nights, service fee, and tax.

**Stack:** Node.js · Express · EJS · MongoDB · Mongoose · Passport · Joi · Geoapify.

## Run locally

The package manifest targets Node.js 22.22.0. You also need MongoDB and a Geoapify API key for geocoding.

```bash
git clone https://github.com/Vishwaranjan0001/WanderLust.git
cd WanderLust
npm install
```

Copy `.env.example` to a local `.env`, then set your own database URL and Geoapify key. Never commit real credentials.

```bash
npm start
```

Open http://localhost:8080. The root redirects to `/listings`.

## Source map

| Path | Responsibility |
| --- | --- |
| `app.js` | Application setup, authentication, listings, reviews, and booking routes |
| `models/` | Listing, review, user, and booking models |
| `views/` | EJS pages |
| `schema.js` | Joi listing validation |
| `middleware.js` | Login and redirect helpers |
| `utils/geocode.js` | Address geocoding |

## Scope

This is a learning project with a local demonstration workflow. The current code contains development session secrets and does not include payment processing. The booking-overlap check is application-level; production concurrency would require stronger database guarantees. The package test script is a placeholder.
