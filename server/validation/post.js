const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  console.log(data);
  data.text = !isEmpty(data.description) ? data.description : "";

  if (!Validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.description)) {
    errors.email = "Text feild is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
