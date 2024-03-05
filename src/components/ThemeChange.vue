<template>
  <div class="multistage-toggle">
    <div class="toggle-item" :class="{'toggle-item-focus':isSunny}" @click="changeTheme('Sunny')">
      <Sunny class="Sunny"></Sunny>
    </div>
    <div class="toggle-item" :class="{'toggle-item-focus':isMoon}" @click="changeTheme('Moon')">
      <Moon class="Moon"></Moon>
    </div>
  </div>
</template>

<script setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
import {computed, ref} from "vue";

const nowTheme = ref('Sunny');
const isSunny = computed(() => {
  return nowTheme.value === 'Sunny' ? true : false;
})
const isMoon = computed(() => {
  return nowTheme.value === 'Moon' ? true : false;
})

function changeTheme(theme){
  if(theme != nowTheme.value){
    nowTheme.value = theme;
    document.body.classList.toggle('dark')
  }
}
</script>

<style scoped lang="less">
.toggle-item-focus {
  background: var(--toggle-item-background-color);
}
.multistage-toggle {
  display: flex;
  flex-direction: row;
  border-radius: 999px;
  background: var(--multistage-toggle-background-color);
  padding: 2px;
  flex-shrink: 0;
  .toggle-item {
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
    color: var(--icon-color);
    cursor: pointer;
    &:hover {
      color: var(--icon-color-hover);
    }
    .Moon,
    .Sunny {
      height: 16px;
      width: 16px;
    }
  }
}

</style>