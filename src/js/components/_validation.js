import validate from '../lib/jquery.form-validator.js';

$('.js-validation').each((index, el) => {
  $.validate({
    form: $(el)
    // validateOnBlur : false
  });
});
