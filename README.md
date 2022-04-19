# Project-4

## Deployed Project Link
To do

## Overview & Concept
### Brief
My first solo full stack project. I had a 10 day timeframe, it was my fourth and final project during my Software Engineering Immersive bootcamp at General Assembly. It was completed 12 weeks into the course and the start of my coding journey.

My task was to create a Django back-end that provides an API for my React front-end to use. 

### Concept
I wanted to create a group finding and organising tool for the pen & paper role-playing game community. As a longtime player I know the struggle of finding a good group and organising the game.

The aim of the website is for Users to find others and see their created games and characters. Users can then request to add another User or one of their characters to a game. Alternatively, a user can request to join an ongoing game.

### Technologies Used

- JavaScript
- Python
- JSX

### Back-end
- Django
- Djangorestframework
- Pylint
- Autopep8
- Psycopg2-binary
- Pyjwt

### Front-end
- React
- React-router
- React-router-dom
- React-dom
- React-dotenv
- React-scripts
- React-select
- Sass
- React-Bootstrap
- Axios

## Approach Taken 
### Wireframing
I used excalidraw.com to create my wireframes for each page. I used these to visualise my front-end and the styling needed. I wanted a uniform look to my site so all of the show pages and list pages followed the same style.

![image14](https://user-images.githubusercontent.com/94997077/163831656-977fe613-bee8-4868-b85b-6c65e9378e2a.png)

### Model Relationships
I used quickdatabasediagrams.com to help me visualise my model relationships. I found this more challenging to visualise than my relationships using Mongoose.

![image9](https://user-images.githubusercontent.com/94997077/163831688-f7afa731-ddb5-4b35-b8cc-23a435a1ab98.png)

### Back-end

### User Model
A fairly simple User class, additional fields are added as foreign keys on other models such as ownership of a game or character.

<img width="520" alt="image16" src="https://user-images.githubusercontent.com/94997077/163831796-57c24dee-60a7-4adb-8546-44f3b5d7d6ae.png">

### Game Model
The game model is where the game owner is coded. It also features two many-to-many relationships. The first is the members of the game, second are the characters involved in the game.

<img width="452" alt="image12" src="https://user-images.githubusercontent.com/94997077/163831815-070c08d2-7089-4be0-bccd-29d75dfaaef6.png">

### Character Model
The character model is simple, much like the game model we designate the owner of the character here.

<img width="479" alt="image2" src="https://user-images.githubusercontent.com/94997077/163831861-85220143-1e15-4fe3-9f30-835f8dcd8866.png">

### Game Comment Model
After facing issues with my comment model I decided to split the comment model in two, one for games and another for characters. The foreign fields here dictate the game the comment belongs to and the comment’s owner.

<img width="409" alt="image1" src="https://user-images.githubusercontent.com/94997077/163831898-2efd896c-271c-4da0-aed7-d8851f614cb7.png">

### Character Comment Model
The character comment model is mostly identical to the game comment model except for the character field.

<img width="410" alt="image7" src="https://user-images.githubusercontent.com/94997077/163831917-b8d20e80-c843-432a-acb1-3541a5a04e92.png">

## API-End-Points
The API-end-points are what url we target with Axios requests. For example below shows a PUT request.

<img width="821" alt="image3" src="https://user-images.githubusercontent.com/94997077/163831986-a0248e88-acb7-4cb9-8ebf-a3cdba242e1d.png">

### Register / Login
To login or register is a simple POST request containing the user data.

**Register User** - POST /api/register/

<img width="270" alt="image8" src="https://user-images.githubusercontent.com/94997077/163832027-c73f5e6c-3a33-4bb1-a797-34e2aacbae63.png">

**Login User **- POST /api/login/

<img width="188" alt="image17" src="https://user-images.githubusercontent.com/94997077/163832036-cee076ef-2893-4bf2-9463-98857d32a547.png">

### Users
The user profile needs to be retrieved with a GET request, edited with a PUT request or removed with a DELETE request. 

**Get all Users** - GET /api/users/

No body required

**Get a single User** - GET /api/users/[userID]/

No body required

**Edit a User (secure route)** - PUT /api/users/[userID]/

Body must be an existing field and different from the current value.

**Delete a User (secure route)** - DELETE /api/users/[userID]/

No body required

### Games
The game endpoints let us retrieve, add, edit and delete.

**Get all games** - GET /api/games/

No body required

**Get single game** - GET /api/games/[gameID]/

No body required

**Create a game** - POST /api/games/

<img width="158" alt="image13" src="https://user-images.githubusercontent.com/94997077/163832187-f1495541-940c-4914-ad26-05d812ee057c.png">

**Edit a game (secure route)** - PUT /api/games/[gameID]/

Body must be an existing field and different from the current value.

**Delete a game (secure route)** - DELETE /api/games/[gameID]/

No body required

### Characters
The character endpoints let us retrieve, add, edit and delete.

**Get all characters** - GET /api/games/

No body required

**Get single character** - GET /api/characters/[characterID]/

No body required

**Create a character** - POST /api/characters/

<img width="192" alt="image4" src="https://user-images.githubusercontent.com/94997077/163832269-cdb8d1da-b1de-4bc2-b0bf-aa16ee239c27.png">

**Edit a character (secure route)** - PUT /api/characters/[characterID]/

Body must be an existing field and different from the current value.

**Delete a character (secure route)** - DELETE /api/characters/[characterID]/

No body required

### Game Comments
The game comment endpoints let us retrieve, add, edit and delete.

**Get all comments** - GET /api/comments/

No body required

**Get single comment** - GET /api/comments/[commentID]/

No body required

**Create a comment** - POST /api/comments/[gameID]/

<img width="162" alt="image11" src="https://user-images.githubusercontent.com/94997077/163832339-33b3ebca-bba1-463b-9688-4431326c7ae1.png">

**Edit a comment (secure route)** - PUT /api/comments/[commentID]/

Body must be an existing field and different from the current value.

**Delete a comment (secure route)** - DELETE /api/comments/[commentID]/

No body required

### Character Comments
The character comment endpoints let us retrieve, add, edit and delete.

**Get all comments** - GET /api/character_comments/

No body required

**Get single comment** - GET /api/character_comments/[character_commentsID]/

No body required

**Create a comment** - POST /api/character_comments/[characterID]/

<img width="162" alt="image11" src="https://user-images.githubusercontent.com/94997077/163832421-ed11cde5-42aa-4149-9c4c-1ba51a21c495.png">

**Edit a comment (secure route)** - PUT /api/character_comments/character_commentsID]/

Body must be an existing field and different from the current value.

**Delete a comment (secure route)** - DELETE /api/character_comments/[character_commentsID]/

No body required

## Front-end

### Navbar
The navbar has two states depending on if a user is logged in or not. In either state the nav bar can take us to any of the list pages. The site symbol also serves as a home button.

If a user is not logged in the navbar shows buttons to either login or register. If a user is logged in the navbar shows buttons to go to the user’s profile page or to logout.

![image6](https://user-images.githubusercontent.com/94997077/163832519-01e4a370-3ff5-4d4e-af01-f612925fa3db.png)

![image18](https://user-images.githubusercontent.com/94997077/163832530-314e9a5c-9256-4a7b-9549-22d1c14ccc15.png)

I used React Bootstrap for this component, mostly because of the great media query scaling it has. Here we see the mobile view of the navbar and the options dropdown.

<img width="485" alt="image15" src="https://user-images.githubusercontent.com/94997077/163832550-58f43f2b-6472-4c43-985b-3cc3d48c3398.png">

<img width="484" alt="image5" src="https://user-images.githubusercontent.com/94997077/163832563-86ac3cc2-1859-4f91-98bf-1bfab603bab6.png">

### Home page
The home page has a description of the website’s capabilities and purpose. Including a featured game and character to give a good example for users who might not be familiar with pen and paper role-playing games. The images for the featured game and character react on mouse hover (slight darkening and growth), if clicked they lead to the game or characters show page.

### Login / Register / Edit pages
For all of my form pages I used React Bootstrap forms. This allowed the component to be reused quickly, changing the field values depending on what the form's purpose is.

### List pages
All of the games, characters and users on the website can be found on their respective list page. Here each entry has a brief description, when an entry is clicked it leads to that entry's show page.

If a user is not logged in, the top of the page has a login button. If the user is logged in the button is instead a create button, this takes the user to a form page to add a game or character.

### Show pages
The show page gives the user all the information about the selected entry. If the user is the owner of the entry they will see buttons to either edit or delete the entry. Comments will be displayed at the bottom of the page, if logged in a user can add a comment.

### Styling
Apart from using React Bootstrap for the navbar and form pages I used Scss to style the rest of the site. Flexboxes were used for page layout. For animations standard CSS was used. Below is the code for the slow logo spin on the navbar.

<img width="276" alt="image10" src="https://user-images.githubusercontent.com/94997077/163832827-fc22c78a-a631-45eb-9e6c-82e669993172.png">

## Challenges, Bugs & Wins
### Challenges
My biggest challenge with this project was creating the back-end, compared to the non-SQL back-end built in my last project with Node.js.

### Bugs
I currently have a bug with my form pages and the error display. I need to further bug test to figure out why the error text does not show upon an invalid entry.

### Wins
My biggest win would be overcoming the biggest challenge of this project. Building the back-end using an SQL database was frustrating to test due to its rigidity, but I am happy with the end result.

## Future Features + Key Learnings
### Future Changes / Improvements
Comments - Implement comments on the character and game show pages.

Search function - Add a search function, so that from the navbar a user can search for any user, character or game.

### Key Learnings
The biggest lesson for me this project was increasing my understanding and confidence of building an SQL database. Whilst I still prefer non-SQL for testing and quick back-end changes, I see how beneficial the data integrity of SQL is.

### Contact

Email - tommurphyse@gmail.com

Social - [linkedin.com/in/tom-j-murphy/](https://www.linkedin.com/in/tom-j-murphy/)

Project Link - [the-cirlce-project4.netlify.app/](https://the-cirlce-project4.netlify.app/)

GitHub - [github.com/TMurp](github.com/TMurp)



