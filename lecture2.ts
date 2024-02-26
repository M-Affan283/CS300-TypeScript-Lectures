//Functors, Applicatives, Monads in TypeScript

//Functors
//Functors are objects that have a map method. Arrays in JavaScript are functors because they have a map method. Promises, Streams, and Trees are also functors because they all have a map method.

function fmap(f:(n:number)=>number, data:number[]): number[] //fmap is a functor that takes a function and an array and applies the function to each element of the array
{
    let output:number[] = [];
    for(let i = 0; i<data.length; i++)
        output.push(f(data[i])); //for single line code theres no need to add curly braces

    return output;
}

let values:number[] = [4,7,10]
let g = (n:number)=>n*3;
let arr_1 = fmap(g, values);

console.log("arr_1: ", ...arr_1); //... is the spread operator, it spreads the array into individual elements and prints them


function fmap2<T1,T2>(f:(n:T1)=>T2,data:T1[]):T2[]
{
    let output:T2[] = [];
    for(let i=0; i<data.length; i++)
    {
        output.push(f(data[i]));
    }

    return output;
}

let values2:number[] = [4,7,10];
let g2 = (n:number):number => n*3;
let arr_2 = fmap2(g2, values2);
console.log("arr_2 using generic fmap2: ", ...arr_2);

let values3:string[] = ["A", "B", "C"];
let arr_3 = fmap2(
                    (x:string):string => {return x+x},
                    values3
                );
console.log("arr_3 using generic fmap2: ", ...arr_3);


//Applicatives
//Applicatives are functors that have an ap method. The ap method applies a function in the applicative functor to a value in another applicative functor.
//Wrapped function on a wrapped value

function apply1<T1,T2>(f:((n:T1)=>T2)[], data:T1[]):T2[] //apply1 is an applicative that takes an array of functions and an array of data and applies each function to each element of the data
{
    let output:T2[] = [];
    for(let j = 0; j<f.length; j++)
    {
        for(let i=0; i<data.length; i++)
        {
            output.push(f[j](data[i])); //can even call fmap like this: fmap(f[j], data)
        }

    }

    return output;
}

let values4:number[] = [4,7,9];
let g4 = (n:number):number => {return n*3};
let arr_4 = apply1([g4,g4], values4);
console.log("arr_4 using apply1: ", ...arr_4);

//Monads
//Monads are functors that have a flatMap method. The flatMap method applies a function to a value in a monad and flattens the resulting nested structure.

function monad<T1,T2>(f:(n:T1)=> [T2],data:T1[]):T2[] //here f is a function that takes a value of type T1 and returns an array of type T2
{
    let output:T2[] = [];
    for(let i=0; i<data.length; i++)
    {
        output.push((f(data[i]))[0]); //f(data[i]) returns an array of type T2, so we access the first element of the array
    }

    return output;
}

let values5:number[] = [4,7,10];
let g5 = (n:number):[number] => {return [n*3]};
let arr_5 = monad(g5, values5);
console.log("arr_5 using monad: ", ...arr_5);

let g6 = (n:number):[number] => {return [n*n]}
let values6 = monad(g6,monad(g5,values5));
console.log("values6 using monad: ", ...values6);

//We can use them with classes and objects as well
//All members in classes are public by default
class MyList<T1>
{
    private data:T1[] = [];

    constructor(arr:T1[])
    {
        this.data = this.data.concat(arr); //this keyword is necessary to access the members of the class
    }

    //Now to implement functor, applicative and monad
    //with classes we use methods instead of functions

    //FUNCTOR
    fmap2<T2>(f:(n:T1)=>T2):MyList<T2> //fmap2 is a functor that takes a function and applies it to each element of the array and returns a new object of type MyList
    {
        let output:T2[] = [];
        for(let i=0; i<this.data.length; i++)
        {
            output.push(f(this.data[i]));
        }

        return new MyList(output); //new keyword is used to create a new object of the class
    }

    //APPLICATIVE
    apply1<T2>(f:((n:T1)=>T2)[]):MyList<T2> //apply1 is an applicative that takes an array of functions and an array of data and applies each function to each element of the data
    {
        let output:T2[] = [];
        for(let j = 0; j<f.length; j++)
        {
            for(let i=0; i<this.data.length; i++)
            {
                output.push(f[j](this.data[i])); //can even call fmap like this: fmap(f[j], data)
            }

        }

        return new MyList(output);
    }

    //MONAD
    monad<T2>(f:(n:T1)=> [T2]):MyList<T2> //here f is a function that takes a value of type T1 and returns an array of type T2
    {
        let output:T2[] = [];
        for(let i=0; i<this.data.length; i++)
        {
            output.push((f(this.data[i]))[0]); //f(data[i]) returns an array of type T2, so we access the first element of the array
        }

        return new MyList(output);
    }

}

let list1:MyList<number> = new MyList([1,2,3,4,5]);
let h = (n:number):number => {return n*n}; 
let list2 = list1.fmap2(h);
console.log("list2 using class: ", list2);
console.log("list2 using chaining functors: ", list1.fmap2(h).fmap2(h).fmap2(h));