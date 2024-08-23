
// Check if the URL is valid
function checkForUrl(url) {
    // regex pattern to check for URLs
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;


    // Test if the input matches the regex pattern and it is not empty
    return url.length > 0 && urlPattern.test(url);
}

export { checkForUrl };
