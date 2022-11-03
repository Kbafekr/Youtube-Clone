# Youtube Clone
 Youtube Clone

Welcome to hootube!

hootube is a Youtube clone that allows users to share videos and interact with other channels. Users can upload videos, follow other users, comment on, and like videos.

Link to test out website: https://you2oob.herokuapp.com

## Tech Stack
 Frontend:
* React
* Redux
* JS
* HTML
* CSS

DB:
* SQLAlchemy  



hootube
* Clone/download the repo https://github.com/Kbafekr/Youtube-Clone

* cd into hootube folder and ``` run pipenv install ```

* Open two terminal paths for both hootube and react-app.
* Under hootube ``` run pipenv shell  then flask run, for react-app run npm install```
* Create a .env file under the root of the backend folder with the following contents:

  ``` REACT_APP_BASE_URL=http://localhost:5000 ```


## Getting started
Clone the repository then install dependencies

using ```pipenv install -r requirements.txt ```
Create a .env file based on the example with proper settings for your development environment


 ``` Get into your pipenv run pipenv shell,flask db upgrade, flask seed all, flask run```



# Environment Info
```
DATABASE_URL=sqlite:///dev.db
FLASK_DEBUG=True
SECRET_KEY=«generate_strong_secret_here» 
```

``` 
Inside react-app create another .env and add     REACT_APP_BASE_URL=http://localhost:5000 

```
