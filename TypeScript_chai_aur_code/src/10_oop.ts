// =======================================
// OOP (Object-Oriented Programming)
// =======================================

// OOP = writing code by modeling real-world things as objects
// Object = data (properties) + behavior (methods)



// =======================================
// ACCESS MODIFIERS
// =======================================
// public    → accessible everywhere (default)
// private   → accessible only inside the class
// protected → accessible in class + subclasses



class Chai {
  public flavour: string = "masala"; // public by default
  private secretIngredients = "Cardamom"; // hidden from outside

  reveal() {
    // private members CAN be used inside the class
    return this.secretIngredients;
  }
}

const c = new Chai();
c.reveal(); // ✅ allowed
// c.secretIngredients ❌ not allowed



// =======================================
// PROTECTED (INHERITANCE SAFE)
// =======================================

class Shop {
  protected shopName = "chai corner";
}

class Branch extends Shop {
  getName() {
    // protected members are accessible in subclasses
    return this.shopName;
  }
}

// new Branch().shopName ❌ not accessible outside



// =======================================
// JS PRIVATE FIELD (#)
// =======================================

class Walet {
  #balance = 100; // REAL runtime private (JS feature)

  getBalance() {
    return this.#balance;
  }
}

const w = new Walet();
w.getBalance(); // ✅
// w.#balance ❌ syntax error

// One-liner:
// #private → enforced at runtime (stronger than TS private)



// =======================================
// READONLY PROPERTY
// =======================================

class Cup {
  readonly capacity: number = 250;

  constructor(capacity: number) {
    // readonly can be assigned ONLY in constructor
    this.capacity = capacity;
  }
}

// One-liner:
// readonly → value can be set once, then locked 🔒



// =======================================
// GETTERS & SETTERS (CONTROL ACCESS)
// =======================================

class ModernChai {
  private _sugar = 2;

  // getter → read like a property
  get sugar() {
    return this._sugar;
  }

  // setter → validation before assignment
  set sugar(value: number) {
    if (value > 5) throw new Error("Too sweet");
    this._sugar = value;
  }
}

const d = new ModernChai();
d.sugar = 3; // setter runs
d.sugar;     // getter runs

// One-liner:
// getter/setter → controlled access to private data



// =======================================
// STATIC MEMBERS
// =======================================

class EkChai {
  static shopName = "chai code caffe"; // belongs to class, not object

  constructor(public flavour: string) {}
}

// static accessed directly from class
console.log(EkChai.shopName);

// One-liner:
// static → shared data, no object needed



// =======================================
// ABSTRACT CLASS
// =======================================

abstract class Drink {
  // abstract method → must be implemented
  abstract make(): void;
}

class MyChai extends Drink {
  make() {
    console.log("Brewing chai");
  }
}

// new Drink() ❌ cannot create abstract class

// One-liner:
// abstract class → incomplete blueprint, forces implementation



// =======================================
// COMPOSITION (HAS-A relationship)
// =======================================

class Heater {
  heat() {
    console.log("Heating...");
  }
}

class ChaiMaker {
  constructor(private heater: Heater) {}

  make() {
    this.heater.heat();
  }
}

// One-liner:
// composition → class uses another class instead of inheriting it



// =======================================
// INHERITANCE (IS-A relationship)
// =======================================

class BaseChai {
  serve() {
    console.log("Serving chai");
  }
}

class SpecialChai extends BaseChai {
  addFlavor() {
    console.log("Adding flavor");
  }
}

// One-liner:
// inheritance → reuse behavior from parent class



// =======================================
// POLYMORPHISM
// =======================================

class SimpleDrink {
  make() {
    console.log("Making drink");
  }
}

class Tea extends SimpleDrink {
  make() {
    console.log("Making tea");
  }
}

class Coffee extends SimpleDrink {
  make() {
    console.log("Making coffee");
  }
}

// Same method name, different behavior
const drinks: SimpleDrink[] = [new Tea(), new Coffee()];
drinks.forEach(d => d.make());

// One-liner:
// polymorphism → same method, different behavior



// =======================================
// INTERFACE vs ABSTRACT (IMP)
// =======================================

// interface → WHAT class should have
// abstract  → WHAT + SOME implementation

interface Machine {
  start(): void;
}

class Grinder implements Machine {
  start() {
    console.log("Grinding...");
  }
}

// One-liner:
// interface = rules only
// abstract = rules + partial logic
