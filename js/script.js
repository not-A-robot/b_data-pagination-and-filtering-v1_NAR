/* Treehouse Techdegree: FSJS Project 2 - Data Pagination and Filtering */

//Global Scope Variables
const itemsPerPage = 9;
const linkList  = document.querySelector('.link-list');


//searchBar
document.querySelector('header').insertAdjacentHTML('beforeend', '<label for="search" class="student-search"><span>Search by name</span><input id="search" placeholder="Search by name..."><button type="button"><img src="img/icn-search.svg" alt="Search icon"></button></label>');


document.querySelector('input').addEventListener('keyup', (e) => {
   const search = document.querySelector('input').value.toLowerCase();
   let newStudentList = [];
   for(let i = 0; i < data.length; i++){
      const student = data[i];
      const fullName = student.name.first.toLowerCase()+' '+ student.name.last.toLowerCase();
      if (fullName.includes(search)){
         newStudentList.push(student)
      }
   }
   showPage(newStudentList, 1);
   addPagination(newStudentList);
});
/* showPage: This function will create and insert/append the elements needed to display a "page" of nine students */

function showPage(list, page) {
   const startIndex = (page  * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage)-1;
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for(i = 0; i < list.length; i++){
      if(i >= startIndex && i <= endIndex){
         const student = list[i];
         let currentStudent = 
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

/* addPagination: This function will create and insert/append the elements needed for the pagination buttons */
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage)
   linkList.innerHTML = '';
   for(let i = 1; i < numOfPages; i++){
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

//Watch Pagination Buttons
linkList.addEventListener('click', (e) => {
   if( e.target.tagName === 'BUTTON' ){
      document.querySelector('.active').className = '';
      const newPage = +e.target.textContent;
      e.target.className = 'active';
      showPage(data,newPage);
   }
});

// Initial Call functions
showPage(data, 1);
addPagination(data)