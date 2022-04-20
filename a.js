const express =  require("express");
const app = express()
const path = require("path");
const bodyParser = require("body-parser")
const PORT = 3000
const fs = require("fs")
const db = "./Public-db/data.json"
// app.use(bodyParser.json())


app.get("/filter/:pass", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    pass = req.params.pass
 
    fildata = data.filter(passwd => {
       if (passwd.pass == pass)
            return passwd.name
 })
            res.json(fildata)

          })

  
  app.get('/del/:name', (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    const name = req.params.name;
    remv = data.findIndex(x => x.name == name)
    console.log(remv)
    data.splice(remv, 1)
  remdata = fs.writeFileSync(db, JSON.stringify(data))
   res.send('User removed from Database')
     })
    


  app.get('/update/:name', (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))
    named=req.params.name
        username= data.find(users => {
      users.name== named
    })
    if (typeof username !== 'undefined'){
    res.send('User already Exist')
  }
    else{
    newuser = {name: req.query.name , pass: req.query.pass}
    data.push(newuser)
    res.send('New User Added')
}
  fs.writeFileSync(db, JSON.stringify(data))
  })


app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT);
})