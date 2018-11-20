$(function(){
  function buildhtml(message){
    var html = `<div class="message">
                  <div class="message__info">
                    <div class="message__info__username">
                      ${ message.user_name }
                    </div>
                    <div class="message__info__posttime">
                      ${ message.posttime }
                    </div>
                  </div>
                  <div class="message__detail">
                    ${message.body}
                  </div>
                </div>`
    return html;
  }

  function buildimage(message){
    var image = `<div class="message__image">
                  <img src=${message.image} width="200" height="100">
                </div>`
    return image;
  }


  $('.message-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      if (data.image != null || data.body != null){
        var html = buildhtml(data);
        $('.messages').append(html);
        if (data.image != null ){
          var image = buildimage(data);
          $('.message:last').append(image);
        };
        $('#upload-text').val('');
        $('#upload-icon').val('');
        $("#send-message").prop( 'disabled', false )
        $(function(){
          $(".messages").animate({
            scrollTop:$('.message:last').offset().top
          })
        });
      }
    })
    .fail(function(){
      alert('通信に失敗しました');
    })
  });

  // 自動更新
  $(function(){
    setInterval(update, 5000);
  });
  function update(){
    var message_id = $('.message:last').data('id');
    $.ajax({
      url:location.href,
      type: 'GET',
      data: { id: message_id };
      dataType: 'json',
      processData: false,
      contentType: false
    })
  }
});
