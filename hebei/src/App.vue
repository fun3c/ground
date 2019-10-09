<template>
  <div id="app">
    <Head />
    <Part1 />
    <Part2 />
    <Part3 />
  </div>
</template>

<script>

import Head from '@/components/Head';
import Part1 from '@/components/Part1';
import Part2 from '@/components/Part2';
import Part3 from '@/components/Part3';
export default {
  name: 'App',
  components: {
    Head,
    Part1,
    Part2,
    Part3
  }
};
</script>

<style>
*{margin: 0; padding: 0;}
html {
  margin: 0;
  padding: 0;
  height: 100vh;
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #2cbff0;
}
* {
  box-sizing: inherit;

  &:before,
  &:after {
    box-sizing: inherit;
  }
}
ul,li {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  width: 100%;
  height: auto;
  vertical-align: top;
  content: normal !important;
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
</style>
