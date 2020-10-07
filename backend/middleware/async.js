/** 
 * @file This file defines a piece of middleware to be used in every route ...
 */

 /**
  * @module asyncHandler
  * @function 
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  * @param {Function} next - Express next middleware function
  * 
  */
 const asyncHandler = fn => (req, res, next) =>
 Promise.resolve(fn(req, res, next)).catch(next)

module.exports = asyncHandler;