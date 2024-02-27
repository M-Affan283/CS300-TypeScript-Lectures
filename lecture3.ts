// ASYNCHRONOUS PROGRAMMING


/*
    1. Javascript execution enviroments
        Browser, Node.js

    2. Javascript is a single-threaded language
        - Javascript can only do one thing at a time
        - It can only execute one piece of code at a time
        - For example in the browser, it can only execute one event at a time. Only one page can be loaded at a time.
        - This single thread is also called main thread.


        - What if we have a long running task? e.g. Call to a remote API
        - During this call the relevant task is executed and the user is blocked from doing anything other interaction.
        - Also called a blocking task.
        - This is a problem because it makes the application unresponsive.


        One solution is multi threading but Javascript cannot support it. Besides multi threading itself has many problems.
        So, the solution is asynchronous programming.

        Javascript engine may be single threaded but the browser is multi threaded.

        Callback functions are used to solve this problem.
        These are functions that are passed as arguments to other functions and are called when the task is completed. 


        Function Call Stack
        
        Lets say we have 3 functions f() = let x=10; g() = let y=5; h() = let z=100;f();g();g();

        If we call h() the call stack will look like this:

        ----------------
        x=10             f() -> f() ends since theres only one line of code. So it is popped. Then next function in h() is g() which is added to the stack. g() is popped and then f() is added again. Then it is popped and finally h() is popped
        ----------------
        z=100            h()
        ----------------

        Suppose in the browser, h() calls a remote API. We dont want this to run in the main thread.

        h() will be put on the call stack while a callback function is called. This callback function will be called when the remote API is called.
        Once the remote API is done processing and returns the result, the result will be put on the callback queue.
        This result will be places onto the call stack when the call stack is empty.

        This is called the event loop. It is a loop that checks if the call stack is empty. If it is, it will take the first function from the callback queue and put it onto the call stack.
      
*/

const longRunningTask = (msg:string) => { //Placing this on the webpage will make the webpage unresponsive
    
    let counter: number = 100000000;

    while(counter>0)
    {
        counter--;
    }

    console.log(msg);
}

// longRunningTask("Hello World");


function f(msg:string) {
    
    console.log("f(): Before call to setTimeout: " + msg);

    //setTimeout is a function that takes 2 parameters. The first is a callback function and the second is the time in milliseconds.
    // The callback function is called after the time has passed.
    
    //This function will run in background and f will continue executing the next line of code.
    setTimeout(()=>{ //built in function. We are not declaring it. We are just passing a function to it.
        console.log("f(): 5 seconds later Inside the callback function"); //callback function
    },5000);

    console.log("f(): After call to setTimeout: " + msg);

}

// f("Hello World");

/*

OUTPUT:
f(): Before call to setTimeout: Hello World
f(): After call to setTimeout: Hello World
f(): 5 seconds later Inside the callback function

WHAT HAPPENED?? In f() even though we called the callback function before the 3rd console.log it was printed the last. 
This is because the callback function is put onto the callback queue and is only put onto the call stack when the call stack is empty.
Even if set the time to 0 in the setTimeout function, the callback function will still be put onto the callback queue and will only be put onto the call stack when the call stack is empty.
And the call stack will be empty when the main function is done executing which in this case is f().
Here is order of execution:
1. f() called and put onto the call stack
2. f(): Before call to setTimeout: Hello World is printed
3. setTimeout is called and put onto the call stack
4. f(): After call to setTimeout: Hello World is printed
5. f() is popped from the call stack
6. The callback function is put onto the callback queue
7. The call stack is empty
8. The callback function is put onto the call stack and executed

*/

//Lets look at the following example for a better understanding:

console.log("Before call to f()");

f("Good Morning");

console.log("After call to f()");

/*
OUTPUT:
Before call to f()
f(): Before call to setTimeout: Good Morning
f(): After call to setTimeout: Good Morning
After call to f()
f(): 5 seconds later Inside the callback function
*/

//As you can see even f() has finished execution despite setTimeout being inside of it, the callback function is still executed after the main function is done executing.


function g(msg:string) {
    
    console.log("g(): Before call to setTimeout: " + msg);

    //setTimeout is a function that takes 2 parameters. The first is a callback function and the second is the time in milliseconds.
    // The callback function is called after the time has passed.
    
    //This function will run in background and f will continue executing the next line of code.
    setTimeout(()=>{ //built in function. We are not declaring it. We are just passing a function to it.
        console.log("g(): 1 second later: Inside the callback function"); //callback function
    },1000);

    console.log("g(): After call to setTimeout: " + msg);

}

g("Good Night");

/*

OUTPUT OF ENTIRE CODE:
Before call to f()
f(): Before call to setTimeout: Good Morning
f(): After call to setTimeout: Good Morning 
After call to f()
g(): Before call to setTimeout: Good Night  
g(): After call to setTimeout: Good Night   
g(): 1 second later: Inside the callback function
f(): 5 seconds later Inside the callback function

*/


// longRunningTask("Hello World");
//if we were to uncomment this and run the entire code. The webpage will be unresponsive until it completes. 
//This is because the longRunningTask function is a blocking function. It will block the main thread from doing anything else until it is done executing.
//Even if settimeout in both f and g were 0 they would finish execution but result will be placed in the callback queue 
//and will only be put onto the call stack when the call stack is empty. Since the longRunningTask is still executing in the call stack the callback functions will wait in the queue


// THIS IS THE BASIC IDEA OF ASYNCHRONOUS PROGRAMMING IN JAVASCRIPT