var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Định nghĩa các routes(IMPORTS)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var suppliersRouter = require('./routes/suppliers');
var employeesRouter = require('./routes/employees');
var customersRouter = require('./routes/customers');
var actionRouter = require('./routes/action');
var categoriesRouter = require('./routes/categories.file')

// Routes for writting in file


//test
const db = require('./config/db/index');
db.connect()


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json()); //khả năng xử lý với Json ( cần thiết)
app.use(express.urlencoded({ extended: false })); //Làm cho đường dẫn trở nên an toàn ( ví dụ dấu cách chuyển thành % vd: NGUYEN VAN -> NGUYEN%VAN)
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Đăng ký các routes vào express ( REGISTER ROUTERS)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/employees', employeesRouter);
app.use('/customers', customersRouter);
app.use('/action', actionRouter)
app.use('/categories', categoriesRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
