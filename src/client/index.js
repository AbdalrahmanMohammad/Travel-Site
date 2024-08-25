// js files
import { handleSubmit } from './js/formHandler'
import { handleLocalStorage } from './js/formHandler'
import { checkForDate } from './js/dateChecker'

// sass files
import './styles/resets.scss'
import './styles/base.scss'
import './styles/header.scss'


document.querySelector('form').addEventListener('submit', handleSubmit);
document.querySelector("body").addEventListener("click", handleLocalStorage);


// alert("I EXIST")
// console.log("CHANGE!!");

