
import { checkForDate } from './dateChecker'

const addDest = document.querySelector("#add-dist");
const closeDest = document.querySelector(".inputs form i");
const form = document.querySelector("form");

function showHide() {// function to show and hide the form from the screen
    if (form.style.display == "flex")
        form.style.display = "none";
    else
        form.style.display = "flex";
}

document.querySelector("body").addEventListener("click", handleBodyClick);
function handleBodyClick(e) {// show the form if the user press addDest, and hide it on any click outside the form if it is visble
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

function handleSubmit(event) {
    event.preventDefault();

    // Get the Input date
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;
    const dest = document.querySelector(".dest span");
    const dep = document.querySelector(".dep span");
    const max = document.querySelector(".temp span:first-child");
    const min = document.querySelector(".temp span:last-child");
    const weatherDesc = document.querySelector(".desc");
    const remindingTime = document.querySelector(".rem-time");
    const image = document.querySelector(".image");

    // If the date is within 16 days from this day complete the process
    if (checkForDate(date)) {
        postData('http://localhost:8000/getAll', { "city": city, "date": date }).then(data => {
            console.log('Received data:', data);
            if (Object.keys(data.forecast).length != 0) {// the city is found
                let remDays = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));// calculate days difference between now and the input data
                dest.innerHTML = `${city}, ${data.country}`;
                dep.innerHTML = date;
                max.innerHTML = `max: ${data.forecast.max}`;
                min.innerHTML = `min: ${data.forecast.min}`;
                weatherDesc.innerHTML = data.forecast.desc;
                remindingTime.innerHTML = `${city}, ${data.country} is ${remDays} day${remDays > 1 ? 's' : ''} away`;

                if (data.photo == -1)// no image found
                {
                    // if there is no image found show an image with this sentence on it (no image found)
                    image.style.backgroundImage = `url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019")`;
                }
                else {
                    image.style.backgroundImage = `url("${data.photo}")`;
                }
            }
            else {
                alert("The city is not found");
            }

        })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    else {
        alert("please enter a valid date (less the 16 days)");
    }

}

document.querySelector(".save").addEventListener("click", () => {// save whole main code into local storage
    localStorage.setItem("main", document.querySelector("main").innerHTML);
});
document.querySelector(".remove").addEventListener("click", () => {// save main from local storage
    localStorage.removeItem('main');
});
document.addEventListener('DOMContentLoaded', function () {// on page load if there is main in local storage then attach it to innerhtml
    if (localStorage.getItem('main') !== null) {
        document.querySelector("main").innerHTML = localStorage.getItem("main");
    }
});




// Export the handleSubmit function
export { handleSubmit };
export { postData };

