'use strict';

//app depend
require('dotenv').config();
const express=require('express');
const superagent=require('superagent');
const pg=require('pg');
const methodOverride=require('method-override');

//initialization
const app=express();
const PORT=process.env.PORT || 3000;
const pg = new pg.Client(process.env.Database_Url);

//use static files
app.use(express.static('./public'));

//set view engine
app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//listening on the port
client.connect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on port ${PORT}`);
    })    
})

/*************************************************************/

//test rout
// app.get('/hello',(req,res)=>{
//     res.send('HELLOOOOOOOOOOO');
// })

app.get('/' , getData);
app.get('/favourit' , renderFavorite);
app.get('/favorite' , getFavorite );
app.get('/thedetails/:dragon_id' , getDetails);
app.put('/update/:dragon_id' , getUpdates);
app.put('/delete/:dragon_id' , deleteDigimon);
/***********************FUNCTIONS******************/

function getData(req,res){

    let url='https://digimon-api.herokuapp.com/api/digimon'

    superagent.get(url)
    .then(result=>{
        let theDigimon= result.body.map(val=>{
          return new Digimon(val);
        })
        res.render('./index.ejs' , { digimons:theDigimon});
    })
.catch(error=> errorHandler(error,res));
}

/********************************/

function renderFavorite(req,res){
res.redirect('/favorite'); 
}

/********************************/

function getFavorite(req,res){
let mySql='SELECT * FROM myDigimon;';

return client.query(mySql)
.then(result=>{
    res.redirect('/favorite.ejs',{theDigimon:result.rows});
})
}

/********************************/

function getDetails (req,res){
    res.redirect('/details');
}

/******************************/

function getUpdates(req,res){

    let {name,img,level}=req.body;
    let mySql='UPDATE myDigimon SET name=$1,img=$2,level=$3 WHERE id=$4;';

    let Values=[name,img,level,dragon_id];
    return client.query(mySql,Values)
    .then(result=>{
        res.redirect('/');
    })
}


/*********************************/

function deleteDigimon(){

    let mySql='DELETE FROM myDigimon WHERE id=$1'
    let safeValues=[req.params.dragon_id];

    return client.query(mySql,safeValues)
    .then(result=>{
        res.redirect('/');
    })
}

/*********************************/
function Digimon(data){
    this.name= data.name;
    this.img=data.img;
    this.level=data.level;
}



app.use('*' , (req,res)=>{
    res.status(200).send('ERROR');
})

function errorHandle(error,res){
    if (res)
    res.render('an error has occured,please retry');
}
