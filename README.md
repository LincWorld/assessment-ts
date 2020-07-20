# Overview

Welcome to Node.js assessment.

You are required to pass the test to prove your skills; the test consists of:

- [ ] **Part1:** Javascript/Typescript Test
- [ ] **Part2:** Node.js Test

## Initialize the Project

To start your assessment, clone the project into a local machine. This project runs on Node.js LTS.


Initialize the project by running

```bash
npm install
```

To start the installation of the project dependencies to the local machine.

now...

The typescript files you need to work on are in `src` directory. You can compile them by running

```bash
npm run build
```
You can have it automatically compile while you edit the files by running
```bash
npm run watch-ts
``` 

**You're all set now!**


## Assessment Submission

After finishing your assessment, the candidate must do the following:

1. Delete the `node_modules` and `dist` folders.
2. Compress all the remaining files in this folder into any compressed format (`.zip`, `.rar`, `.tar`, `.gz`, or any).
3. Send the file back to us via Email.

**Please note that**, editing any of the irrelevant files (Outside of `src/part1` and `src/part2`) may affect your assessment result.

# Part 1

Javascript/Typescrypt skill. This part focuses on language syntax and skills. The assessments also involve basic Programming and Logical thinking.

## Prerequisites

This part's materials are in `src/part1`. Each of the questions is separated in its file with a corresponding name. For answering each question, please write them in the provided function contained in each file.

You are free to install _any_ library you require. This project initially comes with [lodash](https://lodash.com) installed

The project is initialized with the latest ES2017 syntax. The syntax list that is set up and available to use are:

- `const`, `let`
- `() => {}` arrow function
- `Promise`
- `async/await`
- `ES6 class`
- `...obj` spread operator

## Evaluation

The evaluation can execute through:

```bash
npm run test-part1
```

If the result shows to be **100%**, you are more likely to do it right!

## 1. Asynchronous Delay

One of your program parts needs to wait for I/O function call. Write a function that can delay the process in Javascript. The function should take the first argument as `delay` which is the delay time in millisecond. Also, the second argument, `callback` which is the continuing process that should run after the `delay` millisecond had passed.

For example, your function
```javascript
asynchronousDelay(3000, () => {
  console.log("haha")
})
```
should log out _haha_ after 3 seconds.

## 2. Transform Arguments!

Assuming you have a function which takes a large number of arguments. For example, `sum(a, b, c, d, e, f)` takes 6 arguments and return a summation of each argument. Write a function `transformArgumentsToArray` that take a function similar to `sum` as its argument, and return a new function. This new function takes only 1 argument as an array, but still be able to process exactly as the function pass to `transformArgumentsToArray`.

For example, if we pass `sum` function to `transformArgumentsToArray`, it will return a new function that can take `newSum([a, b, c, d, e, f])` and will still return the same result as calling `sum(a, b, c, d, e, f)`.

```javascript
// for example
sum(1, 2, 3, 4, 5)
// -> return 15

// passing sum to the function will return newSum function
const newSum = transformArgumentsToArray(sum)
// calling newSum with array param
newSum([1, 2, 3, 4, 5])
// -> return 15
```

## 3. 24K Magic in the Array

Have the function `magicArray(arr)` take the `arr` array and return the summation of each member in the array under these conditions:

- member of `arr` is guaranteed to be Number type.
- If any member in `arr` is divisible by 7, it is excluded from the calculation. For example, if the array is `[5, 3, 14, 8]` the number `14` is ignored.
- The function should return the summation of the other member in the array.
- For example, `[5, 3, 14, 8]` should return `16`.

## 4. Wait a minute

Have the function `waitAMinute(startTime, endTime)` take two number of arguments. These arguments are the start time and end time in timestamp in standard timestamp in **string** format: `2018-06-01T08:18:12.907Z`. This function counts the interval called "Pomodoro" which is the focus working time interval that goes like this; Work 25 minutes then break a short break for 5 minutes. Then, back to work for 25 minutes and so on. The timer goes on for 4 intervals, after the 4th work interval, the break interval would be a _long break_ which take 15 minutes. After that, it would be a work time again for 25 minutes. So the whole thing starts over.

For example, the interval went on like this;

Start: Pomodoro 1

==== 25 minutes passed ====

break 1 (Short break)

==== 5 minutes passed ====

Start pomo 2

==== 25 minutes passed ====

break 2

==== 5 minutes passed ====

Start pomo 3

==== 25 minutes passed ====

break 3

==== 5 minutes passed ====

Start pomo 4

==== 25 minutes passed ====

break 4 (Long Break)

==== 15 minutes passed ====

Start pomo 5

=== another 25 minutes ====

... and so on

This function `waitAMinute(startTime, endTime)` count and return the number of Pomodoros completed during `startTime` and `endTime`, note that an incomplete Pomodoro must be discarded.

For example:

```javascript

waitAMinute("2018-06-01T08:18:12.907Z", "2018-06-01T09:08:12.907Z")
// -> return 1

waitAMinute("2018-06-01T08:18:12.907Z", "2018-06-01T09:14:12.907Z")
// -> return 2

waitAMinute("2018-06-01T08:40:39.024Z", "2018-06-01T11:21:54.099Z")
// -> return 5

```

**Note**:

- It's guaranteed that `endTime` is always be later than `startTime`
- You are free to use any library you wish. Though, you need to install it right :D.


# Part 2

Backend skill. This part will focus on Node.js common widely use libraries and how to implement them.

## Prerequisites

This part's materials are in `src/part2`. This part contains an ecosystem project built base on the Node.js popular web server, [Express.js](https://expressjs.com/). Your task would be to write API(s) for each of the assessments, most of the setup had been prepared fairly well. Be sure to understand the setup and write your assessment from the setup. Further instruction will be given upon each assessment.

## Evaluation

The project is set up with Express.js, and it can run via

```bash
npm run start-part2
```

The Web server will start through port 3000, and you are good to go.

Same as part1, the evaluation can execute through

```bash
npm run test-part2
```

## 1. A bunch of readmes

In the folder `files/readme` contains several text files with a specific name, write an API with the spec.

```
GET /files/:filename
```

The `filename` should be the file name in the `files/readme` folder on which the API should read.

The response should return file name, string character count, and the content of the file in JSON format like this:

```json
{
  "filename": "the-file-name",
  "length": "as string character count of the file",
  "content": "...the content of the file"
}
```

for example,

```
GET /files/hello-world.txt
```

should return

```json
{
  "filename": "hello-world.txt",
  "length": 12,
  "content": "hello world!"
}
```

In case the file name does not exist in the folder, the API should return with _http status code_ 404 with this error.

```json
{
  "error": "file not found!",
  "code": 404
}
```

## 2. A RESTful way

In the `src/part2/routes/users.js`, there is an unfinished Restful API that needs to be improved!
Currently, the users API returns a set of user data persisting in our database.

### A. Enhance user list

The API get users list is the following:

```
GET /users
```

At the moment, the API only return dump user object.

```json
[
  {
      "_id": "the-id",
      "isActive": true,
      "firstName": "Some-one",
      "lastName": "Good-name",
      "balance": "₹2000"
  }
]
```

Ideally, this API should return the list of users contains in the database as an array list.

For the sake of this assessment, we provide a function which virtually gets users from the persistent storage. The `getUsers()` function read database with delay time about 300-800 millisecond. Therefore, it returns a [Promise](https://scotch.io/tutorials/javascript-promises-for-dummies) that resolve the array of all Users.

```json
[
  {
    "_id": "5dbf0b6cb54f57e25f28b7d7",
    "isActive": false,
    "firstName": "Gonzalez",
    "lastName": "Spence",
    "balance": "₹10,501.04",
    "age": 37,
    "eyeColor": "blue",
    "company": "QIAO",
    "email": "gonzalez.spence@qiao.org",
    "phone": "+91 8824602720",
    "address": "305 Cass Place, Lodoga, Idaho, 2921",
    "registered": "Sunday, December 10, 2017 5:40 AM"
  },
  {
    "_id": "5dbf0b6cf24edbfa1662df9a",
    "isActive": false,
    "firstName": "Oneal",
    "lastName": "Prince",
    "balance": "₹19,874.09",
    "age": 34,
    "eyeColor": "brown",
    "company": "HAIRPORT",
    "email": "oneal.prince@hairport.io",
    "phone": "+91 9555372987",
    "address": "405 Jackson Street, Lowell, North Carolina, 5385",
    "registered": "Tuesday, December 13, 2016 9:04 PM"
  },
  {
    "_id": "5dbf0b6c98900a329ab71351",
    "isActive": false,
    "firstName": "Poole",
    "lastName": "Duran",
    "balance": "₹19,747.36",
    "age": 34,
    "eyeColor": "blue",
    "company": "INDEXIA",
    "email": "poole.duran@indexia.ca",
    "phone": "+91 8134723840",
    "address": "522 Oliver Street, Chicopee, Puerto Rico, 8120",
    "registered": "Friday, November 14, 2014 6:32 AM"
  },
  ...
]
```

However, for this API endpoint, we _do not_ want all the detail object to return with this API. The API we actually want should look like this:

```javascript
// GET /users
// will return
[
  {
    "_id": "5dbf0b6cb54f57e25f28b7d7",
    "isActive": false,
    "firstName": "Gonzalez",
    "lastName": "Spence",
    "balance": "₹10,501.04"
  },
  {
    "_id": "5dbf0b6cf24edbfa1662df9a",
    "isActive": false,
    "firstName": "Oneal",
    "lastName": "Prince",
    "balance": "₹19,874.09"
  },
  {
    "_id": "5dbf0b6c98900a329ab71351",
    "isActive": false,
    "firstName": "Poole",
    "lastName": "Duran",
    "balance": "₹19,747.36"
  },
  ...
]
```

Write this API to return data from users accordingly.

### B. Get only one user!

Now, the data that we hide for each user should be exposed to the consumer. However, this time, instead of returning all user, we will allow the API caller to call a URL and get only _one_ User (resource).

Write a new API that follows [RESTful](https://restfulapi.net/resource-naming/) convention. This API should return a _single_ user object which matches `_id` param specify in the API endpoint.

**Note:** For this API, you do not need to hide any user information, since we return only 1 user, we need to expose as many details as possible!
