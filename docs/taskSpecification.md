## WEB PORTAL FOR REVIEWS "WHAT SHOULD U READ/WATCH/PLAY, etc."

Front: TypeScript/JavaScript, React, Node.js, MySQL/PostgreSQL/MongoDB, Bootstrap

Non-authenticated users have read-only access (they can use search, but can’t create reviews, can’t leave comments, rating and likes).

Authenticated not-admins have access to everything except admin-page. In basic implementation admin page provides only user list (links to user pages).

It's necessary to suppot authentication via social networks (at least two).

Admin see every user page and review as its creator (e.g. admin can edit review or creates review under user from his/her page).

Every page provides access to full-text search over whole app (results are represented as a review list, e.g., if some text is found in comment, the results page diplays link to the corresponding review page).

Every user has a personal page, which contains table of the reviews (table should support filters, sorting, actions for review creation/deletion/editing/opening in a read mode).

Every review has: review name, name of the reviewed piece of art, "group" (from the fixed set: "Movies", "Books", "Games" и т.п.), tags (multiple tags with autocomplition - when users starts entering tag, dropdown show variants, which already exist in the app), review text обзора (with "markdown" formatting), optional image (stored in the cloud) and the grade in the range from 0 to 10.

All images are stored in the cloud, upload control should support drag-n-drop.
On the main page: recently added reviews, reviews with the highest grades, tag cloud.
User may leave rating (1..5 stars) for reviewed pieces (no more that 1 per user per review) - average user rating is diplyed everywhere in the app, where review name is displayed.

User also may leaver "like" for review itself (no more that 1 per user per review), sum on likes are displayed after the review author neame.

When two users reviews the same movie/book/etc. it's two unrelated reviews (but please, check requirements with the "\*").

When opening review in the read-mode by author or just opening by other user, comments are displayed after review. Comments are linear, it's impossible to comment on the other comment, new comments are always put at the end. Comments are updates automagically - when the page is opened and new commnents are added by other users, thay appear (2-3 delay is possible).

Application should support at least two UI languages: English and another one (Polish, Russian, Georgian, Uzbek, etc.). User can change UI language (selection are stored). Application should support two skins/themes - light and dark.

REQUIRED: Bootstrap (or any other CSS-framework), support of different screen resolutions (should work on the phone), ORM/ODM for data access, engine for full-text search (included in DB or separate — BUT NEVER USE FULL SCAN BY SELECT QUERIES).
Additional optional requirement (for 10/10, after all other requirements):

- Advanced admin page for user management (view, block, delete, make admin or non-admin).

- Upload arbitrary number of images for a review.

- Export reviews to PDF with images.

- Ability to "link" different reviews for the single movie/book/etc. from different users (show cross-links and calculate average authors rating). Add entity "piece" and link each review with an corresponding piece (select existing or create new one when creating a review).

You have to use ready components, libraries, controls. E.g. use ready-to-use control to render markdown or ready-to-use control to upload images with drag-n-drop or ready-to-use control to enter tags or ready-to-use control to render tag cloud, etc.
