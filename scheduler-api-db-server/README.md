# Interview Scheduler API server
 This server holds the data that is displayed in the scheduler app, it is served separately from the client interface

## Setup
1. Install server dependencies using the `npm install` command from scheduler-api-server directory.
2. Create the database by following instructions below under "Create the DB" section 
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:8001/>.

## Create the DB
1. start postgres with the command `startpostgres`
2. Use the command `psql -U development` to login to the PostgreSQL server, with the username `development`. Type in the password `development`.
3. Create a database with the command `CREATE DATABASE scheduler_development;`.
4. Go to the url <http://localhost:8001/api/debug/reset> in order to generate the data inside the scheduler_development database

## Api

- Days

`GET /api/days`

Response

```json
[
  {
    "id": 1,
    "name": "Monday",
    "appointments": [1, 2],
    "interviewers": [1, 2],
    "spots": 0
  }
]
```

- Appointments

`GET /api/appointments`

Response:

```json
{
  "1": {
    "id": 1,
    "time": "12pm",
    "interview": {
      "student": "Lydia Miller-Jones",
      "interviewer": 1
    }
  },
  "2": {
    "id": 2,
    "time": "1pm",
    "interview": {
      "student": "Archie Cohen",
      "interviewer": 2
    }
  }
}
```

`PUT /api/appointments/:id`

Body:

```json
{
  "interview": {
    "student": String,
    "interviewer": Number
  }
}
```

`DELETE /api/appointments/:id`

- Interviewers

`GET /api/interviewers`

Response:

```json
{
  "1": {
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    "id": 2,
    "name": "Tori Malcolm",
    "avatar": "https://i.imgur.com/Nmx0Qxo.png"
  }
}
```

## Testing using cypress
- The main app features code testing(see main app readme file for more information). 
- When running tests on cypress run the server using the command; `npm run test:server` so that the tests run on a separate database.
- after firing the command `npm run test:server` for the first time go to the url <http://localhost:8001/api/debug/reset> in order to generate the data inside the scheduler_test database

## Dependencies
- "jest": "^24.8.0"
- "body-parser": "^1.18.3",
- "cors": "^2.8.5",
- "dotenv": "^7.0.0",
- "express": "^4.16.4",
- "helmet": "^3.18.0",
- "pg": "^8.5.0",
- "socket.io": "^2.2.0",
- "ws": "^7.0.0"