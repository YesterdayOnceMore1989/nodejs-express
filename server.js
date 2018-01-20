// const express = require('express');
// const hbs = require('hbs');
//
// var app = express();
//
// app.set('view engine', 'hbs');
// app.use(express.static(__dirname+'/public'));
// app.get('/', (req, res)=>{
//   //res.send('<h1>Hello Express Changed hehe</h1>');
//   res.send({
//     name: 'Andrew',
//     like: [
//       'banana',
//       'orange',
//       'apple'
//     ]
//   })
// });
//
//
// app.get('/about', (req,res)=>{
//   res.render('about.hbs', {
//     pageTitle: 'About page',
//     currentYear: new Date().getFullYear()
//   });
// })
//
//
// app.get('/bad', (req, res)=>{
//   res.send({
//     errorMessage: 'Unable to handle request'
//   })
// })
// app.listen(3000, ()=>{
//   console.log('Server is up on port 3000');
// });

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');



var app = express();


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})
app.set('view engine', 'hbs');


app.use((req, res, next)=>{
  var now = `${new Date().toString()} : ${req.method} ${req.url}`;
  fs.appendFile('server.log', now+'\n', (error)=>{
    if(error){
      console.log('Unable to connect server!');
    }
  });
  console.log(now);
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+'/public'));


app.get('/', (req, res)=>{
  res.render('home.hbs', {
    welcomemessage: 'Welcome to Code!',
    admin : 'Andrew Mead',

    pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'Page About'
  })
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.get('/help', (req, res)=>{
  res.render('help.hbs', {
    name: "Ho Duc Thanh De",
    wife: "Pham Thi Ngoc Tram",
    pageTitle: "Page Help"
  })
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
