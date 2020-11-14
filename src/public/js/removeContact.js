
function removeContact() {
  $(".user-remove-contact").unbind("click").on("click", function () {
    let targetId = $(this).data("uid");
    let username = $(this).parent().find("div.user-name p").text();
    Swal.fire({
      title: `Bạn có chắc chắn muốn xóa ${username} khỏi danh bạ?`,
      text: "Không thể hoàn tác lại quá trình này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2ECC71',
      cancelButtonColor: '#ff7675',
      confirmButtonText: 'Xác nhận',
      cancelmButtonText: 'Hủy'
    }).then((result) => {
      if (!result.value) {
        return false;
      }
      $.ajax({
        url: "/contact/remove-contact",
        type: "delete",
        data: { uid: targetId },
        success: function (data) {
          if (data.success) {
            $("#contacts").find(`ul li[data-uid="${targetId}"]`).remove();
            decreaseNumberNotifyContact("count-contacts");
            socket.emit("remove-contact", { contactId: targetId });

            //Step 00
            let checkActive = $("#all-chat").find(`li[data-chat = ${targetId}]`).hasClass("active");

            //Step 01
            $("#all-chat").find(`ul a[href= "#uid_${targetId}"]`).remove();
            $("#user-chat").find(`ul a[href= "#uid_${targetId}"]`).remove();

            //Step 02
            $("#screen-chat").find(`div#to_${targetId}`).remove();

            //Step 03
            $("body").find(`div#imagesModal_${targetId}`).remove();

            //Step 04
            $("body").find(`div#attachmentsModal_${targetId}`).remove();

            //Step 05
            if(checkActive){
              $("ul.people").find("a")[0].click();
            }
  
          }
        }

      });
    });
  })
}



socket.on("response-remove-contact", function (user) {
  $("#contacts").find(`ul li[data-uid="${user.id}"]`).remove();
  decreaseNumberNotifyContact("count-contacts");

   //Step 00
   let checkActive = $("#all-chat").find(`li[data-chat = ${user.id}]`).hasClass("active");

  //Step 01
  $("#all-chat").find(`ul a[href= "#uid_${user.id}"]`).remove();
  $("#user-chat").find(`ul a[href= "#uid_${user.id}"]`).remove();

  //Step 02
  $("#screen-chat").find(`div#to_${user.id}`).remove();

  //Step 03
  $("body").find(`div#imagesModal_${user.id}`).remove();

  //Step 04
  $("body").find(`div#attachmentsModal_${user.id}`).remove();

  //Step 05
  if(checkActive){
    $("ul.people").find("a")[0].click();
  }

});

$(document).ready(function () {
  removeContact();
})
