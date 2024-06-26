<template>
  <div class="container" ref="container">
    <div class="form-warp">
      <form class="sign-in-form" id="signInForm" ref="loginForm" @submit="login">
        <h2 class="form-title">登录</h2>
        <input type="text" placeholder="用户id" name="user_id"  autocomplete="username"/>
        <input type="password" placeholder="密码" name="password" autocomplete="current-password"/>
        <button class="submit-btn">立即登录</button>
      </form>

      <form class="sign-up-form" id="signUpForm" ref="registerForm" @submit="register" @input="debounceInput">
        <h2 class="form-title">注册</h2>
        <input type="text" placeholder="用户id" name="user_id"  autocomplete="username" class="input" ref="registerU"  :class="{error:!userNameIsRight}"/>
        <div class="error-message" v-show="!userNameIsRight">{{ usernameTips }}</div>
        <input type="password" placeholder="密码" name="password" autocomplete="current-password" class="input" ref="registerP"  :class="{error:!passwordIsRight}"/>
        <div class="error-message" v-show="!passwordIsRight">{{ passwordTips }}</div>
        <button class="submit-btn">立即注册</button>
      </form>
    </div>

    <div class="desc-warp">
      <div class="desc-warp-item sign-up-desc">
        <div class="content">
          <button id="sign-up-btn" @click="signUp">注册</button>
        </div>
        <img src="../assets/5.png" alt="" style="width: 300px;">
      </div>
      <div class="desc-warp-item sign-in-desc">
        <div class="content">
          <button id="sign-in-btn" @click="signIn">登录</button>
        </div>
        <img src="../assets/6.png" alt="" style="width: 300px;">
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../store/user'
import { debounce } from '../utils/debounce'

const usernamePattern = /^[a-zA-Z0-9]{5,12}$/;
const passwordPattern = /^[a-zA-Z0-9]{6,15}$/;
const usernameTips = '用户名由英文字母或数字组成，且长度为5到12个字符'
const passwordTips = '密码由英文字母或数字组成，且长度为6到15个字符'

const router = useRouter()
const container = ref(null)
const loginForm = ref(null)
const registerForm = ref(null)
const userStore = useUserStore()
const registerU = ref(null)
const registerP = ref(null)
const userNameIsRight = ref(false)
const passwordIsRight = ref(false)

function registerVerify() {
  userNameIsRight.value = usernamePattern.test(registerU.value.value)
  passwordIsRight.value = passwordPattern.test(registerP.value.value)
  if (userNameIsRight.value && passwordIsRight.value){
    return true
  }else {
    return false
  }
}
const debounceInput = debounce(registerVerify,300)
function signUp(){
  container.value.classList.add('sign-up-mode')
}
function signIn(){
  container.value.classList.remove('sign-up-mode')
}

async function register(e){
  e.preventDefault();
  if (registerVerify()){
    try {
      const response = await fetch('http://127.0.0.1:3000/register',{
        method:"POST",
        body: new FormData(registerForm.value)
      })
      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.msg);
      }else{
        const value = await response.json()
        ElMessage({
          message: value.msg,
          type: 'success',
        })
        await router.go(0)
      }
    }catch (e) {
      ElMessage.error(e.message)
      console.log(e.message)
    }
  }
}

async function login(e){
  e.preventDefault();
  try {
    const response = await fetch('http://127.0.0.1:3000/login',{
      method:"POST",
      credentials: 'include',
      body: new FormData(loginForm.value),
    })
    if (!response.ok) {
      const errorMessage = await response.json()
      throw new Error(errorMessage.msg);
    }else{
      const value = await response.json()
      localStorage.setItem('token', value.data);
      userStore.userId = value.user_id
      userStore.isAdmin = value.admin
      ElMessage({
        message: value.msg,
        type: 'success',
      })
      await router.push({ path:'/TheGlobal'})
    }
  }catch (e) {
    ElMessage.error(e.message)
  }
}
</script>

<style scoped>
.error-message {
  font-size: 12px;
  color: red;
}
.error {
  border: 1px solid red;
}
.container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}
.container::before {
  content: " ";
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background-image: linear-gradient(-45deg, #6266f5 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  z-index: 6;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
}
.container.sign-up-mode::before {
  transform: translate(100%, -50%);
}

.form-warp {
  width: 50%;
  position: absolute;
  z-index: 5;
  left: 75%;
  top: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr;
  transition: 1s 0.7s ease-in-out;
}
.form-warp form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  /* 将两个 form 布局在 grid 同一位置 */
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  transition: all 0.2s 0.7s;
  opacity: 1;
  z-index: 4;
}
.form-title {
  color: #6266f5;
}
.form-warp .sign-up-form {
  opacity: 0;
  z-index: 3;
}
.container.sign-up-mode .form-warp {
  left: 25%;
}
.container.sign-up-mode .sign-in-form {
  opacity: 0;
  z-index: 3;
}
.container.sign-up-mode .sign-up-form {
  opacity: 1;
  z-index: 4;
}
input,
.submit-btn {
  min-width: 300px;
  outline: none;
  padding: 12px 30px;
  line-height: 1;
  font-size: 16px;
  border-radius: 60px;
  color: #333;
  background-color: #6267f513;
  border: none;
}
input::placeholder {
  color: #cccc;
}
.submit-btn {
  background-color: #6266f5;
  color: #FFF;
  text-align: center;
  min-width: 150px;
  font-size: initial;
  font-weight: bold;
  letter-spacing: 1.5px;
  cursor: pointer;
}

.desc-warp {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.desc-warp-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  text-align: center;
  padding: 3rem 17% 2rem 12%;
  z-index: 6;
}
/* 事件穿透 BEGIN */
.sign-in-desc {
  pointer-events: none;
}
.sign-up-mode .sign-in-desc {
  pointer-events: all;
}
.sign-up-mode .sign-up-desc {
  pointer-events: none;
}
/* 事件穿透 END */
.content {
  width: 100%;
  transition: transform 0.9s ease-in-out;
  transition-delay: .6s;
}
.sign-in-desc img,
.sign-in-desc .content {
  transform: translateX(800px);
}
.sign-up-mode .sign-in-desc img,
.sign-up-mode .sign-in-desc .content {
  transform: translateX(0);
}

.sign-up-mode .sign-up-desc img,
.sign-up-mode .sign-up-desc .content {
  transform: translateX(-800px);
}

button {
  outline: none;
  padding: 6px 8px;
  min-width: 100px;
  text-align: center;
  border-radius: 30px;
  border: 2px solid #FFF;
  background: none;
  color: #FFF;
  cursor: pointer;
  transition: all .3s ease;
}
button:active {
  background: rgba(255, 255, 255, .1);
}
img {
  width: 100%;
  display: block;
  transition: transform 0.9s ease-in-out;
  transition-delay: .5s;
}

/* 响应式 */
@media screen and (max-width: 870px) {
  .container::before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }
  .container.sign-up-mode::before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }
  .form-warp {
    width: 100%;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }
  .container.sign-up-mode .form-warp {
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  img {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.7s;
  }
  .desc-warp {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }
  .desc-warp-item {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }
  .sign-in-desc {
    grid-row: 3 / 4;
  }

  .sign-in-desc img,
  .sign-in-desc .content {
    transform: translateY(800px);
  }

  .sign-up-mode .sign-in-desc img,
  .sign-up-mode .sign-in-desc .content {
    transform: translateY(0);
  }

  .sign-up-mode .sign-up-desc img,
  .sign-up-mode .sign-up-desc .content {
    transform: translateY(-800px);
  }
}

@media screen and (max-width: 570px) {
  .container::before {
    bottom: 72%;
    left: 50%;
  }
  img {
    display: none;
  }
}
input:focus{
  border: 1px solid rgb(64,158,255);
}

</style>