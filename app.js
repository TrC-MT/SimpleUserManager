
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const express = require('express');
const jsonfile = require('jsonfile');
const file = './users.json';
const app = express();
const port = 3000;
app.set('views', './public/pages');
app.set('view engine', 'pug');

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
//======================================
app.get('/', (req, res) => { //When the client goes to localhost:3000
    res.sendFile(`${__dirname}/public/pages/index.html`); //Send them index_html
});
app.get('/newUser', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/newUser.html`)
})

//=================================================
app.post('/addUser', (req, res) => { //When the submit button is clicked in the newUser.html
    //Grab the values from the form
    const user_username = req.body.username;
    const user_name = req.body.name;
    const user_email = req.body.email;
    const user_age = req.body.age;

    let user_count = 0;

    let data = jsonfile.readFileSync(file) //Read the users.json
    let array = data.users
    array.forEach(user => { //For each user in the object
        user_count += 1
    });

    let new_user = {
        "id": `${user_count}`,
        "username": `${user_username}`,
        "name": `${user_name}`,
        "email": `${user_email}`,
        "age": `${user_age}`
    }; //Place those values into the new_user string object


    data.users[user_count] = new_user; //Place the new_user into the next index of the users array

    jsonfile.writeFileSync(file, data, {spaces: 2}) //Write the new object to users.json

    res.redirect(`/userListing`)
    // window.location.replace(`${__dirname}/public/pages/userListing.html`)
}); //Closing app.post

//------------------------------------------------------

app.get('/userListing', (req, res) => { //When the client goes to userListing
    
    let data = jsonfile.readFileSync(file); //Read the users.json
    res.render(`${__dirname}/public/pages/userListing.pug`, {users: data.users})

});
//----------------
app.get('/userEdit/:id', (req, res) => {
    let id = req.params.id //get the id from the link
    let data = jsonfile.readFileSync(file); //Read the users.json
    let user_wanted = null;
    data.users.forEach(user => { //search for the wanted users from the id
        if(user.id == id){
            user_wanted = user;
        }
    })
    res.render(`${__dirname}/public/pages/userEdit.pug`, {user: user_wanted}) //send the info to pug
})
//-----
app.post('/editUser', (req, res) => { //When the submit button is clicked in the userEdit.pug
    //Grab the values from the form
    const user_username = req.body.username;
    const user_name = req.body.name;
    const user_email = req.body.email;
    const user_age = req.body.age;
    const user_id = req.body.id

    let edited_user = {
        "id": `${user_id}`,
        "username": `${user_username}`,
        "name": `${user_name}`,
        "email": `${user_email}`,
        "age": `${user_age}`
    }; //Place those values into the edited_user string object

    let data = jsonfile.readFileSync(file); //Read the users.json
    data.users[user_id] = edited_user; //Place the edited_user into the next index of the users array

    jsonfile.writeFileSync(file, data, {spaces: 2}) //Write the new object to users.json

    res.redirect(`/userListing`)

});
//-----------------------------------------
app.get('/userDelete/:id', (req, res) => {
    let id = req.params.id //get the id from the link
    let data = jsonfile.readFileSync(file); //Read the users.json
    let user_wanted = null;
    data.users.forEach(user => { //Search for the wanted user
        if(user.id == id){
            user_wanted = user;
        }
    })
    data.users = data.users.filter(check) //data will equal the data that passes the check function

    function check(currentValue){
        return currentValue != user_wanted //return the value if it's not equal to the user_wanted
    }

    jsonfile.writeFileSync(file, data, {spaces: 2}) //Write the new data to users.json
    res.redirect(`/userListing`)
});
//----
//==================================

app.listen(port, () => {
    console.log(`Listening on port ${port} \n`);
});

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
