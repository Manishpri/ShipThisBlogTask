const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const port       = process.env.PORT || 8080;
const userInfoRoute = require('./api/userInfo/userInfoRoute');
const blogInfoRoute = require('./api/blogInfo/blogInfoRoute'); 

const app        = express();

mongoose.connect("mongodb+srv://admin:AdminManish123@cluster0-kxtys.mongodb.net/shipthis?retryWrites=true&w=majority",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology : true 
}).then(()=>{
    console.log('Database connected successfully!!!');
}).catch(err=>{
    console.log('Connection failed' + err);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/user',userInfoRoute);
app.use('/api/blog',blogInfoRoute);

app.listen(port,()=>{
    console.log(`server is running mode on port ${port}`)
})
module.exports = app;