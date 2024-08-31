/* 
 * Node.js (and probably other JS engines) don't throw any errors for flawed lines of code that are not executed.
 * This may seem obvious, but many compiled languages, like C++, can detect a lot of errors long before the code is
 * ever actually run, so the fact that certain kinds of errors (like whether a variable is defined) are only caught
 * at runtime is important to know.
 *
 * Lines are run one-by-one (like most scripting languages I've used) and the entire program crashes the moment one
 * line has an unhandled error. If bad_code() is run it will print "Running bad code..." then crash.
 */

var globalData = "global";

function bad_code() {
    console.log("Running bad code...");
    console.log(badData); // IF RUN: ReferenceError: badData is not defined
    console.log("Bad code done.");
}

function good_code() {
    console.log("Running good code...");
    console.log(globalData);
    console.log("Good code done.");
}

// bad_code(); // Uncomment to crash the program.
good_code();