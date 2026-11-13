---
steps:
  - step_01_set_up_backend: done
  - step_02_connect_mongodb: done
  - step_03_make_user_model: done
  - step_04_add_registration: done
  - step_05_add_login: done
  - step_06_check_logged_in_users: done
  - step_07_make_item_model: done
  - step_08_add_posting_an_item: done
  - step_09_add_board_search_and_filters: done
  - step_10_add_item_details_and_my_posts: done
  - step_11_add_editing_a_post: done
  - step_12_add_delete_and_return_actions: done
  - step_13_finish_api_error_handling: done
  - step_14_connect_account_forms_and_sessions: pending
  - step_15_connect_board_and_item_details: pending
  - step_16_connect_posting_and_my_posts: pending
  - step_17_connect_edit_delete_and_return_actions: pending
  - step_18_check_project_and_tidy_up: pending
---

This project uses only the MERN stack: MongoDB, Express, React, and Node.js. Keep it simple and do not add extra frameworks or unnecessary libraries.

# Backend plan

Build the backend for the Campus Lost & Found Board and connect it to the finished React frontend. Students should be able to use real accounts and save their posts in MongoDB.

There are 18 steps. Steps 1 to 6 are done: the backend connects to local MongoDB, registration and login work, and private requests can verify JWTs and load the current user. Passwords are hashed and checked with bcrypt. Steps 7 to 18 are pending. Mark a step done only after its code is written and its behaviour has been checked. Writing this plan does not count as a development step.

## What to use

Use Node.js and Express for the REST API, MongoDB with Mongoose for the database, bcrypt for passwords, and jsonwebtoken for JWT sessions. Use dotenv for settings and cors to allow requests from our frontend. Use the browser's built-in fetch when connecting React to the API.

Keep the existing frontend design. The connection steps will replace demo data and demo sessions with real API requests.

## Keep the code simple

- Use clear names, small functions, and straightforward conditions.
- Keep routes, request handlers, models, and login checks in their own folders.
- Use normal async functions with try and catch where needed.
- Add no code comments.
- Leave blank lines between small groups of code. Spacing can vary a little, but keep related statements together.
- Check inputs on the server even when the frontend already checks them.
- Never return password hashes or put real secrets in Git.
- Keep this to one campus. Do not add an admin panel, chat, uploads, payments, image recognition, password reset, email verification, or a mobile app.

## Folder map

Create files as their steps come up. We do not need to make all these files at once.

```text
Campus-Lost-and-Found/
  docs/
    frontend-plan.md
    backend-plan.md
  backend/
    config/
      db.js
    controllers/
      authController.js
      itemController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
    models/
      User.js
      Item.js
    routes/
      authRoutes.js
      itemRoutes.js
    utils/
      itemValidation.js
    .env
    .env.example
    .gitignore
    package.json
    package-lock.json
    server.js
  frontend/
    src/
      api/
        api.js
      components/
      data/
      pages/
      App.jsx
      main.jsx
      styles.css
    .env.example
    package.json
  README.md
```

`server.js` will set up Express, connect the database, and load the routes. Controllers will handle requests. Models will describe the saved data. `authMiddleware.js` will check JWTs before private actions.

`frontend/src/api/api.js` will hold a small fetch helper for requests and error messages. It does not need a class or another library.

## Steps and time

These are rough working times for a beginner, including a quick check after each task. Finish one step before moving on. There is no fixed waiting time between steps.

| No. | Task | Estimated time |
| ---: | --- | --- |
| 1 | Set up the backend | 1 hour |
| 2 | Connect MongoDB | 1 hour |
| 3 | Make the user model | 45 minutes |
| 4 | Add registration | 1 hour 30 minutes |
| 5 | Add login | 1 hour |
| 6 | Check logged-in users | 1 hour 15 minutes |
| 7 | Make the item model | 1 hour |
| 8 | Add posting an item | 1 hour 30 minutes |
| 9 | Add the board, search, and filters | 1 hour 30 minutes |
| 10 | Add item details and My Posts | 1 hour |
| 11 | Add editing a post | 1 hour 15 minutes |
| 12 | Add delete and returned actions | 1 hour |
| 13 | Finish API error handling | 1 hour |
| 14 | Connect account forms and sessions | 2 hours |
| 15 | Connect the board and item details | 1 hour 30 minutes |
| 16 | Connect posting and My Posts | 1 hour 30 minutes |
| 17 | Connect edit, delete, and returned actions | 1 hour 30 minutes |
| 18 | Check the project and tidy up | 2 hours |

These estimates add up to 23 hours and 15 minutes. Learning the tools and fixing problems may take longer.

## What to build in each step

### Step 01 Set up the backend

Create `backend` next to `frontend`. Set up its package file and install Express, Mongoose, bcrypt, jsonwebtoken, dotenv, and cors. Add a start command and a simple development command.

Make `server.js` with Express and JSON request handling. Add a small `/api/health` route that returns a message so we can check that the server starts and answers requests.

### Step 02 Connect MongoDB

Completed: local MongoDB is running, the backend connects before listening, the health route returns HTTP 200, and frontend CORS works. Syntax checks and the unavailable-database startup check passed. Real settings are in the ignored .env file; example settings are in .env.example.

Make `config/db.js` and connect to MongoDB using Mongoose. Read `MONGO_URI`, `PORT`, `JWT_SECRET`, and `FRONTEND_URL` from environment settings. Start listening only after the database connects. Show a useful startup error if the connection fails.

Keep actual values in `.env`. Add `.env` and `node_modules` to the backend ignore file. Put example values in `.env.example`. Allow browser requests from the configured frontend address through cors.

Check that the server starts with a working database address and fails clearly with a bad one. A local MongoDB database is enough; we do not need to add hosting to this plan.
Local setup on this computer: MongoDB runs from `D:\MongoDB\bin\mongod.exe` and saves data in `D:\MongoDB\data`. It is a portable setup, not a Windows service, and listens only on `127.0.0.1:27017`. After restarting Windows, open PowerShell and start it with:

```powershell
& 'D:\MongoDB\bin\mongod.exe' --dbpath 'D:\MongoDB\data' --bind_ip 127.0.0.1 --port 27017
```

Keep that terminal open while using the database. In another terminal, run `npm run dev` from the backend folder. The database files stay outside the Git repository.

### Step 03 Make the user model

Make `User.js` with name, email, password hash, and creation time. Require the needed fields. Trim the name and email, store emails in lowercase, and give email a unique database index.

Keep the password hash out of normal query results. Do not add roles, profile photos, or extra account fields.

### Step 04 Add registration

Add `POST /api/auth/register`. Accept name, email, password, and confirm password. Check their types before using string methods. Reject blank names, invalid emails, passwords shorter than eight characters, and passwords that do not match. Do not save confirm password.

Check whether the email is already used. Hash the password with bcrypt before saving the user. Handle a duplicate email from the database too.

Return status 201, the user's ID, name and email, and a JWT with an expiry time. Use the user ID as the token's identity. Never include the password or hash in the response. Check both a successful registration and rejected inputs.

### Step 05 Add login

Add `POST /api/auth/login`. Require a valid email and a non-empty password. Find the user using the normalised email, explicitly load the password hash, and compare it with bcrypt.

Return the user's basic details and a JWT when the password matches. Use the same token expiry and response shape as registration. For an unknown email or wrong password, return the same short message and status 401.

Check correct details, wrong details, and missing inputs. Do not add an eight-character check to login that changes an existing password before comparing it.

### Step 06 Check logged-in users

Make `authMiddleware.js`. Read the JWT from the Authorization header in the form `Bearer token`. Verify its signature and expiry, find the user, and make that user's ID available to the request handler.

Return status 401 for missing, invalid, or expired tokens, or a token whose user no longer exists. Add `GET /api/auth/me` to return the verified user's ID, name, and email.

Check this route with no token, a bad token, an expired token, and a working one. Logout will clear the token in the frontend; a separate logout endpoint is not needed for this basic JWT setup.

### Step 07 Make the item model

Make `Item.js` with title, description, category, location, item date, contact detail, lost or found type, owner ID, returned flag, and creation time. Use a MongoDB user reference for the owner. Default returned to false and let the server set creation time.

Use the same category and campus location choices as the frontend. Only allow `lost` and `found` as item types. Keep contact detail as text because it can be a phone number or email.

Use a consistent response shape with `id` and `ownerId` as strings, so the existing React comparisons keep working. Do not expose database-only fields that the pages do not need.

### Step 08 Add posting an item

Add private `POST /api/items`. Accept only title, description, category, location, item date, contact detail, and type. Put the shared item input checks in `utils/itemValidation.js` so editing can use them too.

Check field types, required values, whitespace-only text, allowed choices, and a real calendar date that is not in the future. Treat the item date as a calendar date and agree on one format, `YYYY-MM-DD`, between frontend and backend.

Take owner ID from the verified user. Set returned and creation time on the server. Ignore attempts to supply a different owner or returned status. Return the saved item with status 201.

### Step 09 Add the board, search, and filters

Add public `GET /api/items`. Return only items with returned set to false, newest posts first.

Read optional `search`, `category`, `type`, and `location` query values. Search titles and descriptions without treating capital letters differently. Treat search text as literal text rather than executable regular expression patterns. Make all chosen filters work together and validate their values.

Return an empty list when nothing matches. Check every filter alone, combined filters, search with punctuation, and the newest-first order. Do not add pagination or extra sorting controls for this project.

### Step 10 Add item details and My Posts

Add public `GET /api/items/:id` for one item's full details. Allow returned items to open here too. Return status 400 for an invalid ID and 404 for an item that does not exist.

Add private `GET /api/items/mine`. Use the verified user's ID and include both active and returned posts, newest first. An empty account should get an empty list.

Place `/mine` before `/:id` in the route file so Express does not treat `mine` as an item ID. Check that another student's posts never appear in My Posts.

### Step 11 Add editing a post

Add private `PUT /api/items/:id`. Find the item and compare its owner with the verified user. Return 403 when it belongs to someone else.

Use the same item field checks as posting. Update only the editable fields. Keep the ID, owner, creation time, and returned flag unchanged even if the browser sends replacements. Return the saved item.

Check valid edits, invalid fields, a missing item, and an edit request made by a second student.

### Step 12 Add delete and returned actions

Add private `DELETE /api/items/:id` and `PATCH /api/items/:id/returned`. Both must check the item exists and belongs to the verified user.

Delete only the matching owned item. For the returned action, set returned to true and return the updated item. A repeat request should leave it returned without breaking anything.

Check that returned items disappear from the board but remain in My Posts and item details. Check that a different student cannot delete or mark them returned.

### Step 13 Finish API error handling

Add common error handling for unexpected failures and unknown API routes. Keep messages short and consistent, such as `{ "message": "Item not found." }`. Field validation responses can also include an `errors` object using the form's field names.

Keep status codes consistent: 200 for successful reads and updates, 201 for creation, 400 for invalid inputs, 401 for a missing or invalid login, 403 for another student's action, 404 for missing records or routes, 409 for a duplicate email, and 500 for an unexpected server failure.

Do not send stack traces, database errors, secrets, or password hashes to the browser. Add error handling as each route is built; use this step to check that the routes behave the same way.

### Step 14 Connect account forms and sessions

Make a small fetch helper in `frontend/src/api/api.js`. Read the API address from a Vite environment setting and document it in `frontend/.env.example`. Let the helper attach a token to private requests and turn unsuccessful responses into useful errors.

Replace demo registration and login with the real API calls. Save only the JWT needed to keep the session after refresh, using localStorage for this basic project. Never save passwords. Load the current user from `/api/auth/me` rather than trusting a saved user object.

Clear the token and current user on logout, or when the server rejects an expired or invalid session. Remove the old demo user storage. Give the initial session check a loading state so private pages do not redirect before it finishes.

Show API errors beside the forms, keep entered values after errors, and prevent repeated submissions while a request is running. Remove demo text once the real forms work.

### Step 15 Connect the board and item details

Replace the board's sample list with `GET /api/items`. Send search and filter choices as query values using URLSearchParams. Keep the Clear filters button and newest-first order. Make sure an older request cannot replace newer search results if responses arrive out of order.

Load item details through `GET /api/items/:id`, including when the student opens a detail URL directly or refreshes it. Show loading, empty, missing-item, and request-error messages where needed.

Keep category and location choices available for the forms and filters. Those fixed choices can stay in the frontend even when the sample item list is no longer used.

### Step 16 Connect posting and My Posts

Send valid new item forms to `POST /api/items` with the JWT. Wait for success before showing the new details page. Use the ID, owner, and dates returned by the server. Keep the form values and show a useful error if saving fails.

Load My Posts through `GET /api/items/mine` instead of filtering a browser-only item list. Include returned items and keep the existing empty message. Refreshing either page should still show the saved database values.

### Step 17 Connect edit, delete, and returned actions

Send edits through PUT, deletions through DELETE, and return actions through PATCH. Keep the delete confirmation. Update or reload the affected data only after the server confirms success. Disable an action while its request is running.

Keep the existing owner checks in the UI, and show useful errors when the server rejects a change. Open the details or board page after an action where appropriate.

Remove the old item localStorage reads and writes and the remaining demo state handlers. Remove the sample item fallback from the live app. Do not import old demo posts into MongoDB automatically. MongoDB now supplies saved posts, including a genuinely empty board.

### Step 18 Check the project and tidy up

Use two test accounts and check the full flow:

- Register, log in, refresh, and log out.
- Try duplicate registration, incorrect login details, and invalid forms.
- Browse, search, combine filters, and clear them.
- Post an item, open its details directly, and find it in My Posts.
- Edit it, cancel a deletion, and confirm a deletion.
- Mark an item returned and check its visibility on all relevant pages.
- Send direct API requests as the second student to check that another student's post cannot be edited, deleted, or marked returned.
- Try missing and expired tokens, invalid IDs, unknown routes, and missing items.
- Stop and restart the backend and check that users and items remain saved.
- Try an unavailable server and check that the frontend shows an error without losing form values.

Fix problems found in these checks. Use a separate test database for requests that change or delete records. Keep verification simple; a large test framework is not needed.

Remove unused demo code, imports, and temporary logs. Check for code comments and keep the code readable. Run the frontend build and any configured lint check. Add a short README covering packages, environment settings, MongoDB, and how to start both apps.

The work is finished when the existing frontend uses the real API, the required flows work with MongoDB, ownership is enforced by the server, and the final checks pass.

## API routes

| Method | Route | Purpose | Login needed |
| --- | --- | --- | --- |
| GET | `/api/health` | Check the server is running | No |
| POST | `/api/auth/register` | Register a student | No |
| POST | `/api/auth/login` | Log in | No |
| GET | `/api/auth/me` | Get the current student | Yes |
| GET | `/api/items` | Browse, search, and filter active items | No |
| GET | `/api/items/mine` | Get My Posts | Yes |
| GET | `/api/items/:id` | Get item details | No |
| POST | `/api/items` | Post an item | Yes |
| PUT | `/api/items/:id` | Edit an owned item | Yes |
| DELETE | `/api/items/:id` | Delete an owned item | Yes |
| PATCH | `/api/items/:id/returned` | Mark an owned item returned | Yes |
