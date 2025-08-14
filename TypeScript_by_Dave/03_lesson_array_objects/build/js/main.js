"use strict";
// ---------------------
// Arrays
// ---------------------
Object.defineProperty(exports, "__esModule", { value: true });
let stringArr = ["akshay", "dattataray", "jadhav"]; // inferred: string[]
let guitars = ["a", "b", 90]; // inferred: (string | number)[]
let mixeData = ["wse", 91811, false]; // inferred: (string | number | boolean)[]
stringArr[0] = "aki"; // ✅ OK - string assignment
// stringArr.push(45); // ❌ Error - 45 is a number, stringArr expects only strings
guitars.unshift("akshay"); // ✅ OK - "akshay" is string, allowed in (string | number)[]
// guitars.unshift(true); // ❌ Error - boolean not allowed in (string | number)[]
stringArr = guitars; // ❌ Error - Type '(string | number)[]' is not assignable to 'string[]'
guitars = stringArr; // ✅ OK - string[] is a subset of (string | number)[]
guitars = mixeData; // ❌ Error - mixeData includes boolean, which guitars doesn’t accept
mixeData = guitars; // ✅ OK - all guitars elements are string|number, which is assignable to (string | number | boolean)[]
let test = []; // inferred as `any[]` because no type or initial values
let bands = []; // explicitly string array
// bands.push(true); // ❌ Error - boolean not assignable to string[]
bands.push("akshay"); // ✅ OK
// ---------------------
// Tuples
// ---------------------
let myTuple = ["akshay", 90]; // ✅ OK - fixed structure: [string, number]
myTuple[1] = 2; // ✅ OK - still number
// myTuple[0] = 123; // ❌ Error - number not assignable to string
// ---------------------
// Objects
// ---------------------
let myObj; // object type - can be any non-primitive (array, object, etc.)
myObj = []; // ✅ OK - arrays are objects in JS
console.log(typeof myObj); // 'object'
// Custom object
const exampleObj = {
    prop1: "akki",
    prop2: true,
};
let evh = {
    name: "akshay",
    active: false,
    albums: [111, 2222, 3333, 444444, "akshay", true], // ✅ all allowed types
};
//# sourceMappingURL=main.js.map