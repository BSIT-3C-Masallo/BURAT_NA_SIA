const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parsere');
const logger = require('morgan');
const mongoose = require('mongoos'); // Import Mongoose
var session=require('express-session');
// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const quizProtoRoutes = require('./routes/quizProtoPageRoutes');
const aboutUsRouter = require('./routes/aboutUsRoutes');
const infoGenKnowledgeRouter = require('./routes/infoGenKnowledgeRoutes');
const loginRouter = require('./routes/loginRoutes');
const registerRouter = require('./routes/registerRoutes');
const leaderBoardRouter = require('./routes/leaderBoardRoutes');
const mongoDbConnectionRouter = require('./routes/mongoDbConnectionRoutes'); // New route for MongoDB

const app = express();

// MongoDB Connection URI and Options
mongoose.connect('mongodb+srv://jef26:Siaquiz@quiz.7ppwj.mongodb.net/?retryWrites=true&w=majority&appName=QUIZ', {
}).then(
  () => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key', // Replace with a secure key
  resave: false, // Prevents resaving unchanged sessions
  saveUninitialized: true, // Save uninitialized sessions
  cookie: { secure: false } // Set secure: true in production with HTTPS
}));

// Use routes
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/AboutUs', aboutUsRouter);
app.use('/infoGenKnowledge', infoGenKnowledgeRouter);
app.use('/quizProtoPage', quizProtoRoutes);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/leaderBoard', leaderBoardRouter);
app.use('/mongoDbConnection', mongoDbConnectionRouter); // Route for MongoDB connection test

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
