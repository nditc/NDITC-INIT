require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const db = require('./models');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use('*', (req, res, next) => {
  console.log(req.url);
  next();
});

//cors
const whitelist = process.env.REMOTE_CLIENT_APP.split(',');
console.log(whitelist);
const corOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corOptions));

app.use('/uploads', express.static(__dirname + '/uploads'));
//middlewares
app.use(express.json());
app.use(cookieParser('secret'));

//routers
const adminRouter = require('./routers/admin');
const galleryRouter = require('./routers/gallery');
const eventsRouter = require('./routers/events');
const adminActionRouter = require('./routers/adminAction');
const qrScannerRouter = require('./routers/qrScanner');
const contactRouter = require('./routers/contact');
const noticeRouter = require('./routers/notices');
const clientRouter = require('./routers/clients');
const faqRouter = require('./routers/faq');
const sponsorRouter = require('./routers/Sponsors');

app.use('/api/admin', adminRouter);
app.use('/api/admin/gallery', galleryRouter);
app.use('/api/events', eventsRouter);
app.use('/api/adAction', adminActionRouter);
app.use('/api/qr', qrScannerRouter);
app.use('/api/contact', contactRouter);
app.use('/api/notice', noticeRouter);
app.use('/api/client', clientRouter);
app.use('/api/faq', faqRouter);
app.use('/api/sponsor', sponsorRouter);

//notfound and errors
const errorHandlerMiddleWare = require('./middlewares/errorHandler');
const notFoundMiddleWare = require('./middlewares/notFound');
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

//ports and start
const PORT = process.env.PORT || 8001;
db.sequelize
  .sync()
  .then((_) => {
    console.log(`database connected`);
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
