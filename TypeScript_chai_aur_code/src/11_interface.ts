// =======================================
// INTERFACE — COMPLETE NOTES (.ts)
// =======================================

// Interface = gives shape (structure) to object / data
// It is a CONTRACT checked at compile-time only
// Interfaces do NOT exist in JavaScript output



// =======================================
// BASIC INTERFACE (OBJECT SHAPE)
// =======================================

interface Chai {
  flavour: string;
  price: number;
  milk?: boolean; // optional property
}

// Object must follow the interface structure
const masala: Chai = {
  flavour: "masala",
  price: 30,
};

// milk is optional, so no error



// =======================================
// READONLY PROPERTY
// =======================================

interface Shop {
  readonly id: number; // cannot be changed after assignment
  name: string;
}

const s: Shop = {
  id: 1,
  name: "chai code",
};

// s.id = 2 ❌ Error: Cannot assign to 'id' because it is readonly

// readonly → write once, then locked



// =======================================
// FUNCTION INTERFACE
// =======================================

// Interface describing a FUNCTION shape
interface DiscountCalculator {
  (price: number): number;
}

// Function must match the signature
const apply50: DiscountCalculator = (p) => p * 0.5;

// One-liner:
// Function interfaces define how a function should look



// =======================================
// INTERFACE WITH METHODS
// =======================================

interface TeaMachine {
  start(): void;
  stop(): void;
}

// Object must implement all methods
const machine: TeaMachine = {
  start() {
    console.log("Machine started");
  },
  stop() {
    console.log("Machine stopped");
  },
};



// =======================================
// INDEX SIGNATURE (IMPORTANT)
// =======================================

// Index signature allows dynamic property names
interface ChaiRating {
  [flavor: string]: number;
}

// Any string key is allowed, value must be number
const ratings: ChaiRating = {
  masala: 4.5,
  ginger: 4.2,
  lemon: 3.8,
};

// Use when:
// - keys are unknown beforehand
// - API responses
// - dictionary-like objects



// ❌ INVALID INDEX SIGNATURE EXAMPLE
// interface WrongRating {
//   [key: string]: number;
//   name: string; // ERROR: string is not assignable to number
// }

// Rule:
// ALL properties must match index signature value type



// =======================================
// DECLARATION MERGING (INTERFACE SUPERPOWER)
// =======================================

interface User {
  name: string;
}

// Same interface name again
interface User {
  age: number;
}

// TypeScript merges them automatically
// Final shape becomes:
// { name: string; age: number }

const u: User = {
  name: "akki",
  age: 30,
};

// One-liner:
// Interfaces with same name merge automatically



// =======================================
// INTERFACE EXTENDS (INHERITANCE)
// =======================================

interface A {
  a: string;
}

interface B {
  b: string;
}

// Interface C inherits from A and B
interface C extends A, B {}

const obj: C = {
  a: "hello",
  b: "world",
};

// extends → combine multiple interfaces cleanly



// =======================================
// INTERFACE VS TYPE (REFERENCE NOTES)
// =======================================

// interface → best for object shapes & APIs
// type → best for unions, intersections, primitives

// interface supports:
// - declaration merging
// - implements (classes)
// - extension

// type supports:
// - union (|)
// - intersection (&)
// - complex compositions





// Rule of thumb:
// interface + index signature → structural objects



// =======================================
// FINAL MEMORY LOCK 🔒
// =======================================

// interface → shape + contract
// optional (?) → may exist
// readonly → cannot change
// function interface → function shape
// index signature → dynamic keys
// extends → inheritance
// declaration merging → auto merge
// interface ≠ runtime code






