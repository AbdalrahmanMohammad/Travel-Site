
// Check if the Date is valid
function checkForDate(date) {
    let diffDays = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));// calculate days difference between now and the input data
    // the input date should be not less than now date and the diffrence is less than 15 days
    return diffDays<=15&&diffDays>=0;
}

export { checkForDate };
