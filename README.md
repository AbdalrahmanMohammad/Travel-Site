# Travel-Site

Travel-Site is a web application built using Node.js as a backend that allows users to enter a travel destination and a departure date and then shows weather forecast with a photo of the entered destination. The site integrates with three APIs to provide users with relevant travel information:

1. **GeoNames API**: Retrieves the coordinates of the city entered by the user.
2. **Weatherbit API**: Fetches the weather forecast for the specified date using the coordinates obtained from GeoNames.
3. **Pixabay API**: Retrieves a photo of the user's specified destination.

The site is developed with modern web technologies including Webpack, Sass, Node.js, and incorporates service workers for offline functionality. Additionally, the application uses local storage to allow users to save their travel details.

## Features

- **Dynamic API Integration**: Utilizes GeoNames, Weatherbit, and Pixabay APIs to provide comprehensive travel information.
- **Webpack and Sass**: Built with Webpack for module bundling and Sass for enhanced styling capabilities.
- **Service Workers**: Implements service workers for offline functionality, allowing the site to be used even without an internet connection.
- **Local Storage**: Saves user travel preferences and details in local storage.
- **Testing**: Includes a test suite using Jest for ensuring the reliability of the backend API endpoints and client-side functionality.

## Dependencies

The project relies on the following npm packages:

- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `supertest`: Super-agent driven library for testing Node.js HTTP servers.
- `jest`: Delightful JavaScript Testing Framework with a focus on simplicity.
- `dotenv`: Loads environment variables from a `.env` file into `process.env`.
- `webpack`: A static module bundler for modern JavaScript applications.
- `webpack-cli`: A CLI tool to interface with Webpack.
- `webpack-dev-server`: A development server for running Webpack projects.
- `sass`: A CSS preprocessor to add power and elegance to the basic language.

## Installation

To set up and run the Travel-Site project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/AbdalrahmanMohammad/Travel-Site.git
    cd Travel-site
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Build the project**:
    ```bash
    npm run build-prod
    ```

4. **Run the development server**:
    ```bash
    npm start
    ```

5. **Open your browser** and navigate to `http://localhost:8000` to view the application.

## Usage

1. Enter your desired destination in the input field.
2. Select a departure date.
3. Click the "Get Travel Info" button to retrieve weather forecast and a photo of the destination.
4. Optionally, save your travel details to local storage to revisit them later.

## Running Tests

To run the tests for the project:

```bash
npm run test
```

## See Travel-Site in Action

![Recording 2024-08-30 at 00 39 29](https://github.com/user-attachments/assets/ca703c4b-a1bf-4ada-972f-37d09e2c17f9)




