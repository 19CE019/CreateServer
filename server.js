const express = require('express');
const helmet = require('helmet');
const https = require('https');
const path = require('path');
const fs = require('fs');  
const { urlencoded } = require('express');
const app = express();
app.use(helmet());
app.use(express.urlencoded({
    extended:true
}))
//------------------------------------------------Routes
app.get('/',(req,res)=>{
    res.send("<h1>Hello from Express Server...</h1>");
})

app.get('/html',(req,res)=>{
    res.sendFile(__dirname+'/html/index.html');
})

app.post('/submitform',(req,res)=>{
    const uname =req.body.username;
    console.log(uname)
})

const sslServer=https.createServer({
    key:fs.readFileSync(path.join(__dirname,'certi','key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'certi','cert.pem')),
},app)

sslServer.listen(3030,()=> console.log('Server listening on port number 3030'));
