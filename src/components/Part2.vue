<template>
  <div class="part-2 flexBox">
    <div class="head">
      <div class="title">共享定向流量APP</div>
    </div>
    <div class="content">
      <ul class="list">
        <li class="item">
          <a href="#">
            <img src="../assets/douyin.png" alt="">
            <div class="name">抖音</div>
          </a>
        </li>
        <li class="item">
          <a href="#">
          <img src="../assets/toutiao.png" alt="">
          <div class="name">今日头条</div>
          </a>
        </li>
        <li class="item">
          <a href="#">
          <img src="../assets/qqv.png" alt="">
          <div class="name">腾讯视频</div>
          </a>
        </li>
        <li class="item">
          <a href="#">
          <img src="../assets/youku.png" alt="">
          <div class="name">优酷</div>
          </a>
        </li>
        <li class="item">
          <a href="#">
          <img src="../assets/iqiyi.png" alt="">
          <div class="name">爱奇艺</div>
          </a>
        </li>
        
        <li class="item">
          <a href="#">
          <img src="../assets/xiguav.png" alt="">
          <div class="name">西瓜视频</div>
          </a>
        </li>
        <li class="item">
          <a href="#">
          <img src="../assets/huoshanv.png" alt="">
          <div class="name">火山视频</div>
          </a>
        </li>
        <li class="item">
          <a href="#">
          <img src="../assets/kuaishou.png" alt="">
          <div class="name">快手</div>
          </a>
        </li>
        <li class="item">
          <a href="#">
          <img src="../assets/migu.png" alt="">
          <div class="name">咪咕视频</div>
          </a>
        </li>
      </ul>
    </div>
    <div class="foot"></div>
  </div>
</template>
<style scoped>
  .part-2 {
    margin-top: 20px;
  }
  .content {
    height: 380px;
  }
  .content .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* width: 643px; */
    margin: 40px 0 0 34px;
  }
  .content .list .item {
    width: 120px;
    text-align: center;
    margin: 0 10px 30px 0;
  }
  .content .list img {
    width: 80%;
  }

  .content .list >li .name {
    text-align: center;
    width: 100%;
    padding: 5px 0;
    color: #2c6df1;
    font-size: 22px;
  }
</style>