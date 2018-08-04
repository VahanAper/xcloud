import express from 'express';

const app = express();

const port = process.env.port || 8080;
app.listen(port, function(){
    console.log(`Server is up and listens to port: ${port}`);
});
