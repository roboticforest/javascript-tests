// Scope Tests

// let keyword does not hoist variables. Scoping is strict.
// Using let, variables scope like they do in Java, C++, and similar.

let globalData = "global";

function scope_tests() {
    let procedureData = "function";

    // statement blocks
    if (true) {
        let blockOneData = "block 1";
    }

    // anonymous blocks
    {
        let blockTwoData = "block 2";
    }

    // Deeply nested blocks
    if (true) {
        if (true) {
            let blockThreeData = "block 3";
            {
                let blockFourData = "block 4";

                console.log("From within deepest nested scope:");
                console.log(globalData);
                console.log(procedureData);
                // console.log(blockOneData); // ReferenceError: blockOneData is not defined
                // console.log(blockTwoData); // ReferenceError: blockTwoData is not defined
                console.log(blockThreeData);
                console.log(blockFourData);
            }
        }
    }

    console.log("From within function scope:");
    console.log(globalData);
    console.log(procedureData);
    // console.log(blockOneData);   // ReferenceError: blockOneData is not defined
    // console.log(blockTwoData);   // ReferenceError: blockTwoData is not defined
    // console.log(blockThreeData); // ReferenceError: blockThreeData is not defined
    // console.log(blockFourData);  // ReferenceError: blockFourData is not defined
}

// NOTE: Unintended test.
// Node.js (and probably other JS engines) don't throw any errors for code flawed code nt executed!
// If you comment out the following call to scope_tests and uncomment the console logging lines
// within it, node will not crash. I guess, such is the life outside of a compiled language?
scope_tests();

console.log("From within global scope:");
console.log(globalData);
// console.log(procedureData); // ReferenceError: procedureData is not defined
// console.log(blockOneData);  // ReferenceError: blockOneData is not defined
// console.log(blockTwoData);  // ReferenceError: blockTwoData is not defined
// ... etc for anything not in global scope.
