How TS works internally

---


.ts file
   ↓
[ LEXER ]
   ↓
Tokens
   ↓
[ PARSER ]
   ↓
AST (Tree)
   ↓
[ BINDER ]
   ↓
Symbols + Scopes
   ↓
[ CHECKER ]
   ↓
Type Errors / OK

   ↓
[ EMITTER ] generator
   ↓
.js   .d.ts   .map


## 🟦 STEP 0: Your `.ts` File (Input)

```ts
function greet(name: string): string {
  return "Hello " + name;
}
```

Node ❌ can’t run this
TypeScript ✅ can understand it

---

## 🟩 STEP 1: LEXER (Tokeniser) — *Splitting Stage*

### What happens?

The code is **broken into small pieces** called *tokens*.

### Diagram

```
Source Code
   ↓
[ function greet ( name : string ) : string { } ]
```

### Tokens look like:

```
function | greet | ( | name | : | string | ) | : | string | { | }
```

🧠 Think:

> “Break sentence into words & symbols”

📌 No meaning yet
📌 No error checking

---

## 🟨 STEP 2: PARSER — *Structure Builder*

### What happens?

Tokens are arranged into a **tree structure (AST)**

### Diagram

```
          Function
           |
        greet()
           |
     ----------------
     |              |
  parameter      return
   name          string
```

### Real AST idea

```
FunctionDeclaration
 ├─ name: greet
 ├─ parameter: name
 └─ returnType: string
```

🧠 Think:

> “This is a function, not random words”

📌 Checks grammar
📌 Not types

---

## 🟧 STEP 3: BINDER — *Name Connector*

### What happens?

TypeScript connects **names to meanings**

### Code

```ts
function greet(name: string) {
  return name;
}
```

### Diagram

```
Scope: greet
 ├─ greet → function
 └─ name  → parameter
```

🧠 Think:

> “Which `name` are we talking about?”

📌 Handles scope
📌 Finds duplicate variables

---

## 🟥 STEP 4: CHECKER — *Type Police* 🚓

### What happens?

TypeScript **checks types**

### Code

```ts
greet(10);
```

### Diagram

```
greet expects → string
provided       → number
❌ ERROR
```

🧠 Think:

> “You promised a string, you gave a number”

### Also checks:

* Inference
* Unions
* Interfaces
* Generics
* `if` conditions

📌 This is the **heart of TypeScript**

---




---

## 🟫 STEP 5: EMITTER — *Output Generator*

### What happens?

TypeScript **prints files**

---

### 📄 `.js`

```js
function greet(name) {
  return "Hello " + name;
}
```

Types ❌ removed

---

### 📘 `.d.ts`

```ts
declare function greet(name: string): string;
```

Used for:

* Autocomplete
* Libraries

---

### 🗺️ `.map`

```
TS line 2 → JS line 1
```

Used for debugging

---

## 🔁 FULL PIPELINE — ONE DIAGRAM

```
.ts file
   ↓
[ LEXER ]
   ↓
Tokens
   ↓
[ PARSER ]
   ↓
AST (Tree)
   ↓
[ BINDER ]
   ↓
Symbols + Scopes
   ↓
[ CHECKER ]
   ↓
Type Errors / OK
   
   ↓
[ EMITTER ]
   ↓
.js   .d.ts   .map
```

---

## 🧠 ONE-LINE MEMORY TRICK

```
Split → Build → Connect → Check → Rewrite → Print
```

---

## 🎯 Key Thing to Remember

> **TypeScript never runs your code**
> It only **checks** and **removes types**

JavaScript does the running.

---

If you want next, I can:

* Draw **real ASCII AST**
* Show **how VS Code uses this live**
* Explain **why errors show without compiling**
* Compare **Babel vs TypeScript** in same diagram

Just say **which one** 😊
