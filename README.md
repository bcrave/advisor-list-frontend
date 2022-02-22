# Advisor List Frontend

## About this Project
This project was made to help me practice my skills in data filtering, `React` with `TypeScript`, and `Tailwind CSS`.  The biggest challenge of this project was figuring out how to store the various states, so that certain filters persisted even after new ones were applied.  If I were to refactor this, I would probably try using the `useReducer` hook to manage the state, as it actually is much more complicated than I had thought it would be when I started.  I decided to stick with `useState`, as it's what I'm more familiar with, and the app is small enough that my state management didn't get out of control.

Using TypeScript is a joy as always.  I love how it documents itself as you use it. Just follow the errors and you learn how it's suppose to work.  I also think Tailwind is the future of styling components.  It looks rather verbose at first glance, but it was really easy to use, and a lot more enjoyable than switching between files and trying to remember which class names you used where.  It also encourages DRY code, because you don't want to be repeating style groups a lot.  Then again, that is the point of React, and for that reason Tailwind is a great companion to it.

## How to Use
To run this app on your local machine, you'll need both this repository, as well as the backend [advisor-list-backend](https://github.com/bcrave/advisor-list-backend).

- Clone this repo and enter the project
- Run `npm install` to get all the necessary dependencies.
- Run `npm run start` to run the app on default port `3000`

If no data is loading, make sure your [backend](https://github.com/bcrave/advisor-list-backend) is running.
