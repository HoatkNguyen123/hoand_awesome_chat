$(document).ready(function () {
  $("#link-read-more-contacts-sent").bind("click", function () {
    let skipNumber = $("#request-contact-sent").find("li").length;

    $("#link-read-more-contacts-sent").css("display", "none");
    $(".lds-ripple-contacts").css("display", "inline-block");

    $.get(`/contact/read-more-contacts-sent?skipNumber=${skipNumber}`, function (newContactsUsers) {
      if (!newContactsUsers.length) {
        alertify.notify("Bạn không còn danh sách nào để xem nữa cả", "error", 7);
        $("#link-read-more-contacts-sent").css("display", "inline-block");
        $(".lds-ripple-contacts").css("display", "none");
        return false;
      }
      newContactsUsers.forEach(function (user) {
        $("#request-contact-sent")
          .find("ul")
          .append(`<li class="_contactList" data-uid="${user._id}">
                <div class="contactPanel">
                    <div class="user-avatar">
                        <img src="images/users/${user.avatar} " alt="">
                    </div>
                    <div class="user-name">
                        <p>
                            ${user.username}
                        </p>
                    </div>
                    <br>
                    <div class="user-address">
                        <span>&nbsp${(user.address !== null) ? user.address : ""} </span>
                    </div>
                    <div class="user-remove-request-contact action-danger display-important" data-uid="${user._id} ">
                        Hủy yêu cầu
                    </div>
                </div>
            </li>`);
      });
      removeRequestContact();
      $("#link-read-more-contacts-sent").css("display", "inline-block");
      $(".lds-ripple-contacts").css("display", "none");
    });
  });
});