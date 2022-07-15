/*
 internal command
*/

// const fileSystem = require("fs");
// fileSystem.copyFileSync("file1.txt", "destin.txt");
// console.log("Success");

/*
    work with external package
*/

var superheroes = require("superheroes");

console.log(superheroes.random());

var supervillains = require("supervillains");

console.log(supervillains.random);