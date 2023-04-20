## Server setup

### Node Modules

npm init -y
npm install express
npm install mysql
npm install dotenv
npm install nodemon --save-dev
npm install cors
npm install bcrypt
npm install jsonwebtoken

scrpits:
"start": "nodemon"

npm start

### Database

guess_right

-User
--ID
--first_name
--last_name
--email
--password
--last_login
--points
--done_quiz
--quiz_id

-Leaderboard
--ID
--user_ID
--points

-Quiz
--ID
--title
--questions_ID
--amount_done

-Questions
--ID
--choice_ID
--image
--description

-Choices
--ID
--choice1
--choice2
--choice3
--choice4
--correct_answer


## Client setup


## Admin setup