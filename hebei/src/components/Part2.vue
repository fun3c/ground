<template>
  <div class="part-2 flexBox">
    <div class="form-wrapper">
      <div class="form-item form-label">
        <input type="number" class="form-text text-max" placeholder="请输入领取的手机号码" v-model="mobile" />
      </div>

      <div class="form-item form-label sub-form-label">
        <input type="number" class="form-text" placeholder="请输入验证码" v-model="validCode" />
        <div class="get-code" @click="getCode" :class="{not: isNot}">{{codeText}}</div>
      </div>

      <div class="form-item"><button class="submit-btn" @click="saveOrders">确认办理</button></div>
    </div>

    <div class="msg" v-show="showDialog">
      <div class="content">{{msg}}</div>
    </div>
  </div>
</template>
<script>
import Api from "@/api";
import { isPhone, getQuery } from './common';
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
      this.codeText = `重新获取(${t})s`;
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
          this.showMsg("系统异常，请稍后再试！");
        });
      } else {
        this.showMsg("请输入您的移动号码和验证码");
        this.isDisabled = false;
      }
    },
    countLog (result, value) {
      const callback = () => {
        result.code == 201 && this.clearCountTimer();
        this.showMsg(result.msg);
      };
      if(result.code == 200) {
        window.countLog ?  window.countLog.init(callback, value) : callback();
      } else {
        callback()
      }
      this.isDisabled = false;
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
          this.codeText = `重新获取(${t})s`;
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
  .part-2 {
    width: 750px;
    margin: 0 auto;
  }
  .form-item {
    width: 660px;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 20px;
  }
  .form-label {
    background: #e0f7ff;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  .form-text {
    height: 82px;
    border: 0;
    line-height: 82px;
    background: none;
    border-radius: 5px;
    font-size: 26px;
    padding-left: 20px;
  }
  .text-max {
    width: 100%;
  }
  .sub-form-label {
    margin-top: 30px;
    display: flex;
    align-items: center;
  }
  .sub-form-label .form-text {
    width: 60%;
  }
  .get-code {
    width: 40%;
    height: 100%;
    text-align: center;
    color: #3d3d3d;
    font-size: 26px;
    border-left: 1px solid #b0b6af;
  }

  .submit-btn {
    width: 100%;
    height: 82px;
    background: #fff600;
    color: #ed4e00;
    border: 0;
    border-radius: 5px;
    font-size: 32px;
    font-size: 400;
    margin-top: 10px;
  }
</style>