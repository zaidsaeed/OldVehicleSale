const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};


  if (Validator.isEmpty(data.description)) {
    errors.email = "Text feild is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
