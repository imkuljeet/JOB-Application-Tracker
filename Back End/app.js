const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Parses JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(cors()); // Enable CORS

app.post('/user/register',async(req,res,next)=>{
    const { name, email, password } = req.body;

    console.log(name,email,password);
})


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
