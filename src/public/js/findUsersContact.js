function callFindUsers(element) {
  if (element.which === 13 || element.type === "click") {
    let keyword = $("#input-find-users-contact").val();
    let rexgexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);


    if(!keyword.length)
    {
      alertify.notify("Cần nhập đầy đủ thông tin vào ô tìm kiếm", "error", 7);
      return false;
    }
    if(!rexgexKeyword.test(keyword))
    {
      alertify.notify("Lỗi từ khóa tìm kiếm, chỉ cho phép nhập kí tự chữ và số, cho phép nhập khoảng trắng", "error", 7);
      return false;
    }

    $.get(`/contact/find-users/${keyword}`, function (data) {
      $("#find-user ul").html(data);
      addContact();
      removeRequestContact();
    }); 
  }
}

$(document).ready(function () {
  $("#input-find-users-contact").bind("keypress", callFindUsers);
  $("#btn-find-users-contact").bind("click", callFindUsers);
});