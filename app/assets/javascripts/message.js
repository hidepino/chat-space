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
      console.log(data.image)
      var html = buildhtml(data);
      $('.messages').append(html);
      if (data.image != null ){
        var image = buildimage(data);
        $('.message:last').append(image);
      };
      $('#upload-text').val('');
      // $(function(){
      //   $(".messages").animate({
      //     scrollTop: $('.messages')[bottom-message].scrollHeight
      //   })
      // });
    })
  });
});
