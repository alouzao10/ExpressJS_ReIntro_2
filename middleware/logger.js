// Can create and then import middleware functions globally

// Create custom Middleware function(s)
const logger = (req, res, next) => {
  console.log('Logging...' + Date());
  console.log(
    'Request Made at: ' + req.protocol + '://' + req.get('host') + req.path
  );
  next();
};

module.exports = logger;
