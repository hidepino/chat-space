$(function(){
  $('.message-form').on('submit', function(e) {
    e.preventDefault();
    message = $('#upload-text').val();
    console.log(message);
  });
});
