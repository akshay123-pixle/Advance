"use strict";
// main.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Explicitly typing string
let myName = "akshay"; // string → sequence of characters
console.log("myName:", myName);
// number type
let meaningOfLife; // number → integer or float
meaningOfLife = 42;
console.log("meaningOfLife:", meaningOfLife);
// boolean type
let isLoading; // boolean → true or false
isLoading = true;
console.log("isLoading:", isLoading);
// any type
let album; // any → can be anything (avoid if possible)
album = 98;
console.log("album:", album);
// function with mixed types
const sum = (a, b) => {
    return a + b; // result will be string due to b
};
console.log("sum(5, '5'):", sum(5, '5')); // Outputs: "55"
// Union types
let postId; // string | number → can be either
postId = "abc123";
console.log("postId:", postId);
let isActive; // number | boolean → can be either
isActive = false;
console.log("isActive:", isActive);
// Regular expression
let re = /r\w+/; // RegExp → used for pattern matching
console.log("RegExp test:", re.test("regex"));
// ----------------------
// Additional TypeScript Types
// ----------------------
// null type
let nothing = null; // null → explicit null
console.log("nothing:", nothing);
// undefined type
let notDefined = undefined; // undefined → value not assigned
console.log("notDefined:", notDefined);
// array type
let names = ["Akshay", "Ravi"]; // string[] → array of strings
console.log("names:", names);
// tuple type
let user = [1, "Admin"]; // tuple → fixed length and types
console.log("user:", user);
// enum type
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
console.log("Direction.Left:", Direction.Left);
// object type
let person = {
    name: "Akshay",
    age: 25,
}; // object → key-value pair
console.log("person:", person);
// literal type
let gender; // literal → only specific values allowed
gender = "male";
console.log("gender:", gender);
let lead = { empId: 101, manages: ["Dev", "QA"] };
console.log("lead:", lead);
// function return type
function greet(name) {
    return `Hello, ${name}`;
}
console.log(greet("Akshay"));
// never type
function throwError(msg) {
    throw new Error(msg);
}
let userId = 101; // type alias → reusable type definitions
console.log("userId:", userId);
// void type
function logMessage(msg) {
    console.log("Log:", msg);
}
logMessage("This is a log");
// unknown type
let input; // unknown → similar to any, but safer (must narrow before use)
input = "Test";
if (typeof input === "string") {
    console.log("input is string:", input.toUpperCase());
}
//# sourceMappingURL=main.js.map