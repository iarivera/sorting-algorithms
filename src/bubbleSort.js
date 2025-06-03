import { data } from './data.js'

function bubbleSort(array) {
    const arrayLength = array.length;
    let isSwapped;

    for (let i = 0; i < arrayLength; i++) {
        isSwapped = false;

        for (let j = 0; j < arrayLength - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                isSwapped = true;
            }
        }

        // If no two elements were swapped in the inner loop, array is sorted
        if (!isSwapped) 
            break;
    }

    return array;
}

let arr = data

// Test the function
console.log("Array:")
console.log(arr)
bubbleSort(arr);
console.log("Sorted Array:");
console.log(arr);