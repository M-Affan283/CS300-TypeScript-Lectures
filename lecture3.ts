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
*/