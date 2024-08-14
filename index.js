import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url));
const app=express();
const port=5000;

let bandName=""; //coz band name issi empty string me generate hoga

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public/'));

function bandGenerate(req,res,next){
    console.log(req.body);
    bandName= req.body["First Name:"] + '\n' + req.body["Last Name:"]; 
    //req.body[name] + req.body[name] ; ye index.html k attr wale name hai inhe waha dalna hoga
    
    next();
}

app.use(bandGenerate);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

app.post('/submit',(req,res)=>{
    res.send(`<h1>The Band Name Is: <br> <h2> ${bandName}</h2>`)
});

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});