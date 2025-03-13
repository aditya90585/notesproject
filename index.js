

import express from "express"
import fs from "fs"
import env from "dotenv"
env.config()
let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

// import mongoose from "mongoose"
// async function main() {

//   mongoose.connect("mongodb://localhost:27017/")


// }

app.get("/", (req, res) => {

  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files })

  })

})

app.get("/read/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, data) => {

    res.render("read", { data: data, file: req.params.filename })
  })

})

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename })
})
app.post("/edit", (req, res) => {
  fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
    res.redirect("/")
  })

})
app.get("/delete/:filename",(req,res)=>{
  fs.unlink(`./files/${req.params.filename}`,(err)=>{
    res.redirect("/")
    
  })
})
app.post("/create", (req, res) => {
  let filename = req.body.filename.split(" ").join("")
  let text = req.body.textarea

  fs.writeFile(`./files/${filename}.txt`, `${text}`, (err) => {
    console.log(err)
    res.redirect("/")
  });



  // const username = new mongoose.Schema({
  //   email: String,
  //   password: String,

  // });

  // const user = mongoose.model('userpassword', username);
  // const todo = new user({ email: `${email}`, password: `${password}` })
  // todo.save()
})


// main()

app.listen(process.env.PORT)


