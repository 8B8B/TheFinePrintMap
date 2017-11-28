We did some manual testing in addition to the automatic testing in initTesting.js

Because our project is front end heavy and we are not using MEAN, we cannot do
much of the testing standard in MEAN stack i.e. CRUD testing, multiple user testing,
and algorithmic testing. Therefore, most of our testing cannot be done automatically
and must be done manually. This manual testing is sufficient for much of our project.


Here are some examples of the manual testing we completed and the problems that we found:

1) Found an error when you checked one of the checkboxes and then refreshed the
   browser in firefox, the box flips functionaliy, remaining checked and showing
   the information when you unclick the checkbox
2) When you click on the text next to the checkboxes, the checkbox becomes marked
   except for the demographic text which needs to be clicked on specifically



Here are examples of other manual testing that we completed:

1) Clicking on all of the checkboxes individually and making sure the desired outcome occurs
2) Clicking on all of the checkboes in varying groups to make sure the desired overlay
   occur together
3) Making sure the map loads when the page loads, indicating that the connection
   to the API is still functioning
4) Making sure that the boxes all do the correct task and show the correct information
5) Checking that the queries from the database are pulling the correct Information
6) Making sure the get request from RTS API is succesfully processed through the browser
   inspector tool which prints to console.