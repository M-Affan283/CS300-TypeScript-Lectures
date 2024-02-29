/* CODE IN // can be uncommented to see the output of the code in the terminal */

/*  PROMISES
    Promises are used to handle asynchronous operations in JavaScript. 
    They are easy to manage when dealing with multiple asynchronous operations where callbacks
    can create callback hell leading to unmanageable code.

    For example if theres a function download that downloads files. This function returns a promise.
    Which means that "I cannot immediately give you the value you want, but I can give you a promise to provide the value at some point in the future."
    We use callbacks to handle the promise.

    e.g. 
    promise = download('file.txt');
    promise.then((v)=>{some function to handle the value v}); where v is the value of the file.txt that is returned in the future as stated by promise.
    All code after the .then() will keep running and the promise will be resolved in the future.
    Another is .catch() which is used to handle errors if the promise returns an error.

    in the previous lecture we looked at the setTimeout function which essentially returns a promise.

    A promise contains an executor function which takes two parameters resolve and reject which are functions.
    resolve is used to return a value and reject is used to return an error.
*/


//Lets make a promise object

// let p1 = new Promise((resolve, reject) => {

//     console.log("Inside the executor function");

//     //As soon as executor function is called, the promise is in pending state.
//     //When its task is completed we need to notify the promise object that the task is completed by using resolve or reject.

//     resolve("Promised task is completed successfully");

//     //if task fails we use reject
//     // reject("Promised task failed");

    
// });

/*
    .then() takes a callback function as a parameter which is called when the promise is resolved.
    v contains the value that is returned by the resolve function.
    In case we have a reject function, we can use .catch() to handle the error.
    .catch() can be chained with .then() to handle errors.
    We can also provide a second parameter to .then() which is a function that handles errors instead of using .catch()
*/

// p1.then(
//     (v)=>{console.log(v)},
//     (e)=>{console.log(e)
//     });
    
/* 
    OR
    p1.then((v)=>{
        console.log(v);
    }).catch((e)=>{
        console.log(e);
    });

*/

// console.log("After the promise is resolved");

/* Output:

    Inside the executor function
    After the promise is resolved
    Promised task is completed successfully

    Why??
    This is because the promise is resolved immediately after the resolve function is called.
    And the .then() function makes use of callback functions which in the last lecture we learned are executed after the main code is executed
    because they are placed in the message queue.

    They have lower priority than the main code.

*/

let p2 = new Promise((resolve, reject) => {

    console.log("Inside the executor function");
    setTimeout(()=>{
        console.log("setTimeout is done");
    }, 3000);
    console.log("End of executor function");

    reject("Promised task failed");
});

p2.then((v)=>{
    console.log(v);
}).catch((e)=>{
    console.log(e);
});


console.log("After the promise is resolved");

/* Output:
    
        Inside the executor function
        End of executor function
        After the promise is resolved
        Promised task failed
        setTimeout is done
    
        e parameter of .catch() is called because the promise is rejected.
        it is a callback function and so is setTimeout. They will be places in the message queue and executed after the main code is executed.
    
*/