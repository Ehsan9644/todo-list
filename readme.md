# Todo List with CRUD Operations and Sign-in Functionality

This project is a simple todo list application that allows users to perform CRUD (Create, Read, Update, Delete) operations on todo items. Additionally, it provides sign-in functionality through an API.

## Features

- **CRUD Operations**: Users can create, read, update, and delete todo items.
- **Sign-in Functionality**: Users can sign in to access their todo list.
- **API Integration**: The application integrates with the API provided by `https://dummyjson.com/docs/todos` for managing todo items and user authentication.
  - The API endpoint for fetching user todos is used to populate the initial todo list.

## Technologies Used

- **HTML/CSS**: For the structure and styling of the web application.
- **JavaScript**: For client-side interactions, API integration, and local storage management.
- **API**: Utilizing the API provided by `https://dummyjson.com/docs/todos` for managing todo items and authentication.
- **AJAX**: Used for making asynchronous requests to the API endpoints.

## Getting Started

1. Clone the repository to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. Open the project directory in your code editor.

3. Replace the placeholder API endpoints in the JavaScript code with the actual endpoints provided by `https://dummyjson.com/docs/todos`.

4. Add the following login credentials to the login form in your application:
    - Username: rshawe2
    - Password: OWsTbMUgFc

5. Open the `index.html` file in your web browser to run the application.

## Usage

1. **Sign-in**: Users need to sign in using the provided credentials.
2. **View Todo List**: Upon signing in, users can view their existing todo list fetched from the API. Additionally, the application retrieves todos from local storage if available.
3. **Add Todo**: Users can add new todo items by clicking on the "Add Todo" button and providing the necessary details. New todos are stored in local storage and synced with the API.
4. **Edit Todo**: Users can edit existing todo items by clicking on the edit button next to each item and modifying the details. Changes are reflected both locally and on the server.
5. **Delete Todo**: Users can delete todo items by clicking on the delete button next to each item. Deletions are synchronized with the API and local storage.
6. **Sign-out**: Users can sign out of their account when done.

## Local Storage

Local storage is used to store todo items locally within the user's browser. This allows the application to persist todo data between sessions, even if the user refreshes the page or closes the browser. Since the API endpoints provided by `https://dummyjson.com/docs/todos` are read-only and cannot make changes to the database, local storage serves as a temporary storage solution for managing todo items.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or feature requests, feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
