# E-commerce 🏢
Welcome to my project! This is a brief guide on how to get started with the project after cloning and how to use Docker Compose to start up the project.

## Getting Started 🔥
To get started with the project, follow these steps:

1. Clone the repository to your local machine using the following command:
```
git clone https://github.com/Gaurav-jo1/E-commerce.git
```

2. Navigate to the project directory:
```
cd E-commerce
```

3. Inside the **frontend** directory Install the project dependencies using the following command:
```
npm install
```

4. Generate a secret key from this website [miniwebtool.com/django-secret-key-generator](https://miniwebtool.com/django-secret-key-generator/) and in the **backend** directory create a **.env** file and paste the secret key like this:
```
SECRET_KEY='w7%cjn4@v3$73a$_h!$t2q8il1fy5k%uhwqck#pbwzvo+4ztfs'
```
5. For Google Sign-In credentials, you'll need to follow these steps:

* Set up a Google API Console project and configure the consent screen:
* Go to the [Google API Console](https://console.cloud.google.com/apis/dashboard)
* Create a new project
* Click on "Create credentials" and select "OAuth client ID"
* Select "Web application" as the application type
* Enter a name for your OAuth client ID
* Add the authorized JavaScript origins and redirect URIs for your website
* Click "Create"
* Note down your client ID and client secret for later use.

**You can also refer to this [Video tutorial](https://www.youtube.com/watch?v=roxC8SMs7HU)
 for setting up the Google API console**

6. After finishing up the Google API console download the file in form of JSON and name the file client_secret.json and paste that file inside frontend directory.

<p align="center">
<img src="https://user-images.githubusercontent.com/93304640/236677794-cddb3f35-2ef9-4a60-b9cf-8547a3a54753.png" alt="client_json_img" width="450" height="450">
</p>

7. Add the **Google client ID** in the backend directory inside the **.env** file like this:
```
GOOGLE_CLIENT_ID='your_google_client_id'
```


## Using Docker Compose 🐋
The project can also be run using Docker Compose. To do this, follow these steps:

1. Install Docker Compose if it's not already installed on your system.

2. Navigate to the project directory.

3. Run the following command to start the project:

```
docker-compose up
```
This will start the project and any necessary dependencies in Docker containers.

4. Access the application at http://localhost:5173.

That's it! You should now be able to get started with the project and use Docker Compose to run the application. If you have any questions or issues, feel free to open an issue on the repository. Thanks for using my project!




