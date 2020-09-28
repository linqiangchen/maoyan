
<template>
<div class="wrap">
    <div id="mine">
        <div class="mine-header flex">
            <img src="https://img.meituan.net/maoyanuser/b9a2e18c357dadbdcba8db89448a5ffb15298.png" alt="">
        </div>

        <div class="order">
            <h3>我的订单</h3>

            <div class="flex _wrap">
            <div class="left" @click="$router.push('/mine/myOrder')">
            <span><i class="iconfont icondianying"></i></span>
            <p>电影</p>
            </div>
            <div class="right">
            <span>
                 <i class="iconfont iconshangpin-copy"></i>
            </span>
            <p>商品</p>
            </div>
            </div>
        </div>
        <div class="card">
        <p class="j-s-a">
        <span>优惠券</span>
          <i class="iconfont iconhtbArrowright02"></i>
        </p>
         <p class="j-s-a">
        <span>折扣卡</span>
          <i class="iconfont iconhtbArrowright02"></i>
        </p>
        </div>
    </div>
    <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'mine',
    data(){
        return {
            msg:''
        }
    },
    inject:['setTitle'],
    computed:{
      ...mapState({
          login:(state) => state.user.login
      })  
    },
    created(){
  this.setTitle('我的')
    },
   mounted(){
    //    this.setTitle('我的')
      if(!this.login){
      this.$router.replace('/login')
    }
   }
}
// https://s0.meituan.net/bs/file/?f=myfe/canary:static/deploy/dpmmweb/client/dpmmweb/component/mycenter/img/bg.png
</script>

<style lang="scss" scoped>
.wrap{
    width: 100%;
    height: 100%;
}
#mine{
    position: absolute ;
    top: 50px;
    bottom: 48px;
    width: 100%;
    background-color: #F3F3F3;
}
    .mine-header{
        margin-top: -1PX;
        width: 100%;
        height: 150px;
        background: url( 'https://s0.meituan.net/bs/file/?f=myfe/canary:static/deploy/dpmmweb/client/dpmmweb/component/mycenter/img/bg.png')center no-repeat;
        img{
            height: 66px;
            width: 66px;
            border-radius: 50%;
            margin: auto;
        }
    }
    .order{
        padding: 15px 0;
        text-align: center;
        width: 100%;
        height: 150px;
         font-size: 15px;
        color: #333;
    background-color: #fff;
    margin:  10px 0;
    ._wrap{
        margin-top: 20px;
        justify-content: space-around;
    }
    i{
         font-size: 25px;
        color: #fff;
    }
    .left{
        span{
            background-color: #FF605A;
        }
    }
    span{
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
        border-radius: 50%;
        line-height: 40px;
        background-color: #40D6C2;
        margin-bottom: 15px;
    }
    h3{
        padding:  0 10px;
        position: relative;
        margin:  auto;
        width: max-content;  
    }
    h3::before{
        
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 1PX;
        top: 50%;
        left: -100%;
        background-color: #CCC;
    }
    h3::after{
        
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 1PX;
        top: 50%;
        right: -100%;
        background-color: #CCC;
    }
    }
    .card{
        background-color: #fff;
        padding:  0 15px;
        p{
              font-size: 15px;
        color: #333;
            height: 44px;
            line-height: 44px;
            border-bottom: 1PX #ccc solid;
        }
    }
</style>