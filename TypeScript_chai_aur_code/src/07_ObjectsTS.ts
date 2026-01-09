// =======================================
// OBJECT
// =======================================

const chai = {
  name: "masala chai",
  price: 20,
  isHot: true,
};

// TypeScript INFERRED this automatically as:
// {
//   name: string;
//   price: number;
//   isHot: boolean;
// }

// Note:
// - We don’t write types here
// - TS infers them behind the scenes



// =======================================
// EXPLICIT OBJECT TYPE
// =======================================

// Here we EXPLICITLY define the object shape
let tea: {
  name: string;
  price: number;
  isHot: boolean;
};

tea = {
  name: "Giner Tea",
  price: 20,
  isHot: true,
};

// Explicit types are useful when:
// - variable is declared first
// - value comes later (API, function, etc)



// =======================================
// TYPE ALIAS FOR OBJECTS
// =======================================

type Tea = {
  name: string;
  price: number;
  ingredient: string[];
};

// Cleaner + reusable
const adrakChai: Tea = {
  name: "masala chai",
  price: 30,
  ingredient: ["ginger", "tea leaves"],
};



// =======================================
// DUCK TYPING (STRUCTURAL TYPING)
// =======================================

// "If it looks like a duck, it's a duck"

type Cup = {
  size: string;
};

let smallCup: Cup = {
  size: "200ml",
};

let bigCup = {
  size: "500ml",
  material: "steel",
};

// Allowed because:
// - bigCup HAS at least the required properties of Cup
// - extra properties are ignored
smallCup = bigCup;



// =======================================
// DUCK TYPING WITH DIFFERENT OBJECTS
// =======================================

type Brew = {
  brewTime: number;
};

const coffee = {
  brewTime: 5,
  beans: "Africa",
};

// Allowed for the same reason:
// coffee satisfies Brew’s structure
const chaiBrew: Brew = coffee;



// =======================================
// BASIC OBJECT TYPE
// =======================================

type User = {
  username: string;
  password: string;
};

const u: User = {
  username: "akshay",
  password: "1991",
};



// =======================================
// SPLITTING COMPLEX DATA TYPES
// =======================================

// Small reusable types
type Item = {
  name: string;
  quantity: number;
};

type Address = {
  street: string;
  pin: number;
};

type Info = {
  Phone: number;
};

// Composed type
type Order = {
  id: string;
  Items: Item[];
  address: Address;
  extraInfo: Info;
};

// This improves:
// - readability
// - reusability
// - maintainability



// =======================================
// UTILITY TYPE: Partial<T>
// =======================================

type Chai = {
  name: string;
  price: number;
  isHot: boolean;
};

// Partial<T> makes ALL properties optional
const updateChai = (updates: Partial<Chai>) => {
  console.log("updating chai with", updates);
};

updateChai({ price: 25 });
updateChai({ isHot: false });
updateChai({}); // ✅ allowed

// ⚠️ Important:
// Partial allows EMPTY OBJECTS
// Useful for updates, but dangerous if not validated



// =======================================
// UTILITY TYPE: Required<T>
// =======================================

type ChaiOrder = {
  name?: string;
  quantity?: number;
};

// Required<T> makes ALL properties mandatory
const placeOrder = (order: Required<ChaiOrder>) => {
  console.log(order);
};

placeOrder({ name: "akshay", quantity: 10 }); // ✅ OK
// placeOrder({ quantity: 10 }); ❌ Error

// Even optional properties become required here



// =======================================
// UTILITY TYPE: Pick<T, Keys>
// =======================================

type Chaii = {
  name: string;
  price: number;
  isHot: boolean;
  ingredient: string[];
};

// Pick selects ONLY specific fields
type BasicChaiInfo = Pick<Chaii, "name" | "price">;

const chaiInfo: BasicChaiInfo = {
  name: "masala chai",
  price: 10,
};

// Useful for:
// - APIs
// - UI summaries
// - security control



// =======================================
// UTILITY TYPE: Omit<T, Keys>
// =======================================

type ChaiNew = {
  name: string;
  price: number;
  isHot: boolean;
  secretIngredient: string[];
};

// Omit removes specific fields
type PublicChai = Omit<ChaiNew, "secretIngredient">;

const puchai: PublicChai = {
  name: "ginger",
  price: 10,
  isHot: false,
};

// Common use case:
// - hide sensitive data (passwords, secrets)
