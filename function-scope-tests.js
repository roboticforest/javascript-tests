/**
 * Unlike regular functions, arrow functions do not bind their scope to the object that calls the function.
 * Instead, they use a lexical scope, in which the surrounding scope determines the value of the this keyword.
 * Therefore, the scope to which this refers in an arrow function always represents the object defining the arrow
 * function instead of the object calling the function. -- Martin Krause, The Complete Developer
 */

// START of Listing 2-11: An arrow function’s scope -- The Complete Developer
this.scope = "lexical scope"; // Default global "this" object.

const scopeOf = {
    scope: "defining scope",

    traditional: function () {
        return this.scope;
    },

    arrow: () => {
        return this.scope;
    }
};

console.log(scopeOf.traditional()); // Prints "defining scope"
console.log(scopeOf.arrow());       // Prints "lexical scope"
// END of Listing 2-11: An arrow function’s scope -- The Complete Developer

/**
 * But, why? Unless I'm seriously misunderstanding the term "lexical" I would expect the value of `this` when used
 * within the arrow function, named `arrow`, to be `scopeOf`, but it's clearly the global `this` instead.
 * 
 * After some research, double-checking my sanity with a dictionary, and arguing with ChatGPT 4, I got the following
 * answer. It's the lack of surrounding functions. JavaScript lets you define functions within other functions, and
 * each function will inherit a `this` from somewhere, so the value of `this` is determined by the surrounding lexical
 * context of function definitions specifically, falling back on the global `this` value if a value doesn't come from
 * a surrounding function.
 * 
 * From ChatGPT:
 * Here’s the crucial point: the `this` inside an arrow function is determined by the context the arrow function is
 * created, not by the specific object it is defined within.
 * 
 * Definition Context: The arrow function `arrow` is created inside the object literal `scopeOf`. However,
 * arrow functions do not bind `this` based on the object they are defined in or assigned to. Instead, they
 * inherit `this` from the surrounding _function_ or global scope.
 * 
 * Surrounding Context: The arrow function `arrow: () => { return this.scope; }` is defined inside the object
 * `scopeOf`, but there is no surrounding function that is binding `this` to `scopeOf`. Since it’s not inside
 * a traditional function that would set its own `this`, it looks to the next outer context where `this` is defined
 * which, in this case, is the global context (because there is no function wrapper around the object definition).
 * 
 * Global `this`: In the global context (outside of any function), `this` refers to the global object (`window` in
 * a browser or `global` in Node.js). So when the arrow function is executed, it uses this global `this`.
 */

// Let's test that and see if it's right.

// Define a new global to shadow in other scopes.
this.testData = "Outer Scope";

// Very basic test. See if they bind to global scope.
function free_function() {
    return this.testData;
}

free_arrow = () => this.testData;

console.log("----- Basic Test");
console.log(free_function()); // Prints: undefined
console.log(free_arrow());    // Prints: "Outer Scope"

// Object literal. Similar to the test from the book.
const testObject = {
    testData: "Inner Scope"
};

// This doesn't work. You can't apply functions like these to object literals. ... But, why not?
// console.log(testObject.free_function()); // TypeError: testObject.free_function is not a function at Object.<anonymous>
// console.log(testObject.free_arrow()); // TypeError: testObject.free_arrow is not a function at Object.<anonymous>

/**
 * How JS handles objects is weird coming from a background in C++, Java, and Python. `this` appears to have nothing
 * to do with objects (or at least, object literals), and everything to do with functions.
 * 
 * Does each traditional function get its own `this` variable? That would explain a lot about constructor functions.
 */

