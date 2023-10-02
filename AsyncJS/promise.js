/* 
The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

A Promise is in one of these states:

- pending: initial state, neither fulfilled nor rejected.
- fulfilled: meaning that the operation was completed successfully.
- rejected: meaning that the operation failed.

Before Native Promise was added in JS, we used to use BlueBird and Q libraries.
*/

const promise1 = new Promise(function (resolve, reject) {
  //Do an async task
  //DB calls, network calls
  setTimeout(function () {
    console.log("Async 1  ");
    resolve(); //connects the .then with resolve
  });
}, 1000);

// .then is used to consume the promise and we need to connect resolve with .then by resolve()

promise1.then(function () {
  console.log("Promise1 consumed");
});

new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log("Async 2");
    resolve();
  }, 1000);
}).then(function () {
  console.log("Promise2 resolved");
});

const promise3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log("Async 3");
    resolve({ username: "Chai", email: "chai@gmail.com" });
  }, 1000);
});

promise3.then(function (user) {
  console.log(user);
});

const promise4 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log("Async 4");
    let err = false;
    if (err) {
      reject("Something went wrong!");
    } else {
      resolve({ username: "Tea", email: "Tea@gmail.com" });
    }
  }, 1000);
});

promise4
  .then(function (user) {
    console.log(user);
    return user.username;
  })
  .then((username) => {
    console.log(`Name : ${username}`);

    // This is called chaining. The current .then will recieve the data from the previous .then
  })
  .catch(function (err) {
    console.log(err);
  })
  .finally(() => console.log("The promise is finally resolved or rejected."));

const promise5 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log("Async 5");
    let err = true;
    if (err) {
      reject("JS went wrong!");
    } else {
      resolve({ username: "JavaScript", email: "javascript@gmail.com" });
    }
  }, 1000);
});

// Promise isn't required to be handled only bay .then() and .catch(), it can also be handled by asyn await.

async function consumePromise5() {
  try {
    const user = await promise5;
    console.log(user);
  } catch (err) {
    //async await don't handle error directly thus we need to wrap everything in a try-catch block.
    console.log(err);
  }
}
consumePromise5();

// Making a network using async/await

async function getAllUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    const data = await res.json(); // It takes time, so use await else code won't work
    console.log(data);
  } catch (err) {
    console.log("E : ", err);
  }
}
// getAllUsers();

// Doing it using .then()/.catch()

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

// The global fetch() method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available. Refer to "fetch() in JS by Code & Chai"
