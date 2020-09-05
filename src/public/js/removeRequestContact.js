
function removeRequestContact() {
  $(".user-remove-request-contact").bind("click", function () {
    let targetId = $(this).data("uid");
    $.ajax({
      url: "/contact/remove-request-contact",
      type: "delete",
      data: { uid: targetId },
      success: function (data) {
        if (data.success) {
          $("#find-user").find(`div.user-remove-request-contact[data-uid = ${targetId}]`).hide();
          $("#find-user").find(`div.user-add-new-contact[data-uid = ${targetId}]`).css("display", "inline-block");
          decreaseNumberNotifyContact("count-request-contact-sent");
          $("#request-contact-sent").find(`li[data-uid = ${targetId}]`).remove();
          socket.emit("remove-request-contact", {contactId: targetId});
        }
      }

    });
  })
}



socket.on("response-remove-request-contact", function (user) {

  $(".noti_content").find(`div[data-uid = ${user.id}]`).remove();

  $("ul.list-notifications").find(`li>div[data-uid = ${user.id}]`).parent().remove();
  $("#request-contact-received").find(`li[data-uid = ${user.id}]`).remove();
  decreaseNumberNotifyContact("count-request-contact-received");
  decreaseNumberNotifycation("noti_contact_counter", 1);
  decreaseNumberNotifycation("noti_counter", 1);

});
