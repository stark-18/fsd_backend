
 const express = require("express");
 const fs = require("fs");
 const app = express();
 app.use(express.json());
 const users = [];
 const readdata()=>{
    users = fs.readFile("./data.json",'utf8');
 }
 const writedata = ()=>{
    fs.writeFile('./data.json',JSON.stringify(users,null,2));
 }

 app.get("/api",(req,res)=>{
     readdata();
     res.json(users);
 });
 app.get('/users', (req, res) => {   
     res.json("welcome to backend");
 });
 app.post("/users",(req,res)=>{
     const data = req.body;  
     const newid = users.length > 0 ? users[users.length - 1].id + 1 : 1;
     data.id = newid;
     users.push(data);
     fs.writeFile("data.json", JSON.stringify(users), (err) => {
         if (err) {
             res.json({ message: "Data not saved", data: data });
         } else {
             res.json({ message: "Data received", data: data });
         }
     });
 });
 app.listen(9000, () => {
     console.log('Server running on port 9000');
 });
