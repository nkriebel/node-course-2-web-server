const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;


let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use((req, res, next) => {
    let now = new Date().toString();

    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
//    res.send('<h1>Hello, Express</h1>'); 
    res.render('home.hbs', {
        pageTitle: 'Home Page, duh...',
        welcomeMessage: 'Welcome to a review of Handlebars template views'
    });
});

app.get('/projects', (req, res) => {
        res.render('projects.hbs', {
            pageTitle: 'Projects Page',
            welcomeMessage: 'Here will be a list of projects and/or links for viewing them' //May need to break this out on to actual page
        });
    });

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   }); 
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
