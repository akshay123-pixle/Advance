// =======================================
// ARRAYS
// =======================================

// Array of strings
const chaiFlavours: string[] = ["masala", "ginger"];
// ❌ 4 not allowed because array expects only strings

const chaiPrice: number[] = [10, 20, 30];

// Generic array syntax (same as number[])
const rating: Array<number> = [4.5, 5.0];



// =======================================
// ARRAY OF OBJECTS
// =======================================

type Chai = {
  name: string;
  price: number;
};

// Array where EACH element must match Chai
const menu: Chai[] = [
  { name: "Masala", price: 10 },
  { name: "Ginger", price: 20 },
  { name: "Adrak", price: 30 },
];



// =======================================
// READONLY ARRAYS
// =======================================

const cities: readonly string[] = ["delhi", "mumbai"];

// ❌ Not allowed — readonly prevents mutation
// cities.push("aksha");

// readonly means:
// - array cannot be changed
// - safe for configs / constants



// =======================================
// MULTI-DIMENSIONAL ARRAYS
// =======================================

// 2D array (array of number arrays)
const table: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];



// =======================================
// TUPLES (FIXED ORDER + FIXED TYPES)
// =======================================

let chaiTuple: [string, number];
chaiTuple = ["masala", 20]; // ✅ correct order
// chaiTuple = [20, "masala"]; ❌ wrong order

// Optional element in tuple
let userInfoTuple: [string, number, boolean?];
userInfoTuple = ["a", 12];

// Readonly tuple (cannot modify values)
const locationTuple: readonly [number, number] = [28.66, 32.22];

// Named tuple elements (better readability)
const chaiItems: [name: string, price: number] = ["masala", 90];



// =======================================
// ENUMS — RESTRICT CHOICES
// =======================================

// Numeric enum (auto-incremented)
enum CupSize {
  SMALL,   // 0
  MEDIUM,  // 1
  LARGE,   // 2
}

const size = CupSize.LARGE;

// Numeric enum with custom start
enum Status {
  PENDING = 100,
  SERVED,     // 101
  CANCELLED,  // 102
}

// String enum (recommended for clarity)
enum ChaiType {
  MASALA = "masala",
  GINGER = "ginger",
  LEMON = "lemon",
}

function makeChair(type: ChaiType) {
  console.log(`Making :${type}`);
}

makeChair(ChaiType.LEMON);
// makeChair("masala"); ❌ not allowed



// =======================================
// HETEROGENEOUS ENUM (RARE / DISCOURAGED)
// =======================================

enum RandomEnum {
  ID = 1,
  NAME = "Akki",
}

// ⚠️ Not recommended
// Best practice: use either numbers OR strings, not both



// =======================================
// CONST ENUM (COMPILE-TIME ONLY)
// =======================================

// const enum is erased at runtime
// values are inlined → faster & smaller JS
const enum Sugar {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

// const s = Sugar.HIGH;



// =======================================
// ⚠️ TUPLE GOTCHA (IMPORTANT)
// =======================================

let t: [string, number] = ["chai", 10];

// 🚨 Allowed!
// Because tuples are arrays at runtime
t.push("akki");

// TypeScript limitation:
// - push() is not strictly prevented
// - avoid mutating tuples in real apps
