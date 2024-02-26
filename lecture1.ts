/*TypeScript Module 
tsc is the compiler for TypeScript


To compile a TypeScript file, run the following command:
tsc <filename.ts>
This will generate a JavaScript file with the same name as the TypeScript file.

To run the JavaScript file, run the following command:
node <filename.js>

To execute the TypeScript file directly, run the following command:
ts-node <filename.ts>  --> for this you need to install ts-node package. This will not generate a .js file. It will directly run the .ts file

TypeScript vs JavaScript
- TypeScript is a statically typed language
- TypeScript is a superset of JavaScript
- TypeScript is compiled to JavaScript

1. TypeScript is a statically typed language
- TypeScript is a statically typed language, which means that the type of a variable is known at compile time.
 Like C++, Java, and C#, TypeScript also uses static typing.

 2. Dynamic typing
- JavaScript is a dynamically typed language, which means that the type of a variable is known at runtime.
Like Python, Ruby, and PHP, JavaScript also uses dynamic typing.


You can also edit the compiler options in the tsconfig.json file.
To generate a tsconfig.json file, run the following command:
tsc --init

*/

// Variables declaration
//semicolon is optional
let n: number = 10;
let address: string = "Lahore";

//To print
console.log("Address: " + address);

/*Functions
syntax: function <function_name>(<parameter_name>: <type>, <parameter_name>: <type>, ...): <return_type> {
  // code
}
return_type is optional but preferred. If function does not return anything, then return_type is void
*/

//Data types: number, string, boolean, null, undefined, any, void, array, tuple, enum, object

function hello(str:string):void
{
    console.log("Hello, " + str);
}

hello("Muhammad Affan");

//const is used to declare a constant variable
//const variables cannot be reassigned
const pi:number = 3.14;

// pi = 40; //error

//const variables can be used as arrow functions

const hello3 = (str:string):void =>
{
    console.log("Hello, " + str);
}

hello3("Muhammad Affan");

/*Arrow functions
Arrow functions are a more concise way of writing a function in JavaScript.
Arrow functions do not have their own this. They are not well suited for defining object methods.
Arrow functions are not hoisted. They must be defined before they are used. Hoisted means that you can use the function before it is declared.

'this' keyword in JavaScript refers to the object it belongs to. Meaning 'this' has different values depending on where it is used:
- In a method, this refers to the owner object.
- Alone, this refers to the global object.
- In a function, this refers to the global object.

Example:
var x = () => this;
console.log(x()); // will return the global object

var x = function() {
  return this;
};

console.log(x()); // will return the global object

var person = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

console.log(person.fullName()); // will return John Doe

*/

const add = (n:number, m:number):number =>
{
    return n + m;
}

console.log("Addition: " + add(10, 20));

//let is also used to declare a variable
//let variables can be reassigned

let x:number = 10;
let y:number = 20;
y=x;

//let can also be used as arrow functions

// You can see we have not made the body of the function. This is called as function signature. We have simply declared the function like in C++.
let addFun : (x:number, y:number) => number;

//now we can define the function later on
// addFun = (x:number, y:number) => {
//     return x+y;
// }

// or we can do this:
addFun = add;

console.log("Addition with addFun: " + addFun(10, 20));

//or we can do this:
// addFun = (x:number, y:number) => x+y;

//TypeScript can also automatically infer the type of the variable
let addFun2 = add;

console.log("Addition with addFun2: " + addFun2(10, 20));

//Passing functions as parameters

function newFunc(g:((n:number, m:number) => number), num1:number,num2:number) : void //f is being passed a function g as a paramter. g is a function which takes two numbers and returns a number.
{
    console.log("g(): ", g(num1, num2));
}

newFunc(add, 5, 6);


//arrays are declared using []
//arrays can be of any type
//arrays are 0-indexed and dynamic so they can grow and shrink
//loops are used to iterate through arrays

const map = (g:(n:number)=>number, data:number[]) : number[] => //function g will take a number and return a modified number.
{
    let result:number[] = []
    for(let i = 0; i < data.length; i++) //similar to C++
    {
        result[i] = g(data[i]); // can even use result.push(g(data[i]));
    }
    return result;
}

function square(n:number):number
{
    return n*n;
}

let arr:number[] = [1,2,3,4,5];
console.log("Original array: ", arr);
let arr2 = map(square, arr);
console.log("Modified array: ", arr2);

//we can even pass an arrow function as a parameter

let arr3 = map((n:number):number => {return n*n*n}, arr); //notice we didnt specify type of arr3 as it is automatically inferred by TypeScript

console.log("Modified array with arrow function: ", arr3);

//U can use loops to iterate through arrays
for(let i = 0; i<arr.length; i++)
{
    console.log("arr[", i, "]: ", arr[i]);
}

//or we can use for..of loop
// for(let i of arr)
// {
//     console.log("arr: ", i);
// }

//or we can use forEach loop
// arr.forEach((i) => {
//     console.log("arr: ", i);
// });

//or for..in loop
// for(let i in arr)
// {
//     console.log("arr[", i, "]: ", arr[i]);
// }

//or we can use map function
// arr.map((i) => {
//     console.log("arr: ", i);
// });

//while loops are also used to iterate through arrays
// let i = 0;
// while(i<arr.length)
// {
//     console.log("arr[", i, "]: ", arr[i]);
//     i++;
// }

// Generic function
//Generics are used to create reusable components
//They are like function templates in C++

function generic<T>(x:T):void 
{
    console.log("Generic(): " +"Value: " +x + " Type: " + typeof(x));
}

generic(10); //TypeScript will automatically infer the type of x or we can specify the type as well like generic<number>(10);
generic("Hello"); //generic<string>("Hello");

//Union types
//Union types are used to specify a value that can be of multiple types

let u1 : number | string;
u1 = 5;
u1 = "abc";

//However we must know what type the variable is when using it in different places

function f1(x:number)
{
    console.log("f1(): ", x);
}

// f1(u1); //error because u1 is of type number | string and f1() expects a number however u1 is "abc" right now

u1 = 20;
f1(u1); //no error