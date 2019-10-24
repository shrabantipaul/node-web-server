var express=require('express');
var hbs=require('hbs');
var app=express();
var fs=require('fs')

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now} : ${req.method} ${req.url}`;
    console.log(log)
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('unable to append server.log')
        }
    })
    // console.log(req)
    next();
})

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs')
// })

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('show',(text)=>{
    return text.toUpperCase();
})
app.get('/',(req,res)=>{
    // res.send('<h1>hello express</h1>')
    res.render('home.hbs',{
        pageTitle:'home page',
        // currentYear:new Date().getFullYear()
        message:'welcome to home page'
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'about page',
        // currentYear:new Date().getFullYear()
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        error:'unable to handle request'
    })
})
app.listen(3000,()=>{
    console.log('running on port 3000')
})