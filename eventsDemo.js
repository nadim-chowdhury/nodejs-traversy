import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

function greetHandler(name) {
  console.log("Hello World" + " " + name);
}

function goodbyeHandler(name) {
  console.log("Good Bye" + " " + name);
}

myEmitter.on("greet", greetHandler);
myEmitter.on("goodbye", goodbyeHandler);

myEmitter.emit("greet", "Nadim");
myEmitter.emit("goodbye", "Chowdhury");

myEmitter.on("error", (err) => {
  console.log("Error: ", err);
});
