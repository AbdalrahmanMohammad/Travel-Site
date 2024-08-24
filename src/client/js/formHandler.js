// Replace checkForName with a function that checks the URL
import { checkForUrl } from './urlChecker'

const addDest = document.querySelector("#add-dist");
const closeDest = document.querySelector(".inputs form i");
const form = document.querySelector("form");

function showHide() {
    if (form.style.display == "flex")
        form.style.display = "none";
    else
        form.style.display = "flex";
}

document.querySelector("body").addEventListener("click", handleBodyClick);
function handleBodyClick(e) {
    // if the user clicks on addDest it will toggle the form or if he clicks on the X in the form 
    // or if the form is visible and the user clicks anywhere outside it
    if (e.target == addDest || e.target == closeDest || form.style.display === "flex" && !form.contains(e.target)) {
        showHide();
    }
};


// Function to send data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}



// Export the handleSubmit function
// export { handleSubmit };
export { postData };

