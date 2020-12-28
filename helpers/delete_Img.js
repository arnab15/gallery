const fs = require("fs");

const deleteFIle = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err) => {
      if (err) {
        reject(new Error("given file dose not exist"));
        return;
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(new Error("Unable to delete file"));
          return;
        }
      });
      resolve("file deleted Sucessfully");
    });
  });
};

exports.deleteFIle = deleteFIle;
// deleteFIle("uploads\\c275e1ee-4d25-47da-9244-0ea9c297d1fd-adar2.png")
//   .then((done) => {
//     console.log(done);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// const path = "uploads\\b2408be6-f0d3-4f1b-843d-a34386523ac0-Flappy Bird.png";

// async function f() {
//   try {
//     await deleteFIle(path);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// f();
