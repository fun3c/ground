<template>
  <div class="part-3 flexBox">
    <div class="head"><img src="../assets/part-3-top.jpg" alt=""></div>
    <div class="content">
      <p>1. 成功办理本业务，订购首月送30元话费，话费立即可用，当月生效，优先于普通预存款适用，不可用于抵扣梦网、信息费。</p>
      <p>2. 办理成功后立即收费，流量立即可用，使用优先级低于套餐内流量。</p>
      <p>3. 当月包内所含剩余流量可以结转至次月使用，结转流量次月月底失效，不再结转。</p>
      <p>4. 已办理全国流量月包 30元5G的客户也可以参加本活动，但第二个月会收取两个流量的功能费，即收取60元，共享受10GB流量。</p>
      <p>5. 与限速流量套餐及优惠（除优享包外）互斥。</p>
      <p>6. 本产品仅适用于2、3、4G网络服务，使用范围不包含港澳台。</p>
    </div>
    <div class="foot"><img src="../assets/part-3-botm.jpg" alt=""></div>

    <!-- <div class="part-foot">
      <div class="qrcode">7bd9ff</div>
      <div class="qrcode-cont">
        <h3>更多套餐及流量优惠</h3>
        <p>扫一扫或长按保存关注公众号</p>
      </div>
    </div> -->
  </div>
</template>
<style scoped>
  .part-3 {
    margin-top: 20px;
  }
  .content {
    width: 100%;
    min-height: 200px;
    padding: 10px;
    background: url('../assets/part-3-mid.jpg') repeat-y top center;
    background-size: 100% 100%;
    margin-top: -3px;
  }
  .content > p {
    color: #00b0dd;
    padding: 5px 40px 5px 68px;
    font-size: 24px;

  }
  .foot {
    margin-top: -3px;
  }
  .part-foot {
    width: 660px;
    margin: 30px auto;
    display: flex;
    align-items: center;
    background: #7bd9ff;
    border-radius: 5px;
    min-height: 100px;
    color: #f1f1f1;
  }
  .qrcode {
    width: 35%;
  }
  .qrcode-cont {
    width: 65%;
  }
  .qrcode-cont > * {
    text-align: center;
    padding: 0 10px;
  }
  .qrcode-cont h3 {
    padding: 20px 0;
  }
  .qrcode-cont >p {
    padding: 0px 0 20px 0;
  }
</style>