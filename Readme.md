# E-commerce 🏢
Welcome to **Shoppy**, Shoppy is a portfolio project designed to showcase a seamless online shopping experience. With features like user login, sign-up, Google login, a great UI, and Redis for caching, it offers a robust and efficient platform for modern e-commerce.

## Getting Started 🔥
To get started with the project, follow these steps:

1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/Gaurav-jo1/E-commerce.git
    ```

2. Navigate to the project directory:
    ```sh
    cd E-commerce
    ```

3. Install the frontend project dependencies:
    ```sh
    cd frontend && npm install
    ```

4. Set up the backend environment (optional for development):
    - Create a virtual environment:
        ```sh
        cd backend && virtualenv venv
        ```
    - Activate the virtual environment and install dependencies:
        ```sh
        source ./venv/bin/activate && pip install -r requirements.txt
        ```

5. For Google Sign-In credentials (optional):
    - Set up a Google API Console project and configure the consent screen:
        - Go to the [Google API Console](https://console.cloud.google.com/apis/dashboard)
        - Create a new project
        - Click on "Create credentials" and select "OAuth client ID"
        - Select "Web application" as the application type
        - Enter a name for your OAuth client ID
        - Add the authorized JavaScript origins and redirect URIs for your website
        - Click "Create"
        - Note down your client ID and client secret.

    - Refer to this [Video tutorial](https://www.youtube.com/watch?v=roxC8SMs7HU) for setting up the Google API console.

6. Download the JSON file with your Google API credentials, name it `client_secret.json`, and place it in the `frontend` directory.

    <p align="center">
    <img src="https://user-images.githubusercontent.com/93304640/236677794-cddb3f35-2ef9-4a60-b9cf-8547a3a54753.png" alt="client_json_img" width="450" height="450">
    </p>

7. Add the Google client ID to the backend `.env` file:
    ```sh
    GOOGLE_CLIENT_ID='your_google_client_id'
    ```

8. **Run the application:**
   - Navigate to the root directory and start the services with Docker:
     ```sh
     docker compose up
     ```

Access the application at [http://localhost:5173](http://localhost:5173).

That's it! You should now be able to get started with the project and use Docker Compose to run the application. If you have any questions or issues, feel free to open an issue on the repository. Thanks for using my project!


# Notes

