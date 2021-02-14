const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fileupload = require('express-fileupload');
// const { exec } = require("child_process");
const pycall = require('./utils/utils.js')




const app = express();
const port = process.env.PORT || 3000;

app.use(fileupload());

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'/../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath));



const hf = {
    title:"Automated Document detection",
    name: "Aravind, Ashik, Tilak, Amith"

};


app.get('/',(req,res)=>{
    res.render('index',hf);
});

app.get('/about',(req,res)=>{
    res.render('about',hf)
})

app.get('/help',(req,res)=>{
    res.render('help',hf)
})

app.get('/predict',async(req,res)=>{
     await pycall();
     res.send('ok');
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Aravind',
        errorMessage:'Page not found :('
    })
})

app.post('/saveImage',(req,res)=>{

    if (!req.files){
        res.send("no file chosen for upload")
    }
    if(req.files){
        console.log(req.files);

        var file = req.files.file
        var filename = file.name;

        console.log(filename);

        

        file.mv(__dirname+'/../uploads/'+filename, function(err){
            if(err){
                res.send(err);
            }else{
                res.send("file uploaded");
            }
        })
    }
})


app.listen(port,()=>{
    console.log("listening on port: ",port);
})