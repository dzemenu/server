const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const packageRoute = require('./route/package.route');
const deliveryRoute = require('./route/delivery.route');
const userRoute = require('./route/user.route');
const { setupWebSocket } = require('./controller/package.contorller');

const server = http.createServer(app);
setupWebSocket(server);


app.use(express.json());
app.use(cors(
    {
        credentials: true,
        origin: ['*']
    }
));
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/gozem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
app.use('/api/package', packageRoute)
app.use('/api/delivery', deliveryRoute)
app.use('/api/user', userRoute)
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.send('Hello World!');
})
