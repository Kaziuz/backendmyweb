const express = require("express");
const cors = require('cors');
// const favicon = require('express-favicon');
const app = express();

const fs = require("fs");
const path = require("path"); // replace const path = require('path');

const port = process.env.PORT || 8080;

// the __dirname is the current directory from where the script is running
// app.use(favicon(__dirname + '/build/favicon.ico'));
/*
app.get('/favicon.ico', (req,res) => {
    res.end()
})
*/

// instalamos cors para que nuestro ervidor reciba peticiones
// para prevenir fallos de seguridad creamos una lista blanca
const whitelist = ['http://localhost:3000/cacharreo', 'http://localhost:3000/cacharreo/**']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1){
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS .!.'))
    }
  }
}

app.use(cors()); // here warning securty backend 

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

const server = app.listen(port)
