$(function(){
  var search_list = $("#user-search-result");

  function appendUser(user){
    var list =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`;
    search_list.append(list);
  }

  var input = $('#user-search-field');
  input.on('keyup', function(){
    var name = input.val();

    $.ajax({
      type: 'GET',
      url: "/users/search",
      data: { keyword: name },
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(users){
      // console.log(data)
      $(".chat-group-user").remove();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendNoUser("一致するユーザーはいませんでした。")
      }
    })
  });
});
