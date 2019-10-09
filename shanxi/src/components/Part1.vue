<template>
  <div class="part-1">
    <div class="part-1-1">
      <a href="#">
        <img src="../assets/part-1-1.jpg" alt="优势" />
      </a>
    </div>
    <div class="part-1-form">
      <div class="form-item">
        <div class="form-item-input">
          <i class="icon-phone"></i>
          <input type="number" v-model="mobile" placeholder="请输入您的移动号码" />
          <span class="get-code" @click="getCode" :class="{not: isNot}">{{codeText}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-input">
          <input type="number" v-model="validCode" placeholder="请输入验证码" />
        </div>
      </div>
      <div class="form-item">
        <button class="btn" @click="saveOrders">确认办理</button>
      </div>
    </div>
    <div class="msg" v-show="showDialog">
      <div class="content">{{msg}}</div>
    </div>
  </div>
</template>
<script>
import Api from "@/api";
const isPhone = tel => {
  const reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
  return reg.test(tel);
};
const getQuery = variable => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};
export default {
  data() {
    return {
      showDialog: false,
      isNot: false,
      codeText: "获取验证码",
      mobile: "",
      validCode: "",
      msg: "业务办理成功！",
      timer: null,
      countTimer: null,
      originUrl: 'test',
      isDisabled: false
    };
  },
  mounted() {
    this.originUrl = getQuery('t');
  },
  methods: {
    getCode() {
      let t = 60;
      if (!isPhone(this.mobile)) {
        this.showMsg("请输入您的移动号码");
        return;
      }
      const {mobile, originUrl} = this;
      if (this.isNot) return;
      this.isNot = true;
      this.codeText = `重新获取(${t})`;
      this.CountDown(t);
      this.sendCode({ mobile, originUrl });
    },
    sendCode(req) {
      Api.sendCode(req)
        .then(res => {
          if (res.code == 201) {
            this.clearCountTimer();
          }
          this.showMsg(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveOrders() {
      const { validCode, mobile, originUrl } = this;
      const req = { mobile: mobile, validCode, originUrl };

      if (validCode !== "" && isPhone(mobile)) {
        if(this.isDisabled) return;
        this.isDisabled = true;
        Api.saveOrders(req).then( res => {
            this.countLog(res,req)
        }).catch(err => {
          console.log(err);
          this.showMsg("业务办理失败");
        });
      } else {
        this.showMsg("请输入您的移动号码和验证码");
      }
    },
    countLog (result, value) {
      const callback = () => {
        result.code == 201 && this.clearCountTimer();
        this.showMsg(result.msg);
      };
      window.countLog ?  window.countLog.init(callback, value) : callback();
    },
    showMsg(msg) {
      this.showDialog = true;
      this.isDisabled = false;
      this.msg = msg;
      this.hideMsg();
    },
    hideMsg() {
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.showDialog = false;
      }, 3000);
    },
    CountDown(t) {
      this.countTimer = setInterval(() => {
        t--;
        if (t <= 0) {
          this.clearCountTimer();
        } else {
          this.codeText = `重新获取(${t})`;
        }
      }, 1000);
    },
    clearCountTimer() {
      clearInterval(this.countTimer);
      this.codeText = `获取验证码`;
      this.isNot = false;
    }
  }
};
</script>
<style scoped>
.part-1 {
  width: 715px;
  height: 820px;
  margin: 0 auto;
  background: url("../assets/part-1-bg.jpg") no-repeat 0 0;
  background-size: 100% 100%;
}
.part-1-1 {
  width: 613px;
  height: 369px;
  margin: 0 auto;
  padding-top: 62px;
}
.part-1-form {
  margin-top: 100px;
}
.form-item {
  width: 630px;
  margin: 0 auto;
}
.form-item-input {
  height: 90px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.msg {
  position: fixed;
  width: 450px;
  height: 140px;
  color: #333;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}
.msg .content {
  color: #fff;
  text-align: center;
  line-height: 140px;
}
.form-item .icon-phone {
  display: inline-block;
  width: 32px;
  height: 40px;
  background: url("../assets/icon-iphone.png") no-repeat;
  background-size: 100% 100%;
}
.form-item input {
  border: 0;
  width: 100%;
  height: 80px;
  font-size: 24px;
  padding-left: 20px;
  outline: none;
}
.form-item .get-code {
  display: block;
  font-size: 24px;
  width: 210px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  border-radius: 10px;
  background: #ff7b12;
  color: #fff;
}
.form-item .get-code.not {
  background: #999;
  pointer-events: none;
}
.btn {
  width: 629px;
  height: 90px;
  margin: 0 auto;
  margin-top: 40px;
  line-height: 90px;
  text-align: center;
  font-size: 44px;
  color: #fff;
  background: url("../assets/btn.png") no-repeat;
  background-size: 100% 100%;
  border: 0;
  outline: none;
}
</style>