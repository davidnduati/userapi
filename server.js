const express = require('express')

let users = require('./data')

const app = express();
app.use(express.json())

//welcoming user
app.get('/', (req,res)=>{
    res.send("welcome to the api")
});

//getting  all users

app.get('/users', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            messege: "this looks very nice",
            results: users

        })
    } catch (error) {
        console.log(error)
    }

});

//getting a single user
app.get('/users/:id', (req,res)=>{
    const id = req.params.id;
    const index = users.find((user) => user.id === Number(id))
    try{
        res.status(200).json({
            results:index
        })
    }catch (error){
        console.log(error)
    }
    
})

//signing up new user

app.post('/users', (req, res) => {
    try {
        users.push(req.body);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});


// login a user


app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { password, email } = req.body
    const index = users.findIndex((users) => users.id === Number(id));

    if (index !== -1) {
        users[index] = {
            ...users[index],
             password, email,
        };
        res.status(200).json({
            success: true,
            message: " success",
            results: users[index]
        })
    }
    else {
        res.status(404).json({
            success: false,
            message: "not found"
        })
    }

});

// deletin a user

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const index = users.findIndex((user) => user.id === Number(id));
    if (index !== -1) {
        let deletedUser = users.splice(index, 1);
        res.status(200).json({
            success: true,
            message: "delete success",
            results: deletedUser
        });
    } else {
        res.status(404).json({
            success: false,
            message: "not found"
        });
    }
});



const port = 4002;
app.listen(port, () => console.log`the server is running on port:${port}`)
