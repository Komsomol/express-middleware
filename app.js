const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const router = require('./routes');
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(router);

app.post('/video/',(req,res,next) => {
    console.log(req.body);
    if (req.body.video) {
        console.log('yes');
        res.redirect('/video/' + req.body.video);
    }
});

app.use('/video/:id', (req, res, next) => {
    console.log('intercept');
    console.log(req.params.id);
    if (req.params.id) {
        res.render('video', {
            video: req.params.id
        });
    } else {

        next();
    }
});

app.use((req,res, next)=>{
    console.log('render');
    res.render('index',{
        status: 'Paste a youtube ID',
        sample: 'M9RcdLCJkw4'
    });
});

app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});