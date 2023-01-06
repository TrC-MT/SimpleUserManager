
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const express = require('express');
const jsonfile = require('jsonfile');
const file = './users.json';
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
//======================================
app.get('/', (req, res) => { //When the client goes to localhost:3000
    res.sendFile(`${__dirname}/public/pages/index.html`); //Send them index_html
});
app.get('/newUser.html', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/newUser.html`)
})
//userListing down below
app.get('/userEdit.html', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/userEdit.html`)
})

//=================================================
app.post('/addUser', (req, res) => { //When the submit button is clicked in the newUser.html
    //Grab the values from the form
    const user_username = req.body.username;
    const user_name = req.body.name;
    const user_email = req.body.email;
    const user_age = req.body.age;

    console.log('user_username: ' + user_username)

    let user_count = 0;

    let data = jsonfile.readFileSync(file) //Read the users.json
    let array = data.users
    array.forEach(user => { //For each user in the object
        user_count += 1
    });
    console.log('user_count: ' + user_count)

    let new_user = {
        "id": `${user_count}`,
        "username": `${user_username}`,
        "name": `${user_name}`,
        "email": `${user_email}`,
        "age": `${user_age}`
    }; //Place those values into the new_user string object
    console.log('new_user: ' + new_user)

    data.users[user_count] = new_user; //Place the new_user into the next index of the users array

    console.log('data: ' + JSON.stringify(data))

    jsonfile.writeFileSync(file, data, {spaces: 2}) //Write the new object to users.json
    console.log('Written to file.')

    res.sendFile(`${__dirname}/public/pages/userListing.html`) //needs to emit get not just send the file !!!!!!!!!!!!!!!!!!!
}); //Closing app.post

//------------------------------------------------------
app.post('/editUser', (req, res) => { //When the submit button is clicked in the userEdit.html
    jsonfile.readFileSync(file).then((data) => {
        
    });

});
//-------------------------
app.get('/userListing.html', (req, res) => { //When the client goes to userListing
    jsonfile.readFileSync(file).then((data) => { //Read the users.json
        let array = data.users;
        let table = document.getElementById('userinformation');
        let new_HTML = `<tr><th>Username</th><th>Name</th><th>Email</th><th>Age</th><th>Edit</th><th>Delete</th></tr>`;
        array.forEach(user => { //For each user in the object
            //Rendering will go here
            //user.id, user.username, user.name, etc.
            new_HTML+= `<tr>
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td><button onclick="edit(${user.id})">EDIT</button></td>
            <td><button onclick="del(${user.id})">DELETE</button></td>`
        });
    });
});
//==================================

function edit(id){

}

function del(id){

}

//=============================================
app.listen(port, () => {
    console.log(`Listening on port ${port} \n`);
});

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
