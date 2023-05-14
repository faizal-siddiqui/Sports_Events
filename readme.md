# Sports App

Our app is a platform for sports enthusiasts to find and join sports events near them. With our app, users can browse a list of available events, view details about each event, and join the events they are interested in. The app allows users to create their own events and set a limit on the number of players, as well as view the list of players who have joined the event. It is simple for users to find and join the events they are interested in. Whether you are looking to join a pickup football game or a local badminton tournament.

#### Features

Users need to register or log in with a username and password before creating or joining an event.
When creating a new sports event the user needs to add the event’s short description, timings, number of players limit and any other requirement for joining the event.
Users can search or filter through listed events to find a suitable event for them.
Users can request to join the event if the player limit is not full.
Event organizers can either accept or reject the user’s request to join the game.
Accepted users can see who all are joining the game.
Users can view the list of events they have been accepted to or have requested for.
If the game starts then all pending requests should expire.

#### Views

Login/Register page
Homepage with a list of available events with an option to search or filter.
Event details page with the event information and an option to request to join the event.
Accepted & requested events list page of the user
Others if needed.

### User Flow

**EVENT ORGANIZER**

- register
- login
- Create Events
- set No of players
- Fill details and descriptions and timings
- Accept the Event Requests
- Check How many people have joined
- After Game Start expire all the pending requests

**USER**

- register
- login
- Browse Events
- Apply Filters and Search
- Check Event Details
- Join the Events (if the player limit is not full)
- After It got accepted by Event Organizer. He can check who all are other joinees in that events also.
- He can view the list of events proposals which got accepted and pending.
- After game start then expire the pending request from here also.

### Schemas

1. User Schema

   - name
   - username
   - password - hashed

2. Event Schema

   - event_name
   - description
   - timing
   - date
   - players_limit
   - type_of_game
   - address
   - city
   - user_id - (To build Relationship between user and his post)

3. Requests Schema

   - event_id - (To build the relationship between request and the user)
   - user_id - (To build Relationship between user and his request)
   - status - enum["pending", "accepted", "expired"]

```javascript
const events = [
  {
    event_id: 656,
    user_id: 1,
    status: "accepted",
  },
  {
    event_id: 656,
    user_id: 2,
    status: "expired",
  },
  {
    event_id: 654,
    user_id: 1,
    status: "pending",
  },
  {
    event_id: 655,
    user_id: 1,
    status: "pending",
  },
  {
    event_id: 657,
    user_id: 1,
    status: "pending",
  },
];
```

### Pages

1. Login/Register page
2. Homepage with a list of available events with an option to search or filter.
3. Event details page with the event information and an option to request to join the event.
4. Accepted & requested events list page of the user
5. Others if needed.

### Filter Type

- By Search | Target - (name)
- By city
- By type_of_game
- <s>By timings (Extra)</s>

### State Mangement (REDUX)

1. Auth
2. Events
3. Requests

## Backend

### API Endpoints

| Endpoint                                   | Method | Description                                           |
| ------------------------------------------ | ------ | ----------------------------------------------------- |
| `/api/register`                            | POST   | Create a new user                                     |
| `/api/login`                               | POST   | Authenticate and log in the user                      |
| `/api/events`                              | GET    | Fetch all available events                            |
| `/api/user/events`                         | GET    | Fetch all User event                                  |
| `/api/events/:eventId`                     | GET    | Fetch details of a specific event                     |
| `/api/events`                              | POST   | Create a new event                                    |
| `/api/events/:eventId`                     | PATCH  | Update an existing event                              |
| `/api/events/:eventId`                     | DELETE | Delete an event                                       |
| `/api/events/:eventId/requests`            | POST   | Send a request to join an event                       |
| `/api/events/:eventId/requests/:requestId` | PATCH  | Accept a user's request to join an event              |
| `/api/events/:eventId/requests`            | GET    | Fetch the list of requests for a specific event       |
| `/api/user/:eventId/request/status`        | GET    | Get the Status of user event Request                  |
| `/api/user/events/requests`                | GET    | Fetch the list of events a user has requested to join |

## User

- wrong password / email == 401,
- err == 500
- success = 200
- already exist user - 403
- register - 201
- login 200

## Events

- data == 200 success, status = "success" in data object
- data not found == 404
- error == 500
- POST == 201
- PATCH == 200
- DELETE == 200

## Requests

- data == 200 success, status = "success" in data object
- data not found == 404
- error == 500
- POST == 201
- status - button - Join - status = "pending" | "accepted" | "not_applied"
