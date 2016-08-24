# demo_ajax_db_search
GOAL: Use AJAX to enable a sortable, instantly updating database search app.
DATABASE: The db used for this project was provided by Coding Dojo. A PDF of the ERD can be found in the root folder.

# current features
SEARCH FEATURES:
All search features are independent of each other and 
1. Search first\_name and last\_name fields simultaneously for strings entered by user
2. Filter results by created\_at column with a start date and/or an end date

VIEW FEATURES:
1. Dynamic pagination
  a. 10 entries per page
  b. Pagination disappears when there's only one page
2. Sort by clicking on column headers
  a. Clicking a column header switches to sorting by that column
  b. Clicking the selected header switches between ASC and DESC order
