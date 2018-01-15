# [Support Wheel Of Fate](https://which-engineer-is-it-anyway.herokuapp.com/)

## What is it?
An app to assign engineers to support roles and see who's on support today.

| Desktop      | Mobile         |
| ------------- |:-------------:|
| <img width="1437" alt="screen shot 2018-01-15 at 10 28 18" src="https://user-images.githubusercontent.com/19147734/34938069-d9e801a2-f9de-11e7-809d-ea80aa48456a.png"> | <img width="371" alt="screen shot 2018-01-14 at 22 44 27" src="https://user-images.githubusercontent.com/19147734/34938077-df4a7d64-f9de-11e7-95ed-86a3355390a7.png"> |

#### The rules
- [x] an engineer can work a maximum of 1 half day shift per day
- [x] an engineer can not work shifts on consecutive days
- [x] an engineer must complete 2 shifts in a two-week period
- [x] must have an api and a presentational frontend

#### The app
The app allows the user to generate which engineers will cover support today. In a real use case, the user would be restricted to generating this only once per day but I've left it open so that you can check that the functionality works as expected.


#### Stack

| Frontend      | Backend       | Database   |
| ------------- |:-------------:| ----------:|
| React         | Express       | postgresql |
| Tachyons      | Node          |            |


## Running the project
Follow these steps to get the project running on your local machine
```
git clone https://github.com/jessicasalmon/support-wheel-of-fate.git
cd support-wheel-of-fate
npm i
npm dev-start // starts the app
npm test // runs the tests
npm run build-local-db // build the database
```

## Roadmap
Some ideas for how I'd extend the project if building out into a product

- Rota: set support shifts in advance
- Swap shifts: not a good day to be on support? Or perhaps you're sick. No worries, swap your shift with a friendly co-worker :smile:
- Future/past views: different views for people: working today, this whole week, next two weeks and the past


View the live site [here](https://which-engineer-is-it-anyway.herokuapp.com/).
