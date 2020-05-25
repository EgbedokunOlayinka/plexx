const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const multer = require('multer');
const cors = require('cors');

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() =>{
    console.log(`Database connected successfully`);
}).catch((err) =>{
    console.log(`Database connection error`, err)
});

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Routes
const userRoute = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const wholesalerRoutes = require('./routes/wholesalerRoutes');
const consumerRoutes = require('./routes/consumerRoutes')

app.use('/api/v1', userRoute);
app.use('/api/v1', adminRoutes);
app.use('/api/v1', wholesalerRoutes);

app.get('/', (req, res) =>{
    res.send('Everything online e-commerce application')
});

// Express Server 
port = process.env.PORT
app.listen(port, () =>{
    console.log(`Server running on PORT: ${port}`)
});