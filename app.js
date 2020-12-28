// const { v4: uuidv4 } = require("uuid");
// for (let i = 0; i <= 100; i++) {
//   console.log(uuidv4());
// }

const fs = require("fs");

// fs.writeFile("index.txt", "I love hitu but she dosent ha ha ha", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("File written Successsfully");
// });
fs.unlink(
  "uploads\\ababd189-ce94-4f62-91d9-91c346560c3b-1608895359045.jpg",
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("File deleted Successsfully");
  }
);
