// =======================================
// GENERICS <T> — COMPLETE NOTES (.ts)
// =======================================

// Generics allow you to write reusable, type-safe code
// without knowing the exact type in advance.

// One-liner:
// Generic = type becomes a variable



// =======================================
// GENERIC FUNCTION
// =======================================

function wrapInArray<T>(item: T): T[] {
  // T is a placeholder for any type
  // Whatever type comes in → same type goes out
  return [item];
}

// TypeScript INFERS the type automatically
wrapInArray("masala");            // T = string
wrapInArray(42);                  // T = number
wrapInArray({ flavour: "masala" });// T = { flavour: string }

// Benefits:
// - no `any`
// - full type safety
// - reusable logic



// =======================================
// MULTIPLE GENERICS
// =======================================

function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
  // return [b, a]; ❌ error (order matters)
}

pair("masala", "test"); // A=string, B=string
pair("ginger", 19);     // A=string, B=number
pair({}, 67);           // A=object, B=number

// One-liner:
// Multiple generics let you relate different types together



// =======================================
// GENERIC INTERFACE
// =======================================

interface Box<T> {
  content: T;
}

// When using the interface, you FIX the type
const numberBox: Box<number> = {
  content: 10,
};

// ❌ Error: content must be string
// const numberBox2: Box<string> = { content: 20 };

const numberBox2: Box<boolean> = {
  content: true,
};

// One-liner:
// Generic interfaces lock the type when used



// =======================================
// GENERICS WITH API RESPONSE (VERY COMMON)
// =======================================

interface ApiPromise<T> {
  status: number;
  data: T;
}

// Here we define WHAT the API data looks like
const res: ApiPromise<{ flavour: string }> = {
  status: 200,
  data: {
    flavour: "akki",
  },
};

// res.data is fully typed
// res.data.flavour ✅
// res.data.price ❌

// One-liner:
// Generics make APIs strongly typed and reusable



// =======================================
// GENERICS + UTILITY TYPES
// =======================================

// Generics work perfectly with utility types

type PartialBox<T> = Partial<Box<T>>;
type RequiredBox<T> = Required<Box<T>>;
type ReadonlyBox<T> = Readonly<Box<T>>;
