// TYPE ANNOTATIONS (you tell TS) ->>> i will make u understand
//TYPE INFERENCE (TS understands by itself)
// TYPE INFERENCE
// inferred as string
let drink = "akshay";

// inferred as number | string (union)
let cups = Math.random() > 0.5 ? 10 : "5";

// inferred as string
let myName = "akshayJadhav";

// inferred as number
let price = 99;

// inferred as boolean
let isHot = true;

// TYPE ANNOTATIONS (you tell TS)

// explicitly saying it must be string
let chaiFlavour: string = "ginger tea";

// reassignment allowed (still string)
chaiFlavour = "masala chai";

// declared but not initialized
let chaiOrder: boolean;

// now assigning value
chaiOrder = true;

// ARRAYS

// inferred as string[]
let chaiList = ["ginger", "masala", "elaichi"];
// annotation
let priceList: number[] = [10, 20, 30];

// OBJECTS

// inferred object type
let user = {
  name: "Akshay",
  age: 22,
};

// annotation for object

let admin: { name: string; isAdmin: boolean };
admin = {
  name: "akshay",
  isAdmin: true,
};

let student: { name: string; rollNumber: number; isPassed: boolean };
student = {
  name: "akki",
  rollNumber: 9090,
  isPassed: true,
};

// FUNCTIONS

// parameter annotation
function makeChai(flavour: string) {
  return `Chai: ${flavour}`;
}

// return type inferred as string
let result = makeChai("ginger");


// return type annotation
function countCups(cups: number): number {
  return cups * 2;
}


// use inference
let x = 10;

// use annotation
let y: number;
y = 10;
