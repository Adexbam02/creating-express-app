const express = require("express");
const app = express()
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 4000

app.get(`^/$|/index(.html)?`, (req, res) => {
  console.log(req.url, req.method, "homepage")
  res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.get(`/new-page(.html)?`, (req, res) => {
  console.log(req.url, req.method, "new-page")
  res.sendFile(path.join(__dirname, "views", "new-page.html"))
})

app.get(`/new(.html)?`, (req, res) => {
  console.log(req.url, req.method, "redirect")
  res.redirect(301, "/new-page.html")
})

//Route handlers
app.get(`/hello(.html)?`, (req, res, next) => {
  console.log("Attempted to log hello.html")

  next()
}, (req, res) => {
  res.send("Hello World!")
})


// chaining routes handler
const one = (req, res, next) =>{
  console.log("one")
  // res.send("One")
  next()
}

const two = (req, res, next) =>{
  console.log("Two")
  // res.send("Two")
  next()
}

const three = (req, res) =>{
  console.log("Three")
  res.send("Finishedd")
}

app.get(`/chain(.html)?`, [one, two, three])

app.get("/*", (req, res) => {
  console.log(req.url, req.method, "404 page")
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

