// Scope Tests

// var keyword "hoists" variables to the top of their scope.
// var variables can also be used before being declared as a result.
// All variables defined with the var keyword are hoisted to function scope.

var globalData = "global";

function scope_tests() {
    var procedureData = "function";

    // statement blocks
    if (true) {
        var blockOneData = "block 1";
    }

    // anonymous blocks
    {
        var blockTwoData = "block 2";
    }

    // Deeply nested blocks
    if (true) {
        if (true) {
            var blockThreeData = "block 3";
            {
                var blockFourData = "block 4";

                console.log("From within deepest nested scope:");
                console.log(globalData);
                console.log(procedureData);
                console.log(blockOneData); // Prints, but linter gives a warning.
                console.log(blockTwoData); // Prints, but linter gives a warning.
                console.log(blockThreeData);
                console.log(blockFourData);
            }
        }
    }

    console.log("From within function scope:");
    console.log(globalData);
    console.log(procedureData);
    console.log(blockOneData);   // Prints, but linter gives a warning.
    console.log(blockTwoData);   // Prints, but linter gives a warning.
    console.log(blockThreeData); // Prints, but linter gives a warning.
    console.log(blockFourData);  // Prints, but linter gives a warning.
}

scope_tests();

console.log("From within global scope:");
console.log(globalData);
// console.log(procedureData); // ReferenceError: procedureData is not defined
// console.log(blockOneData);  // ReferenceError: blockOneData is not defined
// console.log(blockTwoData);  // ReferenceError: blockTwoData is not defined
// ... etc for anything not in global scope.
