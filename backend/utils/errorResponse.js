/**
 * @file This file serves simply as an helper function. Here it is defining how an error will be displayed in the console
 */

class ErrorResponse extends Error {
    // sends an error message with a status code
      constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    
        Error.captureStackTrace(this, this.constructor); // creates the 'stack' property on a Error instance
      }
    }
    
    // makes it accessible from error.js
    module.exports = ErrorResponse;