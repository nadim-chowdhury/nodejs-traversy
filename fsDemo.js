import { promises as fs } from "fs";

fs.readFile("./text.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

const readFile = async () => {
  try {
    const data = await fs.readFile("./text.txt", "utf-8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

readFile();

const writeFile = async () => {
  try {
    await fs.writeFile("./test.txt", "This is moye moye test");
    console.log("File Written");
  } catch (error) {
    console.log(error);
  }
};

writeFile();

const appendFile = async () => {
  try {
    await fs.appendFile("./test.txt", "\nThis is joy bangla text");
    console.log("File appended");
  } catch (error) {
    console.log(error);
  }
};

appendFile();
