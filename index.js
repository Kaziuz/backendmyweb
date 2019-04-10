const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path"); 

// proccess.env es una configuración de variable de entorno
// heroku asigna un puerto entonces 
// en prod se usa la variable de entorno
// en dev se usa el puerto asignado
const port = process.env.PORT || 8080;

// all posts
app.get("/posts", (req, res) => {
  const posts = [];
  fs.readdir("posts", (err, files) => { // leemos el directorio
    if (err) throw err;
    files.forEach(file => {
      // Asynchronously reads the entire contents of a file.
      fs.readFile(
        path.join(__dirname, "posts", file), { encoding: "utf8" }, (err, data) => {
          if (err) throw err;
          const dataPosts = JSON.parse(data);
          posts.push(dataPosts);
          if (posts.length === files.length)
            res.send(JSON.stringify(posts, null, 2));
        }
      );
    });
  });
});

// info for cada posts
app.get("/posts/:id", function(req, res) {
  const posts = [];
  const reqId = req.params.id;
  fs.readdir("posts", (err, files) => {
    if (err) throw err;
    files.forEach(function(file) {
      // Asynchronously reads the entire contents of a file.
      fs.readFile(
        path.join(__dirname, "posts", file), { encoding: "utf8" }, (err, data) => {
          if (err) throw err;
          const dataPosts = JSON.parse(data);
          // find post for specific id
          const especificPost = dataPosts.filter( post => post.id === Number(reqId));
          posts.push(especificPost);
          if (posts.length !== 0) res.json(posts);
        }
      );
    });
  });
});

const server = app.listen(port)
