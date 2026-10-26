---
steps:
  - step_01_set_up_react: done
  - step_02_add_pages_and_routes: done
  - step_03_make_header_and_page_styles: done
  - step_04_build_item_board: done
  - step_05_add_search_and_filters: done
  - step_06_make_item_details_page: done
  - step_07_make_register_form: done
  - step_08_make_login_form: done
  - step_09_add_demo_login_and_logout: done
  - step_10_add_private_page_checks: pending
  - step_11_make_item_form: pending
  - step_12_show_new_posts_on_board: pending
  - step_13_make_my_posts_page: pending
  - step_14_add_edit_post_page: pending
  - step_15_add_delete_and_return_buttons: pending
  - step_16_save_demo_changes_in_browser: pending
  - step_17_fix_phone_layouts: pending
  - step_18_improve_forms_and_keyboard_use: pending
  - step_19_check_and_fix_page_flows: pending
  - step_20_clean_files_and_check_build: pending
---

This project uses only the MERN stack: MongoDB, Express, React, and Node.js. Keep it simple and do not add extra frameworks or unnecessary libraries.

# Frontend plan

Build the Campus Lost & Found Board in React. Students can browse lost and found items, open their details, and use the poster's contact details. They can also try adding and managing posts with a demo login.

All 20 steps below are frontend development work. Steps 1 to 9 are done: the board, filters, item details, and forms work, and demo login, registration, and logout update the header. Steps 10 to 20 are pending. Mark a step done only when its code is written and it works in the browser.

## What to use

Use React with Vite, React Router, and plain CSS. Keep sample items and the demo user in React state. Pass data through props where needed. Start with shared state in `App.jsx`; there is no need for an extra state library.

Login and registration are only demos for checking the frontend. Do not save passwords. Backend work will have its own plan later.

## Keep the code simple

- Use names that explain the value or action, like `items`, `searchText`, and `handleSubmit`.
- Use small functions and straightforward conditions.
- Use normal React state, props, and array methods.
- Keep each page in its own file. Share a component when more than one page needs it.
- Do not add code comments.
- Leave blank lines between small groups of code. The spacing can vary a little, but keep related statements together.
- Build only what the proposal needs. Leave out chat, payments, image recognition, photo uploads, and a mobile app.

## Folder map

Create each file when it is needed.

```text
lostFound/
  docs/
    frontend-plan.md
  frontend/
    public/
    src/
      components/
        Header.jsx
        PageLayout.jsx
        ItemCard.jsx
        ItemFilters.jsx
        ItemForm.jsx
        ProtectedRoute.jsx
      pages/
        BoardPage.jsx
        ItemDetailsPage.jsx
        LoginPage.jsx
        RegisterPage.jsx
        PostItemPage.jsx
        MyPostsPage.jsx
        EditItemPage.jsx
        NotFoundPage.jsx
      data/
        sampleItems.js
      App.jsx
      main.jsx
      styles.css
    index.html
    package.json
```

## Steps and time

These are rough working times for a beginner, including a quick check after each task. Move on when the step works. There is no fixed waiting time between steps.

| No. | Frontend task | Estimated time |
| ---: | --- | --- |
| 1 | Set up React and the folders | 1 hour 15 minutes |
| 2 | Add pages and routes | 1 hour 20 minutes |
| 3 | Make the header and page styles | 2 hours |
| 4 | Build the item board | 2 hours |
| 5 | Add search and filters | 2 hours |
| 6 | Make the item details page | 1 hour |
| 7 | Make the register form | 1 hour 10 minutes |
| 8 | Make the login form | 50 minutes |
| 9 | Add demo login and logout | 1 hour |
| 10 | Add private page checks | 45 minutes |
| 11 | Make the item form | 1 hour 40 minutes |
| 12 | Show new posts on the board | 45 minutes |
| 13 | Make the My Posts page | 45 minutes |
| 14 | Add the edit post page | 1 hour |
| 15 | Add delete and returned buttons | 1 hour |
| 16 | Save demo changes in the browser | 45 minutes |
| 17 | Fix the layout on phones | 1 hour |
| 18 | Improve forms and keyboard use | 40 minutes |
| 19 | Check and fix the page flows | 1 hour 30 minutes |
| 20 | Clean the files and check the build | 30 minutes |

The estimates total 22 hours and 55 minutes. Allow about 30 to 40 hours if you are learning React while building.

## What to build in each step

### Step 01 Set up React and the folders

Create a React app with Vite inside `frontend`. Install its packages and start the app. Remove the starter logos, demo content, and unused styles.

Make `components`, `pages`, and `data` folders inside `src`. Show a plain Campus Lost & Found heading and check that it opens in the browser.

### Step 02 Add pages and routes

Add React Router and create a simple page for each route below. A heading is enough at this stage.

| Path | Page |
| --- | --- |
| `/` | Item board |
| `/items/:id` | Item details |
| `/register` | Register |
| `/login` | Login |
| `/post-item` | Post an item |
| `/my-posts` | My posts |
| `/items/:id/edit` | Edit an item |
| Any other path | Page not found |

Give the missing page a short message and a link to the board. Open each route and check that it shows the right page.

### Step 03 Make the header and page styles

Make `Header.jsx` with the project name and links to the board, Post Item, My Posts, Login, and Register. Make `PageLayout.jsx` so the pages have the same width and spacing.

Use a readable font, a light background, and one main button colour in `styles.css`. Set basic styles for links, buttons, and inputs. Give lost, found, and returned items clear text labels.

### Step 04 Build the item board

Add a small sample list in `sampleItems.js`. Include lost and found items, different categories and campus locations, posts from different students, and one returned item.

Each item needs an ID, owner ID, title, description, category, location, item date, contact detail, lost or found type, returned flag, and creation time. The item date is when it was lost or found. The creation time is when the post was added.

Make `ItemCard.jsx` with the title, type, category, location, date, and a details link. Show the cards on `BoardPage.jsx`, newest posts first. Keep returned items off the active board.

### Step 05 Add search and filters

Make `ItemFilters.jsx` with a search box and dropdowns for category, lost or found, and campus location. Search titles and descriptions without treating capital letters differently.

Make the search and filters work together. Add a Clear filters button. Show a short message when nothing matches, and keep the filters available so the student can try again.

### Step 06 Make the item details page

Use the ID from the URL to find the item. Show its full description, category, type, location, date, contact detail, and returned status. Add a link back to the board.

If the item does not exist, show Item not found and a link back. Check both a real item ID and a made-up one.

### Step 07 Make the register form

Add name, email, password, and confirm password fields to `RegisterPage.jsx`. Add a Register button and a link to login.

Check empty fields, an invalid email, passwords shorter than eight characters, and passwords that do not match. Put a clear error beside the field that needs fixing. Reject names made of only spaces. Keep entered values when there is an error.

### Step 08 Make the login form

Add email and password fields to `LoginPage.jsx`, with a Login button and a link to register. Check that both fields are filled and that the email has a valid shape.

Show clear errors without clearing the form. Use password inputs so the typed password is hidden.

### Step 09 Add demo login and logout

Add a current demo user to shared React state. A valid login form should open a session for a fixed sample student and send them to the board. A valid register form can start a demo session using the entered name and email. Give that student an owner ID too.

Show the student's name and Logout in the header while logged in. Hide Login and Register during that session. Logout should clear the current user.

Say on both forms that this is a demo. Do not store passwords or claim that a real account has been created.

### Step 10 Add private page checks

Make `ProtectedRoute.jsx`. Send logged out visitors to Login when they try to open Post Item, My Posts, or Edit Item.

Keep the board and item details available while logged out. Check the behaviour by typing the private routes into the address bar. These checks only control the demo frontend.

### Step 11 Make the item form

Make `ItemForm.jsx` and use it on `PostItemPage.jsx`. Add lost or found, title, description, category, location, date, and contact detail fields.

Use the same category and location choices as the board filters. Require every field, reject text made of only spaces, and reject future dates. Leave contact detail as free text so students can use a phone number or email. Show a short error beside each invalid field.

### Step 12 Show new posts on the board

On a valid item form submission, create an item with a unique ID, the current user's owner ID, a creation time, and a returned flag set to false.

Add it to shared state and open its details page. Check that its values are correct and that it appears first on the active board.

### Step 13 Make the My Posts page

Show only posts whose owner ID matches the current demo user. Include returned posts with a returned label.

When the student has no posts, show a short message and a Post Item link. Check that another student's items do not appear here.

### Step 14 Add the edit post page

Add an Edit button to the student's posts. Use `ItemForm.jsx` on `EditItemPage.jsx` and fill it with the saved item values.

After validation, update the matching item and open its details. Keep its ID, owner ID, creation time, and returned flag. Check ownership when opening the page and when saving. Show a clear message if the item is missing or belongs to someone else.

### Step 15 Add delete and returned buttons

Add Delete and Mark as returned buttons to the student's posts. Before deleting, use a simple browser confirmation box. Cancel should keep the item; confirming should remove it.

Marking an item returned should hide it from the active board and keep it in My Posts with a returned label. Its details page should show that label too. Do not show the return button again for a returned item.

Only allow these changes when the item belongs to the current user. Check ownership inside the action functions as well as hiding the buttons on other students' posts.

### Step 16 Save demo changes in the browser

Use localStorage to keep the item list and the current demo user's basic details after refresh. Never save passwords.

Use sample items only when no saved list exists. Keep an empty saved list empty. If saved data cannot be read, fall back to the sample data without breaking the page. Make sure logout also removes the saved demo session.

### Step 17 Fix the layout on phones

Check every page at a narrow screen width and adjust the CSS. Let the header links wrap, stack the filters, and show cards in one column when needed.

Keep form fields and buttons inside the screen. Check that long titles and contact details wrap instead of pushing the page sideways.

### Step 18 Improve forms and keyboard use

Give each field a visible label connected to its input. Use proper buttons and links, and keep keyboard focus visible.

Try filling and submitting each form using the keyboard. Connect error messages to their fields and make sure labels, errors, and status text are easy to read.

### Step 19 Check and fix the page flows

Use the app from start to finish and fix any problems you find:

- Browse items and open details while logged out.
- Try search and all filters together, then clear them.
- Submit empty and invalid forms.
- Try demo register, login, and logout.
- Add a post and find it on the board and in My Posts.
- Edit a post and check its updated details.
- Cancel a deletion, then confirm one.
- Mark an item returned and check the board and My Posts.
- Try editing another student's post by typing its URL.
- Refresh and check that saved changes remain.
- Open a private page while logged out.
- Open a missing item and an unknown page.

### Step 20 Clean the files and check the build

Remove unused imports, starter files, and temporary console messages. Keep names and functions easy to follow. Check that the code has no comments and has readable spacing.

Run the frontend build and fix any errors. Run the configured lint check too, if the project has one. Update the frontmatter so it matches the work actually finished.

The frontend is finished when the demo flows work, the pages fit small screens, and the build passes.
