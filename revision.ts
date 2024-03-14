
class aNode<T>
{
    data: T;
    next: aNode<T> | null; // next is a pointer to the next node in the list or null if it is the last node in the list

    constructor(data: T)
    {
        this.data = data;
        this.next = null;
    }
}

class TreeNode<T>
{
    data:T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(data: T)
    {
        this.data = data;
        this.left = this.right = null;
    }

}

class LinkedList<T>
{
    head:aNode<T> | null;

    constructor()
    {
        this.head = null;
    }

    public addNode(data:T)
    {
        let newNode = new aNode(data);

        if(this.head === null)
        {
            this.head = newNode;
        }

        let current = this.head;
        while(current.next)
        {
            current = current.next;
        }
        current.next = newNode;
    }
}

//binary search
//mergesort,insertion sort

function binarySearch(list:number[],value:number, left:number,right:number): number | null // return value or null
{


    // if(left > right || !list)
    // {
    //     return null;
    // }

    // let middle = Math.floor((left+right)/2)

    // if(list[middle] === value)
    // {
    //     return middle;
    // }
    // else if(list[middle] > value)
    // {
    //     return binarySearch(list,value,left,middle-1);   
    // }
    // else
    // {
    //     return binarySearch(list,value,middle+1,right);
    // }


    while(left !== right)
    {
        let middle = Math.floor((left+right)/2)

        if(list[middle] === value)
        {
            return middle;
        }
        else if(list[middle] > value)
        {
            right = middle-1;
        }
        else
        {
            left = middle+1;
        }
    }

    return null;
}


// let list = [1,2,3,4,5,6,7,8,9,10,11,12]

// console.log(binarySearch(list,5,0,list.length))


function mergeSort(list:number[]) : number[]
{
    if(!list)
    {
        return [];
    }
    else if(list.length === 1)
    {
        return list;
    }

    //slice
    let left_elems = list.slice(0,list.length/2);
    let right_elems = list.slice(list.length/2,list.length);

    
    return merge(mergeSort(left_elems),mergeSort(right_elems));
}

function merge(left_arr:number[],right_arr:number[]):number[]
{
    let i=0;
    let j = 0;
    let result:number[] = [];

    while(i<left_arr.length && j<right_arr.length)
    {
        if(left_arr[i] <= right_arr[j])
        {
            result.push(left_arr[i]);
            i++;
        }
        else
        {
            result.push(right_arr[j]);
            j++;
        }
    }

    while (i < left_arr.length) {
        result.push(left_arr[i]);
        i++;
    }

    // Append remaining elements from right_arr
    while (j < right_arr.length) {
        result.push(right_arr[j]);
        j++;
    }

    return result;
}

let list = [3,4,1,4,7,3,2,6,8,3,1,7,8,6,5,2,9];

console.log(mergeSort(list));