const express = require('express');
const path = require('path');
const Joi = require('joi');
const db = require('./database');
const app = express()


app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get("/feedback", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'feedback.html'));
})
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

app.post("/feedback", (req, res) => {
    
    input = req.body.feedback;

    if(input.match("'")){

    sql = 'SELECT * FROM rabits where Name = ' + input;

    db.query( sql , (err, result, fields) => {
        if (result) {
       res.send(result);
    }
    else {
        console.log(err)
        if(err.errno != 1222){ res.send(err.sqlMessage)}
        
        else{res.send('{errorno: ' +err.errno + '}')}
    }

    });
    }
    else
    {res.send('Sorry! You are not that VIP to use this functionality')}
})

app.get('/search', (req, res) => {
    input = req.query.search
    
   if(input.length >= 1 && input.match(/[a-z]/i) && !(input.match("'"))){
    res.send('Not Found');
    }
    else{
    res.send("You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '"+ req.query.search +"' at line 37 ")
}})

app.post('/login', (req, res) => {
  
    setTimeout(function() {
        res.send('Invalid Username or Password');
    }, 3000);
   // res.send(req.body)
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found. Bas kr sohnya bs kar</h1>');
  });
    

app.listen(3000)