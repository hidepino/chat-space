$(function(){
  $(document).on('turbolinks:load', function(){
    var search_list = $("#user-search-result");

    function appendUser(user){
      var list =`<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
      search_list.append(list);
    }

    function appendNoUser(word){
      var list =`<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${word}</p>
                </div>`;
      search_list.append(list);
    }

    var chatmember = $("#chat-group-users");

    function appendChatmenber(user_name, user_id){
      var list = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`;
      chatmember.append(list);
    }

    var input = $('#user-search-field');
    input.on('keyup', function(){
      var name = input.val();
      $('#user-search-result').empty();

      $.ajax({
        type: 'GET',
        url: "/users",
        data: { keyword: name },
        dataType: 'json',
        contentType: false
      })
      .done(function(users){
        if (users.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          });
        } else {
          appendNoUser("一致するユーザーはいませんでした。")
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      })
    });
      search_list.on("click", ".chat-group-user__btn--add", function(){
        var add_btn = $(this);
        var index = add_btn.index(this);
        var user_name = add_btn.eq(index).attr("data-user-name");
        var user_id = add_btn.eq(index).attr("data-user-id");
        appendChatmenber(user_name, user_id);
        $(this).parent().remove();
        $("#user-search-field").val('');
      })
      chatmember.on("click", ".js-remove-btn", function(){
        var index = $(this).index(this);
        $(this).parent().eq(index).remove();
      })
  });
});
