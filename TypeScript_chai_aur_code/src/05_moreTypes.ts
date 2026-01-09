// =======================================
// FORCEFUL TYPE ASSERTION (⚠️ USE CAREFULLY)
// =======================================

// response is `any` → TypeScript gives up all safety
let response: any = "42";

// We ASSERT (force TS to believe) response is a string
// TS will not verify this at runtime
let numericLength: number = (response as string).length;

// ⚠️ If response was not actually a string, this could crash at runtime

// =======================================
// TYPE ASSERTION WITH JSON.parse
// =======================================

type Book = {
  name: string;
};

// JSON string (⚠️ malformed key here, but TS does not validate JSON)
let bookString = '{"name:"who moved my cheese"}';

// JSON.parse returns `any`
// We assert that the parsed object matches Book
let bookObject1 = JSON.parse(bookString) as Book;

// TS now trusts bookObject1 has a `name`
console.log(bookObject1.name);

// Without assertion → type is `any`
let bookObject2 = JSON.parse(bookString);

// No type safety here
console.log(bookObject2);

// ⚠️ Important:
// - `as Book` does NOT validate JSON structure
// - It only silences TypeScript
// - Runtime errors are still possible

// =======================================
// DOM TYPE ASSERTION
// =======================================

// getElementById returns HTMLElement | null
// We assert it's an HTMLInputElement
const inputElements = document.getElementById("username") as HTMLInputElement;

// ⚠️ If element is null or not an input, runtime error possible
// Safer approach would include a null check

// =======================================
// ERROR HANDLING + TYPE NARROWING
// =======================================

try {
  // some risky code
} catch (errror) {
  // catch variable type is `unknown` by default

  // ❌ This won't work:
  // console.log(errror.message);
  // because TS does not know errror is an Error

  // ✅ Proper narrowing
  if (errror instanceof Error) {
    // Now TS knows errror is Error
    console.log(errror.message);
  }

  console.log("Error", errror);
}

// =======================================
// unknown vs any
// =======================================

const data: unknown = "akshay";

// ❌ Error: unknown is not assignable to string
// const stringData: string = data;

// ✅ Forceful assertion (unsafe if wrong)
const stringData: string = data as string;

// Better approach would be:
// if (typeof data === "string") { ... }

// Rule:
// unknown → forces you to check
// any     → disables TypeScript completely

// =======================================
// LITERAL TYPES + NEVER
// =======================================

type Role = "admin" | "user";

function redirectBasedOnRole(role: Role): void {
  if (role === "admin") {
    console.log("Redirecting to admin");
    return;
  }

  if (role === "user") {
    console.log("Redirecting to user");
    return;
  }

  // At this point:
  // - all possible Role values are already handled
  // - no value can reach here

  role; // type is `never`
}

// =======================================
// never RETURN TYPE
// =======================================

// Function that NEVER finishes
// (infinite loop, no return, no throw)
function neverReturn(): never {
  while (true) {
    // runs forever
  }
}

// never means:
// - function does not complete
// - used for infinite loops or throwing errors
// Mental shortcuts to remember 🧠


// as → “Trust me bro” assertion 🤝 (no runtime check)
// any → blindfold on TypeScript 🙈
// unknown → seatbelt on 🚗
// never → “this path is impossible”
