# LitGenius

[Heroku link][heroku]

[heroku]: https://fathomless-reaches-2713.herokuapp.com/

## Minimum Viable Product
A Rap Genius clone for literature. Users can:

- [ ] create an account
- [ ] log in
- [ ] view other user profile pages
- [ ] view literature excerpts, poetry, plays, etc
- [ ] annotate sections of text
- [ ] become verified as an author
- [ ] post works/text as an author
- [ ] edit their profile (penname, password, picture)
- [ ] reply to annotations
- [ ] vote on annotations

## Design Docs
* [Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase I: User authentication and profiles (~1 day)
Implement user authentication and sessions based on the best practices we learned in the Rails curriculum. Make views for sign up and sign in pages. Create profile pages for users with Backbone. Allow users to edit their profile pages.

[Details][phase-one]

### Phase II: Creation and annotation of works (~3 days)
Allow users who are verified as authors to post their works. Allow users to annotate specific portions of a text and to view annotations by hovering over text.

[Details][phase-two]

### Phase III: Search by author and by name of work (~2 days)
Add a search bar with dynamic results that allows users to search by author name and title of work.

[Details][phase-three]

### Phase IV: Replying to and voting on annotations (~3 days)
Add a comment field on annotations where users can reply to annotations made by other users. Add thumbs up and thumbs down buttons that modify the rank of an annotation. Rank annotations and display only the most highly ranked (with the option to display all).

[Details][phase-four]

### Phase V: Styling (~2 days)
Making everything look pretty with CSS and potentially some jQuery plugins. Add a guest user button. If time, allow users to view everything and only ask for login when they try to reply or make an annotation.

[Details][phase-six]

### Bonus Features
- [ ] implement user feeds on profile pages that show a user's activity
- [ ] allow users to follow other users, which puts more activity on the user's feed

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
