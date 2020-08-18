export const transValidation = {
  email_incorrect: "Email phai co dinh dang abc@gmail.com",
  gender_incorrect: "Sai gioi tinh roi kia",
  password_incorrect: "Mat khau phai chua it nhat 8 ki tu, bao gom chu hoa chu thuong chu so va ki tu dac biet",
  password_confirmation_incorrect: "Mat khau xac nhan khong khop voi mat khau da nhap",
};

export const transErrors = {
  account_in_user : "Email nay da dc su dung",
  account_remove: "Tai khoan da bi xoa khoi he thong, vui long lien he voi bo phan ho tro",
  account_not_active: "Email da dc dang ki nhung chua kich hoat tai khoan, vui long kiem tra email cua ban hoac lien he voi bo phan ho tro",
  token_undefined : "Token khong ton tai",
};

export const tranSuccess = {
  userCreated : (userEmail) => {
    return `Tai khoan <strong>${userEmail}</strong> da duoc tao, vui long kiem tra email cua ban de kich hoat tai khoan`;
  },
  account_active: "Kich hoat tai khoan thanh cong, ban co the dang nhap vao ung dung"
};

export const tranMail = {
  subject: 'Awesome chat: Xac nhan kich hoat tai khoan!!!',
  template: (linkVerify) =>{
    return `
    <h2> Ban da nhan duoc email nay vi da dang ky tai khoan tren ung dung Awesome chat </h2>
    <h3> Vui long click vao lien ket ben duoi de kich hoat tai khoan truoc khi dang nhap </h3>
    <h3> <a href="${linkVerify}" target="_blank"> ${linkVerify} </a></h3>
    <h4> Neu email nay la nham lan, hay bo qua no</h4>
    `;
  },
  send_failed : 'Co loi trong qua trinh gui email, vui long lien he lai voi bo phan ho tro',
};