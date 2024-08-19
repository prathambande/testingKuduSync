const express = require('express');
const app = express();

app.get('/', 
    (request,response) => {
        console.log("Hit in /");
        response.send("Hey There, you with Expressssssssssssoo");
    }
)

app.get('/csea', 
    function(req,res){
        console.log("Hit in /csea");
        const content = `
            <body style="background-color:black; color: yellow">
                <h1>CSEA Backend</h1>
            </body>
        `
        res.send(content);
    }
)

const port = 8080;

app.listen(port, () => {
    console.log(`Server is Listening at http://localhost:${port}`);
    }
);

