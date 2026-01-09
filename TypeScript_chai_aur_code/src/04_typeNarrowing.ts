// -----------------------------
// TYPE NARROWING WITH typeof
// -----------------------------
function getChai(kind: string | number) {
  // typeof narrows the union type
  if (typeof kind === "string") {
    // here TypeScript knows: kind is string
    return `Making ${kind} chai...`;
  }

  // here TypeScript knows: kind is number
  return `chai order: ${kind}`;
}

// -----------------------------
// OPTIONAL PARAMETER NARROWING
// -----------------------------
function serverChai(msg?: string) {
  // msg can be string | undefined
  if (msg) {
    // truthy check removes undefined
    return `Serving ${msg}`;
  }

  // msg is undefined here
  return `Default message ${msg}`;
}

// -----------------------------
// LITERAL TYPES + UNION
// -----------------------------
function orderChai(size: "medium" | "small" | number) {
  // literal check narrows to "small"
  if (size === "small") {
    return `Small ${size}`;
  }

  // literal check narrows to "medium"
  if (size === "medium") {
    return `Medium ${size}`;
  }

  // remaining type is number
  return `Chai order ${size}`;
}

// -----------------------------
// CLASS-BASED NARROWING
// -----------------------------
class KulhadChair {
  serve() {
    return `Serve Kulhad chai`;
  }
}

class Cutting {
  serve() {
    return `Serve Cutting chai`;
  }
}

function serve(chai: KulhadChair | Cutting) {
  // instanceof narrows the class type
  if (chai instanceof KulhadChair) {
    return chai.serve();
  }

  // TypeScript knows it's Cutting here
  return chai.serve();
}

// -----------------------------
// CUSTOM TYPE GUARD FUNCTION
// -----------------------------
type ChaiOrder = {
  type: string;
  sugar: number;
};

// "obj is ChaiOrder" tells TS this is a type guard
function isChaiOrder(obj: any): obj is ChaiOrder {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.type === "string" &&
    typeof obj.sugar === "number"
  );
}

function serverOrder(item: ChaiOrder | string) {
  // custom guard narrows the type
  if (isChaiOrder(item)) {
    return `Serving ${item.type} chai with ${item.sugar} sugar`;
  }

  // item is string here
  return `Serving custom chai: ${item}`;
}

// -----------------------------
// DISCRIMINATED UNIONS
// -----------------------------
type MasalaChai = {
  type: "masala";
  spiceLevel: number;
};

type GingerChai = {
  type: "ginger";
  price: number;
};

type ElaichiChai = {
  type: "elaichi";
  amount: number;
};

type Chai = MasalaChai | GingerChai | ElaichiChai;

function MakeChai(order: Chai) {
  // switch on common "type" property
  switch (order.type) {
    case "masala":
      // order is MasalaChai
      return "Masala chai";

    case "ginger":
      // order is GingerChai
      return "Ginger chai";

    case "elaichi":
      // order is ElaichiChai
      return "Elaichi chai";
  }
}

// -----------------------------
// "in" OPERATOR NARROWING
// -----------------------------
function brew(order: MasalaChai | GingerChai) {
  // checks for property existence
  if ("spiceLevel" in order) {
    // order is MasalaChai
    return "Masala spice level present";
  }

  // order is GingerChai
  return "Ginger chai brewing";
}

// ===================================================
// any vs unknown
// ===================================================

// -----------------------------
// any (NO TYPE SAFETY ❌)
// -----------------------------
let value: any = 10;

// TypeScript allows anything — even wrong code
value.toUpperCase(); // ❌ runtime error, but TS allows it
value.foo.bar();     // ❌ runtime error, but TS allows it

// Notes:
// - TypeScript does NOT check the type
// - Can easily cause runtime crashes
// - Avoid using any when possible

// -----------------------------
// unknown (SAFE TYPE ✅)
// -----------------------------
let b: unknown = "hi";

// ❌ Error: TypeScript forces you to check first
// b.toUpperCase();

// Correct usage with narrowing
if (typeof b === "string") {
  // ✅ now safe
  b.toUpperCase();
}

// Notes:
// - unknown forces type checking
// - Much safer than any
// - Best for API data / user input

// -----------------------------
// RULE OF THUMB 📝
// -----------------------------
// any     → disables TypeScript (avoid)
// unknown → use when type is not known yet, but safety matters
