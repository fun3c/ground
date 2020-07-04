$(function() {
    var arrinfo = ["谢谢参与"];
    var count = 3;
    var isLogin = 0;

    // init
    showLogin();
    complete().then(eraser);
    
    // 登录，用户信息
    function showLogin() {
      if (isLogin) {
        $(".user").html(
          '<span class="user-icon"></span> <span class="user-phone"></span>'
        );
      } else {
        $(".user").html('<span class="login">登录</span>');
      }
    }

    function isLoginHandle() {
        console.log('isLogin', isLogin)
      if (isLogin == 0) {
        $(".modal2").fadeIn();
      }
    }

    // 点击登录按钮
    $(".login").click(isLoginHandle);
    // 一键登录按钮
    $(".login-btn").click(function () {
        loginHandle().then(function (res) {
            if (res.code === 200) {
                var phoneNumber = res.data && res.data.number || '135xxxxxxxx';
              isLogin = 1;
              showLogin();
              $(".user-phone").text(phoneNumber);
              $(".modal2").fadeOut();
              eraser();
            //   complete().then(eraser);
            }
        });
    });
    function loginHandle () {
        return $.ajax({
          type: "post",
          url: "http://yjh.mmnum.com/znlj/bussniess/getPrize",
          dataType: "json",
        });
    }
    $(".center").find(".box").on("touchmove", isLoginHandle);

    
    // 刮奖
    function eraser() {
        if (isLogin == 0) return;
        if (count <= 0) {
        $("#layer").hide();
        $("#reset").hide();
        return;
        }
        $("#layer").eraser({
            size: 100, //设置橡皮擦大小
            completeRatio: 0.5, //设置擦除面积比例
            //大于擦除面积比例触发函数
            completeFunction: function() {
                if (count > 0) {
                     $("#reset").show();
                    // complete().then(function() {
                    //     $("#reset").show();
                    // })
                }
            },
        });
    }

    // 计算结果
    function complete() {
        var prize = getPrize(); 
        return prize.then(function (res) {
            if(res.code === 200) {
                isLogin = res.data.islogin;
                count = (res.data && res.data.num) || 0;
                var resultMsg = (res.data && res.data.desc) || arrinfo[0];
                $("#result").text(resultMsg);
                $(".count").html("您还有" + count + "次刮奖机会");
            }
        });
    }
    
    // 奖品结果
    function getPrize() {
        return $.ajax({
          type: "post",
          url: "http://yjh.mmnum.com/znlj/bussniess/getPrize",
          dataType: "json",
        });
    }
    // 
    $("#reset").click(function() {
        location.reload();
    })

    var modalText = [
      {
        title: "活动规则",
        content:
          " <p>一、7月3日-12月30日，用户进入活动页面，刮取奖品，有机会获得好礼。</p> <p>二、每位用户每天有1次参与机会。</p> <p>三、奖品包括话费劵（最高188元）；2G流量日包6折劵；5GB流量日包7折；100M流量日包赠送劵；500M流量日包赠送劵；1GB流量日包。</p>",
      },
      {
        title: "我的奖品",
        content: '<p class="tips">您还未中奖！</p>',
      },
    ];

    // 活动规则
    $("#btn1").click(function () {
        showModal(modalText[0]);
    });
    // 我的奖品
    $("#btn2").click(function () {
        if(isLogin == 1) {
            showModal(modalText[1]);
            return;
        }
        isLoginHandle();
    });

    function showModal(context) {
        var $modal = $(".modal");
        $modal.find(".title").html(context.title);
        $modal.find(".modal-body").html(context.content);
        $modal.fadeIn();
    }

    var $closeBtn = $(".modal").find(".close-btn");
    var $closeBtn2 = $(".modal2").find(".close-btn");
    $closeBtn.click(function () {
         $(".modal").fadeOut();
    });
    $closeBtn2.click(function () {
      $(".modal2").fadeOut();
    });
});