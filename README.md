## Functionality Implemented
### Comments
Can be added and viewed on a housing location's detail page.
### Tagging a User in a Comment
- Follows similar behavior to Slack.
  - However only supports one user tag.
  - The resulting tag is '@\<user first name\>'
- The user tag options list
  - Triggered by the '@' character. Removing the trigger character removes the list.
  - Any input typed after the trigger character will be used to filter the list.
    - Filtering is case insensintive.
    - Filtered by options that contain the search substring.
    - If there are no optoins that contain the search substring, the list is not displayed.

## Opportunities for Improvement (Tons!)
### Functional
- Add support for tagging multiple users in one comment.
- Add details tooltip that displays when the user hovers over the tag.
- Fix edge case bugs and make functionality more robust.
- Use the full name for the tag, and option filtering.

### Technical
- Use SCSS.
- Implement best practice angular file and directory structure.
  - Possibly seperate html template files.
  - Find better homes for the interfaces.
- Create and use a comments service for getting the comments.
- Move the comment form related code to its own component.
- Cleanup and standardize naming across the files and code.
- Cleanup unecessary listener actions.
- Simplify, clarify, and optimize the tag search term tracking and string parsing.
- Add more unit tests.
- Add e2e tests.
- Make alot of the class members and methods private or protected.

### Design
- Refine styles and add animations.
- Style tag in comment text display and input.
- Fix styling of the options box to be more reactive with better positioning.

## Notes
- The housing app is from the Angular basic tutorial I did for this project to get introduced to Angular basics.
- All test data is static and very basic.
