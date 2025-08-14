// Type aliases for union types
type stringOrNumber = string | number; 
// custom type using a Type Alias.
// "stringOrNumber" is a label (alias) for the union of string or number.

type stringOrNumberArray = (string | number)[];
// array where each element can be a string or number

// Interface for object-like structure
interface Guitarist {
  name?: string,         // optional property (can be undefined)
  active: boolean,
  albums: stringOrNumber // using our custom alias here
}

// Another type alias
type userId = stringOrNumber;

// ✅ Using type for tuple
type point = [number, number]; // fixed-length array with types in order

// ❌ INVALID with interface
// interface stringOrNumber = string | number; // ❌ Error: interface can't be a union
// interface point = [number, number];         // ❌ Error: interface only describes objects

// Literal Types
let myName: "akki"; // myName can ONLY be "akki"
myName = "akki"; // ✅ OK
// myName = "AKKI"; // ❌ Error: only "akki" allowed

let userName: "Dave" | "Jhon" | "Amy";
userName = "Dave"; // ✅ Only allowed values

// Functions
const add = (a: number, b: number): number => {
  return a + b;
}

// Function type alias
type mathFunction = (a: number, b: number) => number;

// Alternative using interface for function type (valid!)
interface IMathFunction {
  (a: number, b: number): number;
}

let multiple: mathFunction = function (c, d) {
  return c * d;
};
