// main.ts

// Explicitly typing string
let myName: string = "akshay"; // string → sequence of characters
console.log("myName:", myName);

// number type
let meaningOfLife: number; // number → integer or float
meaningOfLife = 42;
console.log("meaningOfLife:", meaningOfLife);

// boolean type
let isLoading: boolean; // boolean → true or false
isLoading = true;
console.log("isLoading:", isLoading);

// any type
let album: any; // any → can be anything (avoid if possible)
album = 98;
console.log("album:", album);

// function with mixed types
const sum = (a: number, b: string) => {
  return a + b; // result will be string due to b
};
console.log("sum(5, '5'):", sum(5, '5')); // Outputs: "55"

// Union types
let postId: string | number; // string | number → can be either
postId = "abc123";
console.log("postId:", postId);

let isActive: number | boolean; // number | boolean → can be either
isActive = false;
console.log("isActive:", isActive);

// Regular expression
let re: RegExp = /r\w+/; // RegExp → used for pattern matching
console.log("RegExp test:", re.test("regex"));

// ----------------------
// Additional TypeScript Types
// ----------------------

// null type
let nothing: null = null; // null → explicit null
console.log("nothing:", nothing);

// undefined type
let notDefined: undefined = undefined; // undefined → value not assigned
console.log("notDefined:", notDefined);

// array type
let names: string[] = ["Akshay", "Ravi"]; // string[] → array of strings
console.log("names:", names);

// tuple type
let user: [number, string] = [1, "Admin"]; // tuple → fixed length and types
console.log("user:", user);

// enum type
enum Direction { // enum → named constants
  Up,
  Down,
  Left,
  Right
}
console.log("Direction.Left:", Direction.Left);

// object type
let person: { name: string; age: number } = {
  name: "Akshay",
  age: 25,
}; // object → key-value pair
console.log("person:", person);

// literal type
let gender: "male" | "female"; // literal → only specific values allowed
gender = "male";
console.log("gender:", gender);

// intersection type
type Employee = { empId: number };
type Manager = { manages: string[] };
type TeamLead = Employee & Manager; // & means must satisfy both
let lead: TeamLead = { empId: 101, manages: ["Dev", "QA"] };
console.log("lead:", lead);

// function return type
function greet(name: string): string { // function → returning a string
  return `Hello, ${name}`;
}
console.log(greet("Akshay"));

// never type
function throwError(msg: string): never { // never → function never returns (throws error or infinite loop)
  throw new Error(msg);
}
// Uncomment to test error
// throwError("Something went wrong");

// type alias
type ID = string | number;
let userId: ID = 101; // type alias → reusable type definitions
console.log("userId:", userId);

// void type
function logMessage(msg: string): void { // void → no return value
  console.log("Log:", msg);
}
logMessage("This is a log");

// unknown type
let input: unknown; // unknown → similar to any, but safer (must narrow before use)
input = "Test";
if (typeof input === "string") {
  console.log("input is string:", input.toUpperCase());
}
