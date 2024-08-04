const express = require('express');
const { specs, swaggerUi } = require('./swagger');
const connectDb = require('./config/db');
const apiKeyAuth = require('./auth/apiKeyAuth');
const jwtAuth = require('./auth/jwtAuth');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3001
connectDb();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(apiKeyAuth);

app.use("/auth", require("./routes/authRoute"));

app.use("/media", jwtAuth, require("./routes/mediaRoute"));

app.listen(port, ()=>
    console.log('Server started on port '+ port)
)
