const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
<<<<<<< HEAD
    errors.text = "Description must be between 10 and 300 characters";
=======
    errors.text = "Post must be between 10 and 300 characters";
>>>>>>> cd7a337f463af43d453aae26bd439390b9917749
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text feild is required";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title feild is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
