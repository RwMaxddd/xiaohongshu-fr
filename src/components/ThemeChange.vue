<template>
  <div class="multistage-toggle">
    <div class="toggle-item" :class="{'toggle-item-focus':isSunny}" @click="changeTheme('sunny')">
      <Sunny class="Sunny"></Sunny>
    </div>
    <div class="toggle-item" :class="{'toggle-item-focus':isMoon}" @click="changeTheme('moon')">
      <Moon class="Moon"></Moon>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../utils/useTheme'
import { Sunny, Moon } from '@element-plus/icons-vue'
import {computed} from "vue";

const { theme } = useTheme()
const isSunny = computed(() => {
  return theme.value === 'light' ? true : false;
})
const isMoon = computed(() => {
  return theme.value === 'dark' ? true : false;
})

function changeTheme(themeType){
  theme.value = themeType === 'sunny' ? 'light' : 'dark'
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