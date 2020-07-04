$(function() {
    var arrinfo = ["谢谢参与"];
    var count = 3;

    // init
    complete().then(eraser);
    
    function eraser() {
        console.log('count', count)
        if (count <= 0) {
            $("#layer").hide();
            $("#reset").hide();
            return;
        }
        $("#layer").eraser({
            size: 100, //设置橡皮擦大小
            completeRatio: 0.5, //设置擦除面积比例
            completeFunction: function() {
                if (count > 0) {
                    complete().then(function() {
                        $("#reset").show();
                    })
                }
            }, //大于擦除面积比例触发函数
        });
    }

    // 计算结果
    function complete() {
        var prize = getPrize(); 
        return prize.then(function (res) {
            if(res.code === 200) {
                var resultMsg = (res.data && res.data.desc) || arrinfo[0];
                count = (res.data && res.data.num) || 0;
               
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
          " 一、7月3日-12月30日，用户进入活动页面，刮取奖品，有机会获得好礼。<br/> 二、每位用户每天有1次参与机会。 <br/>三、奖品包括话费劵（最高188元）；2G流量日包6折劵；5GB流量日包7折；100M流量日包赠送劵；500M流量日包赠送劵；1GB流量日包。",
      },
      {
        title: "我的奖品",
        content: "暂无",
      },
      {
        title: "中奖结果",
        content: "",
      },
    ];

    // 活动规则
    $("#btn1").click(function () {
        showModal(modalText[0]);
    });
    // 我的奖品
    $("#btn2").click(function () {
        showModal(modalText[1]);
    });

    function showModal(context) {
        var $modal = $(".modal");
        $modal.find(".title").html(context.title);
        $modal.find(".modal-body").html(context.content);
        $modal.fadeIn();
    }

    var $closeBtn = $(".modal").find(".close-btn");
    $closeBtn.click(function () {
        $(".modal").fadeOut();
    });
});