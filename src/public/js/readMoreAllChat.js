$(document).ready(function () {
  $("#link-read-more-all-chat").bind("click", function () {
    let skipPersonal = $("#all-chat").find("li:not(.group-chat)").length;
    let skipGroup = $("#all-chat").find("li.group-chat").length;

    $("#link-read-more-contacts").css("display", "none");
    $(".lds-ripple-contacts").css("display", "inline-block");

    $.get(`/message/read-more-all-chat?skipPersonal=${skipPersonal}&skipGroup=${skipGroup}`, function (data) {

      if(data.leftSideData.trim() === ""){
        alertify.notify("Bạn không còn cuộc trò chuyện nào để xem nữa cả", "error", 7);
        $("#link-read-more-contacts").css("display", "inline-block");
        $(".lds-ripple-contacts").css("display", "none");
        return false;
      }

      //Step 01
      $("#all-chat").find("ul").append(data.leftSideData);

      //Step 02
      resizeNineScrollLeft();
      nineScrollLeft();

      //Step 03
      $("#screen-chat").append(data.rightSideData);

      //Step 04
      changeScreenChat();

      //Step 05
      convertEmoji();

      //Step 06
      $("body").append(data.imageModalData);

      //Step 07
      gridPhotos(5);

      //Step 08
      $("body").append(data.attachmentModalData);

      //Step 09
      socket.emit("check-status");
      
      $("#link-read-more-contacts").css("display", "inline-block");
      $(".lds-ripple-contacts").css("display", "none");
    });
  });
});