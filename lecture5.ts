/* PROMISES WITH FILE HANDLING */
//to make use of the file system module, we need to import it
import fs from 'fs';
import { promisify } from 'util';

/*reading file synchronously
let file_content = fs.readFileSync('lecture5.txt'); //Sync is used to read file synchronously
console.log("File data: " + String(file_content));
*/

/*reading file asynchronously

Use fs.readFile() method to read the file asynchronously. This method reads the file completely and then calls the callback function with the file data.
The method takes three parameters:
file_path: It is the path of the file to be read.
encoding: It is the encoding of the file. It is optional and the default value is null.
callback_function: It is the callback function that is called after the file is read. It takes two parameters:
error: It is the error object if an error occurs while reading the file.
data: It is the data of the file.

fs.readFile returns a promise, so we can use .then() and .catch() to handle the success and failure of the promise.

*/

console.log("ASYNC FILE READING VIA PROMISE SECTION");

// fs.readFile('lecture5.txt', (err,fileData)=>
// {
//     if(err)
//     {
//         console.log("Error in reading file: " + err);
//     }
//     else
//     {
//         console.log("File data: " + fileData);
//     }
// })

// reading file asynchronously using promises
// let myReadFile = (file_name: string) => {
//     let p = new Promise((resolve, reject) =>
//             {
//                 fs.readFile(file_name, (err, fileData) => {
//                     err ? reject(err) : resolve(fileData); //shorthand if-else
//                 })
//             })

//     return p;
// }

// let file_name = 'lecture5.txt';
// let prom = myReadFile(file_name);

// prom.then((fileData) => {console.log("File data: " + fileData);})
//     .catch((err) => {console.log("Error in reading file: " + err);})
//     .finally(() => {console.log("File reading process completed")});

// console.log("End of file");

//<--------------- END OF SECTION ----------------->");


/*
Output:
End of file
File data: Hello, this file is for lecture5.txt.
Name: Affan
Course: CS-300
Module: TypeScript
heehee
File reading process completed

*/

//PROMISIFY: It is a utility function that converts a function following the error-first callback style into a function that returns a promise.
//Accepts any function whose last parameter is a callback function and converts it into a function that returns a promise.
console.log("PROMISIFY SECTION");
const promisedReadFile = promisify(fs.readFile); //this way we don't have to write the promise function ourselves ie the myReadFile function above
// let prom2 = promisedReadFile('lecture5.txt')

// prom2.then((fileData) => {console.log("File data: " + fileData);})
//      .catch((err) => {console.log("Error in reading file: " + err);})
//      .finally(() => {console.log("File reading process completed")});

// console.log("End of file");

//promisify write file

let promisedWriteFile = promisify(fs.writeFile); //remember that fs.writefile will truncate the file if it already exists and overwrite it with the new data
// let prom3 = promisedWriteFile('lecture5.txt', 'Writing to file using promises \n yay!');
// prom3.then(() => {console.log("File written successfully")})
//      .catch((err) => {console.log("Error in writing file: " + err);})
//      .finally(() => {console.log("File writing process completed")});

// prom3.then(() => {console.log("Then2"); return 2;}).then((val) => {console.log("Val: " + val);});


// console.log("End of file write");
     
//      let prom4 = promisedReadFile('lecture5.txt')
//      prom4.then((fileData) => {console.log("File data: " + fileData);})
//      .catch((err) => {console.log("Error in reading file: " + err);})
//      .finally(() => {console.log("File reading process completed")});
     
// console.log("End of file read");

// "<--------------- END OF SECTION ----------------->"

//to append data use fs.appendFile

/* PROMISE CHAINING */

console.log("PROMISE CHAINING SECTION")

let p4 = new Promise<number[]>((resolve,reject) => {
    resolve([1,5,10]);
})

// p4.then((data)=> {console.log("Then1: " + data);})
// .then((data)=> {console.log("Then2: " + data);})

/*
Output:
Then1: 1,5,10
Then2: undefined

undefined because the first then doesn't return anything for the second then to use
*/

// p4.then((data)=> {
//     console.log("Then1: " + data);
//     return 500;
//     })
// .then((data)=> {console.log("Then2: " + data);})

//OR

// p4.then((data)=> {
//     console.log("Then1: " + data);
//     return Promise.resolve(500);
//     })
// .then((data)=> {console.log("Then2: " + data);}) //if we were to return Promise.reject(500) then the catch block would be executed
// .catch((err) => {console.log("Error: " + err);})

/*
    The first then returns a promise, so the second then will wait for the first then to resolve before executing

*/

// p4.then((data:number[])=>{
//     console.log("Then1: ", data);
//     let updatedData = data.map((value:number)=>value*2);
//     return updatedData;
// })
// .then((data:number[])=> console.log("Then2: ", data));

//"<--------------- END OF SECTION ----------------->"


/*USE OF ASYNC AWAIT 

Async functions are a combination of promises and generators, and basically, they are a higher level abstraction over promises.
Await is used to wait for a promise to resolve or reject. It can only be used inside an async function. They eliminate the use of .then() and .catch(). But they also make the code look synchronous. So execution will wait for the promise to resolve before moving on to the next line of code.

*/

console.log("ASYNC AWAIT SECTION\n");


//async function will always return a promise
async function myAsyncFunction() {
    console.log("Inside async function");
    //lets see what we do if want the code to no execute until the promise is resolved below
    let p = await promisedReadFile('lecture5.txt'); //await will wait for the promise to resolve before moving on to the next line of code. So now p will contain the file data, not a promise
    console.log("File data: \n" + String(p));
    return 5;
    
}


let x = myAsyncFunction();
console.log(x); //Promise {pending} ??? because the function is not yet resolved

//this means that the await inside myAsyncFunction is waiting for the promise to resolve before moving on to the next line of code in the function but the code outside the function will run as normal
//if we want to wait for the promise to resolve before moving on to the next line of code outside the function, we can use .then() and .catch() as we did before

x.then((v)=>console.log("Promised returned by myAsyncFunction: " + v));

console.log("After myAsyncFunction");