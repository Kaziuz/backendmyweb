const express = require("express");
// const favicon = require('express-favicon');
const app = express();

const fs = require("fs");
const path = require("path"); // replace const path = require('path');

// the __dirname is the current directory from where the script is running
// app.use(favicon(__dirname + '/build/favicon.ico'));
/*
app.get('/favicon.ico', (req,res) => {
    res.end()
})
*/

// all posts
app.get("/posts", (req, res) => {
  const posts = [];
  fs.readdir("posts", (err, files) => {
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

const server = app.listen(5000, () => {
  console.log(`Server runing at http://localhost: ${server.address().port}`);
});

//server.js
// configuración para servir la aplicacion de react con myJsonserver
/*
const port = process.env.PORT || 8080;

const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
*/
