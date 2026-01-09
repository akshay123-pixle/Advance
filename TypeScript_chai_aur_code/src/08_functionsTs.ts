// =======================================
// BASIC FUNCTION WITH TYPED PARAMETERS
// =======================================

function makeChai(type: string, cups: number) {
  // type → must be string
  // cups → must be number
  console.log(`Making ${cups} of ${type}`);
}

makeChai("masalachai", 2); // ✅ correct types



// =======================================
// FUNCTION WITH EXPLICIT RETURN TYPE
// =======================================

function getChaiPrice(): number {
  return 25; // ✅ must return number
  // return "23"; ❌ error: string is not assignable to number
}

// Explicit return types help:
// - catch mistakes early
// - improve readability
// - lock API behavior



// =======================================
// FUNCTION WITH MULTIPLE RETURN TYPES
// =======================================

function makeOrder(order: string) {
  if (!order) {
    return null;
  }
  return order;
}

// Inferred return type:
// string | null
// TS figures this out automatically



// =======================================
// VOID RETURN TYPE
// =======================================

// If a function does not return anything meaningful,
// use `void`
function logChai(): void {
  console.log("chai is ready");
}

// void means:
// - function finishes execution
// - return value is ignored



// =======================================
// OPTIONAL PARAMETER (COMMENTED OUT)
// =======================================

// function orderChai(type?: string) {
// }

// Optional means:
// - parameter can be undefined
// - function must handle that case



// =======================================
// DEFAULT PARAMETER
// =======================================

// Default value automatically handles undefined
function orderChai(type: string = "Masala") {
  // If no argument passed → type = "Masala"
}

// Difference:
// optional (?) → type: string | undefined
// default value → type is always string



// =======================================
// OBJECT PARAMETER WITH LITERAL TYPES
// =======================================

function createChai(order: {
  type: string;
  sugar: number;
  size: "small" | "large";
}): number {
  return 4;
}

// The function accepts ONLY this exact shape
// size is restricted to "small" or "large"
