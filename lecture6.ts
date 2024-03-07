/*
FOR THIS LECTURE WE NEED AXIOS AND JSON-SERVER

    json-server is used to create a server with a json file as a database
    We will use animal.json
    To run: json-server --watch animal.json --> will start localhost:3000/animals

    We are going to download animals using axios and async/await

*/

import axios from 'axios';

/* animals.json
{
    "animals":[
    {
      "name": "Meowsy",
      "species" : "cat",
      "foods": {
        "likes": ["tuna", "catnip"],
        "dislikes": ["zucchini"]
      }
    },
    {
      "name": "Barky",
      "species" : "dog",
      "foods": {
        "likes": ["bones", "carrots"],
        "dislikes": ["tuna"]
      }
    },
    {
      "name": "Purrpaws",
      "species" : "cat",
      "foods": {
        "likes": ["mice"],
        "dislikes": ["cookies", "zucchini"]
      }
    }
  ]
  }

  JSON works in  a similar way to objects, but it is a string. We can convert it to an object using JSON.parse() and we can convert an object to a string using JSON.stringify()
  So by doing AllAnimals(res.data) we are converting the json to an object.

*/

//lets add all the animals in the json file and their likes and dislikes for food
class Food
{
    likes:string[];
    dislikes:string[];
    constructor(likes:string[], dislikes:string[])
    {
        this.likes = [...likes];
        this.dislikes = [...dislikes];
    }
}

class Animal
{
    name:string;
    species:string;
    food:Food;
    constructor(name:string, species:string, food:Food)
    {
        this.name = name;
        this.species = species;
        this.food = food;
    }
}

class AllAnimals
{
    animals:Animal[];
    constructor(animals?:Animal[]) //animals can be supplied or not
    {
        this.animals = animals?[...animals]:[]; //this means that if animals is not undefined, then copy the array, otherwise create an empty array
    }

}


function downloadUsingPromise(url:string) 
{
    axios.get(url) //axios.get returns a promise
        .then((res) => 
        {
            // console.log(res.data);
            let all:AllAnimals = new AllAnimals(JSON.parse(JSON.stringify(res.data))) //we are creating a new object of AllAnimals and passing the data from the server. JSON.parse(JSON.stringify()) is used to deep copy the object. We are directly passing the data but the constructor will automatically create the array of animals
            printAnimal(all);
        })
        .catch((error) => console.log(error))

    console.log("END OF FUNCTION");
}

function printAnimal(allanimals:AllAnimals)
{
    if(allanimals.animals.length > 0)
    {
        for(let animal of allanimals.animals)
        {
            console.log(animal)
        }
    }
    else
    {
        console.log("No animals found");
    }
}

//when using async await we use try catch block to handle errors

async function downloadUsingAsyncAwait(url:string) //async keyword is used to make a function asynchronous
{
    //if we dont use await, then res will be a promise, and we will have to use .then() to get the data
    //if we use await, then res will be the resolved value of the promise
    try
    {
        let res = await axios.get(url) //now we can use await to pause the execution of the function until the promise is resolved
        let data = res.data;
        let all:AllAnimals = new AllAnimals(JSON.parse(JSON.stringify(data)))
        printAnimal(all);
    }
    catch(error)
    {
        console.log(error);
    }
    finally
    {
        console.log("FINALLY BLOCK");
        console.log("END OF FUNCTION");
    }
}

//how to handle multiple promises ie if ther are resolved then do something
async function manyPromises(urls:string[])
{
    try
    {
        //we make use of a built in function called Promise.all(<list of promises>)
        //it takes an array of promises and returns a single promise. If any of the promises is rejected, then the returned promise is rejected
        //if all promises are resolved, then the returned promise is resolved
        //lets say we want to run axios.get on all urls
        const download = (url:string) => axios.get(url);
        //same as let promises = urls.map((url:string) => axios.get(url))
        let promises = urls.map(download); //map function of array is used to apply a function to all elements of an array
        //promises will be an array of promises
        
        /*
            we can map .then and .catch to the promises
            promises.map((promise) => promise.then((res) => console.log(res.data)).catch((error) => console.log(error)))
        */

        let final_promise_response_list = await Promise.all(promises); //now since we await the promise, the final_promise_response_list will be an array of resolved values of the promises
        let final_promise_settled_list = await Promise.allSettled(promises);
        
        
        console.log("PROMISE.ALL()")
        final_promise_response_list.forEach((res) => {

            console.log("Status: ", res.status) //res.status is the status of the response and is built in
            console.log("Status Text: ", res.statusText) //res.statusText is the status text of the response and is built in
            // console.log("Data: ", res.data)
        });

        console.log("\nPROMISE.ALLSETTLED()")
        final_promise_settled_list.forEach((res) => {
            console.log("Status: ", res.status) //res.status is the status of the response and is built in
        });
    }
    catch(error)
    {
        console.log("ERROR: ",error);
    }

    /*  there is another function called Promise.allSettled() which returns a promise that resolves after all of the 
        given promises have either resolved or rejected, with an array of objects that each describes the outcome of each promise.
        This is useful if you want to know the outcome of all promises, regardless of whether they were resolved or rejected. 
        Its result does not contain status text, but it contains status
    */


}

let url:string = 'http://localhost:3000/animals';

// downloadUsingPromise(url);

// downloadUsingAsyncAwait(url);

let urls:string[] = [
    "http://www.lums.edu.pk",
    "http://www.github.com",
    "http://www.google.com",
];

//what axios.get is doing for each url is that for example axios.get(google.com) is sending an empty get request to google.com and google.com is sending a response. We are not doing anything with the response, we are just printing the status and status text of the response
//the data returned would be html of the page
manyPromises(urls);

console.log("END OF FILE");