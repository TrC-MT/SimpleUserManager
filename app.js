const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.post('/newUser', (req, res) => {
    
})

app.post('/userEdit', (req, res) => {

})



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})