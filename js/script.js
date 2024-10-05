/* 
Treehouse Techdegree: FSJS Project 2 - Data Pagination and Filtering
Submitted 10/4/2024 By Jeff Delacruz username NotARobot
*/

//Global Scope Variables
const itemsPerPage = 9;
const linkList  = document.querySelector('.link-list');

/**
 * Insert Searchbar 
 * @description Inserts the html for the searchbar
 */
//To Reviewer Note:  I've been struggling with the question of why declare a variable like Searchbar, then immediately call it to add the searhbar, then never call it again.  It seems like it would be better to just put it all in one, like i did below.  Let me know your thoughts.
document.querySelector('header').insertAdjacentHTML('beforeend', '<label for="search" class="student-search"><span>Search by name</span><input id="search" placeholder="Search by name..."><button type="button"><img src="img/icn-search.svg" alt="Search icon"></button></label>');

/**
 * Search Bar Listener 
 * @description Listens for user input in the search box, retrieves the student list, and filters it by the entered search term. Updates the displayed student list and pagination based on the search results.
 * @event keyup - Listens for keyup events in the input field.
 * @requires showPage - Renders the list of students on the current page.
 * @requires addPagination - Adds pagination controls based on the number of filtered students.
 */

document.querySelector('input').addEventListener('keyup', () => {
   const search = document.querySelector('input').value.toLowerCase();
   let newStudentList = [];
   for(let i = 0; i < data.length; i++){
      const student = data[i];
      const fullName = student.name.first.toLowerCase() + " " + student.name.last.toLowerCase();
      if (fullName.includes(search)){  
         newStudentList.push(student)
      } 
   }
   if (newStudentList.length === 0) {
      document.querySelector('.student-list').innerHTML = '<center>No results found</center>';
      addPagination(newStudentList);
   } else {
      showPage(newStudentList, 1);
      addPagination(newStudentList);
   }
});

/**
 * @function showPage
 * @description - function creates and inserts student profiles to display a page of nine students from a given
 * list found on data.js.
 * @param {array} list  - the array of objects, based on a list of students in data.js.  Can be filtered using search bar
 * @param {number} page  - the paginated page number of which set of students to show
 */

function showPage(list, page) {
   const startIndex = (page  * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage)-1;
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for(i = 0; i < list.length; i++){
      if(i >= startIndex && i <= endIndex){
         const student = list[i];
         let currentStudent =   //this was the easy way and it didn't specify if i had to use create element?
            `<li class="student-item cf">
               <div class="student-details">
               <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
               <h3>${student.name.first} ${student.name.last}</h3>
               <span class="email">${student.email}</span>
               </div>
               <div class="joined-details">
               <span class="date">${student.registered.date}</span>
               </div>
            </li>`;
         studentList.insertAdjacentHTML('beforeend', currentStudent);
      }
   }
};


/**
 * @function addPagination - calculates and creates buttons of pagination of the different students in the list
 * @param {array} list  - the array of objects, based on a list of students in data.js
 */

function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage)
   linkList.innerHTML = '';
   for(let i = 1; i <= numOfPages; i++){
      li = document.createElement('li');
      button = document.createElement('button')
      button.type = 'button';
      button.textContent = i;
      if(i === 1){
         button.className = 'active'
      };
      li.appendChild(button);
      linkList.appendChild(li);
      }
   }


/**
 * Pagination Button Listener 
 * @description Listens for user clicks the page number buttons and show the next set of students in the data set list.
 * @event click - Listens for keyup events in the input field.
 * @requires showPage - Renders the list of students on the current page.
 */
linkList.addEventListener('click', (e) => {
   if( e.target.tagName === 'BUTTON' ){
      document.querySelector('.active').className = '';
      const newPage = +e.target.textContent;
      e.target.className = 'active';
      showPage(data,newPage);
   }
});


/**
 * Initial Call functions 
 * @description showPage renders the first page of all students in the full database as a starting point paginated into groups of 9
 * @description addPagination renders the pagination buttons and sets the intial value to page 1
 * @event click - Listens for keyup events in the input field.
 * @requires showPage - Renders the list of students on the current page.
 * @requires addPagination - Renders the list of students on the current page.
 * @param {array} data  - the full list of students in data.js
 */
showPage(data, 1);
addPagination(data)

