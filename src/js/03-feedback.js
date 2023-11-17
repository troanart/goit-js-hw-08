import throttle from 'lodash.throttle';

//  1 вариант -----------------------------------

// const STORAGE_KEY = 'feedback-form-state';


// const form = document.querySelector('.feedback-form');
// const textarea = document.querySelector('.feedback-form textarea')
// const inputMail = document.querySelector('.feedback-form input')

// const userData = {};

// form.addEventListener('submit', onFormSubmit);
// inputMail.addEventListener('input', throttle (onItemFormClick, ))
// textarea.addEventListener('input',throttle (onItemFormClick, ));

// reloadPage

// function onItemFormClick (e) {
//    if(e.target.tagName !== "INPUT") {
//         let formTextarea = e.currentTarget.value 
//         userData.message = formTextarea;
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
//    } else {
//         let formEmail = e.currentTarget.value
//         userData.email = formEmail;
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        
//    }
// }

// function onFormSubmit(e) {
//     e.preventDefault();

//     if (inputMail.value === "" || textarea.value === "") {
//         return alert(`Please fill in all the fields!`);
//     }
//     console.log(userData)
//     e.currentTarget.reset()
//     localStorage.removeItem(STORAGE_KEY);

    
  
// }


// function reloadPage() {
//     const saveData = JSON.parse(localStorage.getItem(STORAGE_KEY))
//     if(saveData) {
//         textarea.value = saveData.message || '';
//         inputMail.value = saveData.email || ''; 
//     }
    
// }


// 2 вариант (оптимизированный ) -------------------------------------- 

const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(storageFormData, 500));
form.addEventListener('submit', onFormSubmit);

reloadPage();

function storageFormData(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function reloadPage() {
  if (formData) {
    let { email, message } = form.elements;
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}