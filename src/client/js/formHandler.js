// Replace checkForName with a function that checks the URL
import { checkForUrl } from './urlChecker'

const agreement = document.querySelector(".agreement span:last-child");
const confidence = document.querySelector(".confidence span:last-child");
const score_tag = document.querySelector(".score_tag span:last-child");
const subjectivity = document.querySelector(".subjectivity span:last-child");
const result = document.querySelector(".bottom span:last-child");

const form = document.getElementById('urlForm');
if (form) {
    form.addEventListener('submit', handleSubmit);
}
function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // If the URL is valid, send it to the server using the serverURL constant above
    if (checkForUrl(formText)) {
        postData('http://localhost:8000/analyze', { "url": formText }).then(data => {
            console.log('Received data:', data);
            agreement.innerHTML = data.agreement;
            confidence.innerHTML = data.confidence;
            score_tag.innerHTML = data.score_tag;
            subjectivity.innerHTML = data.subjectivity;
            result.innerHTML = data.sentence_list[0].text;
        })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    else {
        alert("please enter a valid URL");
    }

}

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
export { handleSubmit };
export { postData };

