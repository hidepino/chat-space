$(function(){
  var input = $('#user-search-field')
  input.on('keyup', function(){
    var name = input.val();
    console.log(name)
  });
});
