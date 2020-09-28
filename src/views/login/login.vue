<template>
    <div class="lgoin" id="login">
     <div class="header j-s-a">
      <span class="j-s-a">
       <i class="iconfont iconleft" ></i></span>
      <h2 class="t-c">猫眼电影</h2>
      <span class="j-s-a">
      
      </span>
    </div>
    <div class="option j-s-a">
    <div @click="toggle('登录')">美团账号登录</div>
    <div @click="toggle('注册')">美团账号注册</div>
    <span class="slider" :class="{left:type==='登录',right:type==='注册'}"></span>
    </div>
    <div class="form">
        <input type="text" v-model="user" placeholder="手机号">
        <input type="password" v-model="pass" name="" id="" placeholder="请输入您的密码">
        <div><input type="button" class="submit" :value="type" @click="submit"></div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'login',
    data(){
        return {
            type:'登录',
            user:'',
            pass:''
        }
    },
    methods:{
        toggle(type){
            this.type = type
        },
        submit(){
            let url = '';
            if(this.user.trim() ==='' || this.pass.trim() ===''){
                this.$toast('内容不能为空')
            }
            if(this.type === '登录'){
                url = 'http://10.36.150.18:3000/login'
            }else{
                 url = 'http://10.36.150.18:3000/register'
            }
            axios.post(url,{user:this.user,pass:this.pass}).then((res)=>{
                 this.$toast(res.data.msg)
                 if(res.data.err === 1){
                     this.$store.commit('user/setLogin',true)
                     this.$router.back()
                 }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    #login{
        position: fixed;
        top: 0px;
        bottom: 0;

        width: 100%;
        background-color: #fff;
    }
    .option{
        padding: 0 10px;
        height: 40px;
        border-bottom: 8PX #d6d6d6 solid;
        position: relative;
        .slider{
            position: absolute;
            bottom: -4px;
            height: 8PX;
            transition: 0.3s;
            width: 50%;
            background-color: #FFC300;
        }
        .left{
            left: 10px;
        }
        .right{
            right: 10px;
        }
        div{
        flex: 1;
            text-align: center;
            color: #222;
            font-size: 14px;
        }
    }
    .form{
        input{
            width: 100%;
            height: 40px;
            border: none;
            border-bottom: 1PX #ccc solid;
            font-size: 15px;
            padding: 0 10px;
            outline: none;

        }
        div{
             padding: 0 10px;
        }
        .submit{
           margin-top: 15px;
           height: 30px;
           border-radius: 5px;
           background-color: #df2d2d;
           color: #fff;
        }
    }
</style>