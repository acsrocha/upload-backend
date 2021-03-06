require('dotenv').config();
const path = require('path');
const  express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
// com o cors() podemo fazer restrições à dominios indesejados
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
// acesso local da pasta estática das imagens
app.use('/files', 
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);
app.use(require('./routes'));
app.listen(process.env.PORT || 4000);