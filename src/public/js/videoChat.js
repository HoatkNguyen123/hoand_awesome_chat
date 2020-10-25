function videoChat(divId) {
  $(`#video-chat-${divId}`).unbind("click").on("click", function () {
    let targetId = $(this).data("chat");
    let callerName = $("#navbar-username").text();

    let dataToEmit = {
      listenerId: targetId,
      callerName: callerName
    };
    //Step 01
    socket.emit("caller-check-listener-online-or-offline", dataToEmit);
  });
}

function playVideoStream(videoTagId, stream) {
  let video = document.getElementById(videoTagId);
  video.srcObject = stream;
  video.onloadeddata = function () {
    video.play();
  }
}

function closeVideoStream(stream) {
  return stream.getTracks().forEach(function (track) {
    track.stop();
  })
}

$(document).ready(function () {
  //Step 02
  socket.on("server-send-listener-is-offline", function () {
    alertify.notify("Người dùng này hiện không trực tuyến");
  });

  let iceServerList = $("#ice-server-list").val();

  let getPeerId = "";

  const peer = new Peer({
    key: "peerjs",
    host: "peerjs-server-trungquandev.herokuapp.com",
    secure: true,
    port: 443,
    config: {"iceServers" : JSON.parse(iceServerList)}
    // debug: 3
  });

  peer.on("open", function (peerId) {
    getPeerId = peerId;
  });

  //Step 03
  socket.on("server-request-peer-id-of-listener", function (response) {

    let listenerName = $("#navbar-username").text();
    let dataToEmit = {
      callerId: response.callerId,
      listenerId: response.listenerId,
      callerName: response.callerName,
      listenerName: listenerName,
      listenerPeerId: getPeerId
    };

    //Step 04
    socket.emit("listener-emit-peer-id-to-server", dataToEmit);
  });

  let timerInterval;
  //Step 05

  socket.on("server-send-peer-id-of-listener-to-caller", function (response) {

    let dataToEmit = {
      callerId: response.callerId,
      listenerId: response.listenerId,
      callerName: response.callerName,
      listenerName: response.listenerName,
      listenerPeerId: response.listenerPeerId
    };

    //Step 06

    socket.emit("caller-request-call-to-server", dataToEmit);
    Swal.fire({
      title: `Đang gọi cho &nbsp; <span style = "color:#2ECC71;">${response.listenerName}</span> &nbsp; <i class = "fa fa-volume-control-phone"></i>`,
      html: `
      Thời gian: <strong style = "color:#d43f3a;"> </strong> giây <br/> <br/>
      <button id="btn-cancel-call" class ="btn btn-danger"> Hủy cuộc gọi </button>
      `,
      backdrop: 'rgba(85,85,85,0.4)',
      width: '52rem',
      allowOutsideClick: false,
      timer: 30000,
      onBeforeOpen: () => {
        $("#btn-cancel-call").unbind('click').on('click', function () {
          Swal.close();
          clearInterval(timerInterval);
          //Step 07
          socket.emit("caller-cancel-request-call-to-server", dataToEmit);
        });
        if (Swal.getContent().querySelector !== null) {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft() / 1000);
          }, 1000);
        }
      },
      onOpen: () => {
        //Step 12
        socket.on("server-send-reject-call-to-caller", function (response) {
          Swal.close();
          clearInterval(timerInterval);
          Swal.fire({
            type: "info",
            title: `<span style = "color:#2ECC71;">${response.listenerName}</span> &nbsp; hiện tại không thể nghe máy`,
            backdrop: 'rgba(85,85,85,0.4)',
            width: '52rem',
            allowOutsideClick: false,
            confirmButtonColor: "#2ECC71",
            confirmButtonText: "Xác nhận"
          });
        });


      },
      onClose: () => {
        clearInterval(timerInterval);
      }
    }).then(result => {
      return false;
    });

  });

  //Step 08

  socket.on("server-send-request-call-to-listener", function (response) {
    let dataToEmit = {
      callerId: response.callerId,
      listenerId: response.listenerId,
      callerName: response.callerName,
      listenerName: response.listenerName,
      listenerPeerId: response.listenerPeerId
    };
    Swal.fire({
      title: `<span style = "color:#2ECC71;">${response.callerName}</span> &nbsp; muốn trò chuyện video với bạn &nbsp; <i class = "fa fa-volume-control-phone"></i>`,
      html: `
      Thời gian: <strong style = "color:#d43f3a;"> </strong> giây <br/> <br/>
      <button id="btn-reject-call" class ="btn btn-danger"> Từ chối </button>
      <button id="btn-accept-call" class ="btn btn-success"> Đồng ý </button>
      `,
      backdrop: 'rgba(85,85,85,0.4)',
      width: '52rem',
      allowOutsideClick: false,
      timer: 30000,
      onBeforeOpen: () => {
        $("#btn-reject-call").unbind('click').on('click', function () {
          Swal.close();
          clearInterval(timerInterval);
          //Step 10 
          socket.emit("listener-reject-request-call-to-server", dataToEmit);
        });

        $("#btn-accept-call").unbind('click').on('click', function () {
          Swal.close();
          clearInterval(timerInterval);
          //Step 11
          socket.emit("listener-accept-request-call-to-server", dataToEmit);
        });

        if (Swal.getContent().querySelector !== null) {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft() / 1000);
          }, 1000);
        }
      },
      onOpen: () => {
        //Step 09
        socket.on("server-send-cancel-request-call-to-listener", function (response) {
          Swal.close();
          clearInterval(timerInterval);
        });

      },
      onClose: () => {
        clearInterval(timerInterval);
      }
    }).then(result => {
      return false;
    });

  });

  //Step 13
  socket.on("server-send-accept-call-to-caller", function (response) {
    Swal.close();
    clearInterval(timerInterval);
    let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);

    getUserMedia({ video: true, audio: true }, function (stream) {

      $("#streamModal").modal("show");

      playVideoStream("local-stream", stream);

      let call = peer.call(response.listenerPeerId, stream);

      call.on('stream', function (remoteStream) {
        playVideoStream("remote-stream", remoteStream);
      });

      $("#streamModal").on("hidden.bs.modal", function () {
        closeVideoStream(stream);
        Swal.fire({
          type: "info",
          title: `Đã kết thúc cuộc gọi với &nbsp;<span style = "color:#2ECC71;">${response.listenerName}</span>`,
          backdrop: 'rgba(85,85,85,0.4)',
          width: '52rem',
          allowOutsideClick: false,
          confirmButtonColor: "#2ECC71",
          confirmButtonText: "Xác nhận"
        });
      });

    }, function (err) {
      if(err.toString() === "NotAllowedError: Permission denied"){
        alertify.notify("Xin lỗi bạn đã tắt quyền truy cập thiết bị nghe gọi trên trình duyệt, vui lòng mở lại trong phần cài đặt của trình duyệt", "error", 7);
      }

      if(err.toString() === "NotFoundError: Requested device not found"){
        alertify.notify("Xin lỗi chúng tôi không tìm thấy thiết bị nghe gọi trên máy tính của bạn", "error", 7);
      }
    });
  });

  //Step 14
  socket.on("server-send-accept-call-to-listener", function (response) {
    Swal.close();
    clearInterval(timerInterval);

    let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);

    peer.on('call', function (call) {
      getUserMedia({ video: true, audio: true }, function (stream) {

        $("#streamModal").modal("show");

        playVideoStream("local-stream", stream);

        call.answer(stream);

        call.on('stream', function (remoteStream) {
          playVideoStream("remote-stream", remoteStream);
        });

        $("#streamModal").on("hidden.bs.modal", function () {
          closeVideoStream(stream);
          Swal.fire({
            type: "info",
            title: `Đã kết thúc cuộc gọi với &nbsp;<span style = "color:#2ECC71;">${response.callerName}</span>`,
            backdrop: 'rgba(85,85,85,0.4)',
            width: '52rem',
            allowOutsideClick: false,
            confirmButtonColor: "#2ECC71",
            confirmButtonText: "Xác nhận"
          });
        });

      }, function (err) {
        if(err.toString() === "NotAllowedError: Permission denied"){
          alertify.notify("Xin lỗi bạn đã tắt quyền truy cập thiết bị nghe gọi trên trình duyệt, vui lòng mở lại trong phần cài đặt của trình duyệt", "error", 7);
        }

        if(err.toString() === "NotFoundError: Requested device not found"){
          alertify.notify("Xin lỗi chúng tôi không tìm thấy thiết bị nghe gọi trên máy tính của bạn", "error", 7);
        }
        
      });
    });


  });

});