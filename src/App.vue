<template>
  <router-view></router-view>
</template>

<script setup>

const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 200);
    super(callback);
  }
}

</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body, html {
  font-size: 10px;
  font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji,BlinkMacSystemFont,Helvetica Neue,Arial,PingFang SC,PingFang TC,PingFang HK,Microsoft Yahei,Microsoft JhengHei;
}
ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
</style>
