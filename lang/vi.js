export const transValidation = {
  email_incorrect: "Email phải có định dạng abc@gmail.com",
  gender_incorrect: "Giới tính có vấn đề, bạn là hacker chăng?",
  password_incorrect: "Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm chữ hoa chữ thường chữ số và kí tự đặc biệt",
  password_confirmation_incorrect: "Mật khẩu xác nhận không trùng khớp với mật khẩu mới",
  update_username: "Tên người dùng giới hạn từ 3-17 kí tự, không được chứa kí tự đặc biệt",
  update_gender: "Giới tính có vấn đề, bạn là hacker chăng?",
  update_address: "Địa chỉ giới hạn từ 3-30 kí tự",
  update_phone: "Số điện thoại bắt đầu từ số 0 và giới hạn từ 10-11 kí tự",
  keyword_find_user: "Lỗi từ khóa tìm kiếm, chỉ cho phép kí tự chữ cái và chữ số, cho phép khoảng trắng",
  message_text_emoji_incorrect: "Tin nhắn không hợp lệ. Tối thiểu là 1 kí tự, tối đa là 400 kí tự",
  add_new_group_user_incorrect: "Vui lòng chọn bạn bè để thêm vào nhóm, tối thiểu là 2 người",
  add_new_group_name_incorrect: "Vui lòng nhập tên cuộc trò chuyện giới hạn từ 5 đến 30 kí tự và không chứa kí tự đặc biệt"
};

export const transErrors = {
  account_in_user: "Email này đã được sử dụng",
  account_remove: "Tài khoản đã bị xóa khỏi hệ thống, vui lòng liên hệ với bộ phận hỗ trợ",
  account_not_active: "Email đã được đăng kí nhưng chưa kích hoạt tài khoản, vui lòng kiểm tra email của bạn hoặc liên hệ với bộ phận hỗ trợ",
  account_undefined: "Tài khoản không tồn tại",
  token_undefined: "Token không tồn tại",
  login_failed: "Sai tài khoản hoặc mật khẩu",
  server_error: "Có lỗi trên hệ thống, vui lòng liên hệ bộ phận hỗ trợ. Xin cảm ơn",
  avatar_type: "Kiểu file upload không hợp lệ, chỉ chấp nhận những file .jpg hoặc png",
  avatar_size: "Ảnh upload tối đa là 1MB",
  user_current_password: "Mật khẩu hiện tại không chính xác",
  conversation_notfound: "Cuộc trò chuyện không tồn tại",
  image_message_type: "Kiểu file upload không hợp lệ, chỉ chấp nhận những file .jpg hoặc png",
  image_message_size: "Ảnh upload tối đa là 1MB",
  attachment_message_size: "Tệp đính kèm upload tối đa là 1MB"

};

export const tranSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email của bạn để kích hoạt tài khoản`;
  },
  account_active: "Kích hoạt tài khoản thành công, bạn có thể đăng nhập vào ứng dụng",
  loginSuccess: (username) =>{
    return `Xin chào ${username}, chúc bạn một ngày vui vẻ và tốt lành`;
  },
  logoutSuccess: "Đăng xuất tài khoản thành công",
  user_info_updated: "Cập nhật thông tin cá nhân thành công",
  user_password_updated: "Cập nhật mật khẩu thành công",
};

export const tranMail = {
  subject: 'Awesome chat: Xác nhận kích hoạt tài khoản',
  template: (linkVerify) => {
    return `
    <h2> Bạn nhận được email này vì đã đăng kí tài khoản trên ứng dụng Awesome chat </h2>
    <h3> Vui lòng nhấp vào liên kết bên dưới để kích hoạt tài khoản và đăng nhập </h3>
    <h3> <a href="${linkVerify}" target="_blank"> ${linkVerify} </a></h3>
    <h4> Nếu email này là nhầm lẫn, xin hãy bỏ qua nó, xin cảm ơn</h4>
    `;
  },
  send_failed: 'Có lỗi trong quá trình gửi email, vui lòng liên hệ bộ phận hỗ trợ, xin cảm ơn',
};