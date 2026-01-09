//union
let subs: number | string | boolean = false;  
let apiRequestStatus: "pending" | "success" | "error" | "timeout";

let airlineSeat: "aisle" | "window" | "middle" = "aisle";
airlineSeat = "aisle";

const orders = ["12", "20", "34", "90"];
let currentorder;
for (let order of orders) {
  if (order === "20") {
    currentorder = order;
    break;
  }
}
// console.log(currentorder);


//

