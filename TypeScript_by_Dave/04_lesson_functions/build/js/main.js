"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ❌ INVALID with interface
// interface stringOrNumber = string | number; // ❌ Error: interface can't be a union
// interface point = [number, number];         // ❌ Error: interface only describes objects
// Literal Types
let myName; // myName can ONLY be "akki"
myName = "akki"; // ✅ OK
// myName = "AKKI"; // ❌ Error: only "akki" allowed
let userName;
userName = "Dave"; // ✅ Only allowed values
// Functions
const add = (a, b) => {
    return a + b;
};
let multiple = function (c, d) {
    return c * d;
};
//# sourceMappingURL=main.js.map