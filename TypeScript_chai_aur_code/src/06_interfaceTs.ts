// =======================================
// TYPE ALIAS (OBJECT SHAPE)
//Interface
// =======================================
//An interface is a TypeScript construct that defines the shape of an object by specifying property names, their types, and method signatures, and it is used as a contract that a class or object must implement.
type ChaiOrder = {
  type: string;
  sugar: number;
  strong: boolean;
};

// Both functions accept the SAME shape
function makeChai(order: ChaiOrder) {
  console.log(order);
}

function serveChai(order: ChaiOrder) {
  console.log(order);
}

// Key idea:
// type is just a description of an object’s shape
// No runtime existence, only compile-time checking

// =======================================
// TYPE vs INTERFACE (OBJECT STRUCTURE)
// =======================================

type TeaRecipe = {
  water: number;
  milk: number;
};

// OR (equivalent for object shapes)
// interface TeaRecipe {
//   water: number;
//   milk: number;
// }

// Classes can IMPLEMENT interfaces or object types
class MasalaChai implements TeaRecipe {
  water = 100;
  milk = 50;
}

// implements means:
// "This class PROMISES to have these properties"

// =======================================
// WHY INTERFACE IS USED WITH `implements`
// =======================================

// ❌ This does NOT work because type alias is not an interface
// type CupSize = "small" | "large"

// class Chai implements CupSize {
// }

// Reason:
// - `implements` expects an OBJECT CONTRACT
// - literal unions are NOT object shapes

// =======================================
// INTERFACE FOR CLASS CONTRACT
// =======================================

interface CupSize {
  size: "small" | "large";
}

// ✅ Works because interface describes an object structure
class Chai implements CupSize {
  size: "small" | "large" = "large";
}

// =======================================
// ❌ INVALID INTERFACE SYNTAX (IMPORTANT)
// =======================================

// This is NOT valid TypeScript syntax
// interface Response {
//   ok: true
// } | {
//   ok: false
// }

// Interfaces cannot be unions ❌
// Use TYPE for unions instead

// =======================================
// UNION TYPE (CORRECT WAY)
// =======================================

type Response = { ok: true } | { ok: false };

// ❌ This will error
class myRes implements Response {
  ok: boolean = true;
}

// Why?
// - Response is a UNION
// - Class must satisfy ALL possibilities
// - boolean is wider than true | false literal

// =======================================
// LITERAL TYPES
// =======================================

type TeaType = "masala" | "ginger" | "lemon";

function orderChai(t: TeaType) {
  // Only allowed values:
  // "masala" | "ginger" | "lemon"
  console.log(t);
}

// Prevents invalid strings at compile time 🛡️

// =======================================
// INTERSECTION TYPES (&)
// =======================================

type BaseChai = { teaLeaves: number };
type extra = { masala: number };
type add = { address: string };

// Intersection means: MUST have ALL properties
type mixChai = BaseChai & extra & add;

const cup: mixChai = {
  teaLeaves: 2,
  masala: 1,
  address: "mumbai",
};

// Think of & as merging object requirements 🧩

// =======================================
// OPTIONAL PROPERTIES (?)
// =======================================

type User = {
  username: string;
  bio?: string; // optional
};

const u1: User = { username: "akshay" };
const u2: User = { username: "akshay", bio: "akki" };

// Optional means:
// - property may exist OR not
// - still type-safe when accessed with checks

// =======================================
// READONLY PROPERTIES
// =======================================

type Config = {
  readonly appName: string;
  version: number;
};

const cfg: Config = {
  appName: "MasterJi",
  version: 1,
};

// ❌ Error: Cannot assign to 'appName' because it is readonly
cfg.appName = "aa";

// readonly means:
// - value can be set once
// - cannot be changed later
