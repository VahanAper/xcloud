import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/api';

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
});

app.use(bodyParser.json());

app.use('/api', router);

const port = process.env.port || 8080;
app.listen(port, function(){
    console.log(`Server is up and listens to port: ${port}`);
});
