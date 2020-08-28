function callFindUsers(element) {
  if (element.which === 13 || element.type === "click") {
    let keyword = $("#input-find-users-contact").val();
    let rexgexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);


    if(!keyword.length)
    {
      alertify.notify("Can nhap day du thong tin vao o tim kiem", "error", 7);
      return false;
    }
    if(!rexgexKeyword.test(keyword))
    {
      alertify.notify("Loi tu khoa tim kiem, chi cho phep nhap ki tu chu va so, cho phep nhap khoang trang", "error", 7);
      return false;
    }

    $.get(`/contact/find-users/${keyword}`, function (data) {
      $("#find-user ul").html(data);
    }); 
  }
}

$(document).ready(function () {
  $("#input-find-users-contact").bind("keypress", callFindUsers);
  $("#btn-find-users-contact").bind("click", callFindUsers);
});