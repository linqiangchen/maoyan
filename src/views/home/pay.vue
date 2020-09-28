
<template>
    <div class="pay">
    <div class="top">
   
        <div class="_header j-s-a">
        <i class="iconfont iconleft" @click="$router.back()"> </i>
        <span>支付订单</span>
        <div class="time">
            <i class="iconfont iconshizhong"></i>
            <span>15:00</span>
        </div>
        </div>
        <div class="movieInfo flex">
            <div class="left">
            <img :src="movieImg" alt="">
            </div>
            <div class="right">
            <p class="j-s-a"><span class="nm">{{movieName}}</span><span><i>{{count}}张 </i><i>原价{{price}}</i></span></p>
            <p><span>明天9月22日</span> <span>{{plist.tm}}</span> <span>({{plist.lang}}{{plist.tp}})</span></p>
            <p>{{cinema}}</p>
            <p><span>{{plist.th}}</span> <span v-for="item in tacit" :key="item.id">{{item.row}}排{{item.column}}座 </span> </p>
            </div>
        </div>
        <div class="tui j-s-a">
        <p> <i class="iconfont icongou"></i><span>支持退票</span> </p>
         <p> <i class="iconfont icongou"></i><span>支持改签</span> </p>
         <p class="null">          </p>
         <p><span>退改签须知</span>  <i class="iconfont iconhtbArrowright02"></i></p>
        </div>
        
         </div>
        <div class="buyInfo">
         <div class="activity">
        <div class="_top">
        <p class="j-s-a"><span class="card">活动与抵用券</span> <span>无可用 <i class="iconfont iconhtbArrowright02"></i></span></p>

        </div>
        <div class="_bottom">
            <p>
            <span class="card">票价小计</span>
            <span>￥</span>
            <span class="price">{{price}}</span>
            </p>
        </div>
        </div>
        <div class="add">
        <span><i class="iconfont iconadd"></i></span>
        <span>请添加购票人</span>
        </div>

        <div class="dis">
            <p class="j-s-a"><span class="tit">影城折扣卡</span> <span>开卡特惠，数量有限，先到先得~</span></p>

            <div class="flex j-s-a _wrap">
                <div class="left ">
                <p class="cin">{{cinema}}</p>
                <p>开通后 本单立减3元></p>
                </div>
                <div class="right flex">
                <p><span>￥9.9/季度</span><i class="iconfont icongou"></i></p>
                </div>
            </div>
        </div>

        <div class="phone">
             <p class="user"><span>手机号</span> <span>13766345195</span></p>
        <p>手机号仅用于生成订单，取票码不再以短信发送</p>
        </div>
     
        </div>
          <div class="payFor j-s-a">
            <span class="price"><i>￥</i>{{price}}</span>
            <span>明细</span>
            <span class="btn" @click="toOrder">确认支付</span>
       </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
 name:'pay',
 computed:{
     ...mapState({
         movieImg: (state) => state.movie.movieImg.replace('/w.h',''),
         tacit: (state) => state.movie.tacit,
         movieName: (state) => state.movie.movieName,
         plist: (state) => state.movie.plist,
         cinema: (state) => state.movie.cinema,
          count: (state) => state.movie.count,
        price: (state) => state.movie.price,
     })
 },
 inject:['setTitle','showBack'],
 created(){
     this.showBack(true)
 },
 methods:{
     toOrder(){
         this.$store.commit('order/setOrder',{
             id:Date.now(),
             cinema:this.cinema,
             movie:{
                 img:this.movieImg,
                 name:this.movieName
             },
             plist:{
                time:this.plist.dt,
                tm:this.plist.tm,
                hall:this.plist.th,
                select:this.tacit
             },
             count:this.count,
             price:this.price
         }),
         this.$toast('支付成功')
         this.$router.push('/mine/myOrder')
     }
 }
}
</script>

<style lang="scss" scoped>
    .pay{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #fcf0f0;
        .top{
            height: 225px;
            background-image: linear-gradient(135deg,#88b3ca,#7195a8);
        }
        ._header{
            height: 26px;
            line-height: 26px;
            padding-left: 15px;
            font-size: 15px;
            color: #fff;
            i{
                font-size: 15px;
            color: #fff; 
            }
        }
        .movieInfo{
            padding: 10px;
            color: #fff;
            .left{
                img{
                    width: 72px;
                    height: 100px;
                }
            }
            .right{
                font-size: 13px;
                .nm{
                    font-size: 18px;
                }
                margin-left: 15px;
                flex: 1;
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        }
        .tui{
            width: 100%;
            height: 42px;
            color: #fff;
            font-size: 13px;
            .null{
                width: 80px;
            }
            i{
                 color: #fff;
            font-size: 13px;
            margin:  0 5px;
            }
            line-height: 42px;
            border-radius: 10px 10px 0 0 ;
            background: rgba(0,0,0,.12);
        }
        .activity{
            border-radius: 10px 10px 0 0 ;
           background-color: #fff;
           margin-top: -42px;
           padding:0 15px;
           ._top{
                 border-radius: 10px 10px 0 0 ;
               height: 45px;
               line-height: 45px;
               width: 100%;
               font-size: 13px;
               color: #999;
               .card{
                   font-size: 14px;
                   color: #333;
               }
               border-bottom: 1PX #ccc solid;
           }
           ._bottom{
               width: 100%;
               text-align: right;
               color: #ef4238;
               font-size: 13px;
               height: 47px;
               line-height: 47px;
               .card{
                   font-size: 14px;
                   color: #333;
               }
               .price{
                   color: #ef4238;
    font-size: 18px;
               }
           }
        }
        .buyInfo{
           border-radius: 10px 10px 0 0 ;
              background: #fcf0f0;
              .add{
                  text-align: center;
                  height: 45px;
                  line-height: 45px;
                  background-color: #fff;
                  margin: 15px 0;
                 font-size: 15px;
                 color: #f03d37;
                    i{
                        font-size: 15px;
                         color: #f03d37;
                     }
              }
        }
        .dis{
            padding:25px 15px;
            background-color: #fff;
            font-size: 12px;
            color: #999;
            ._wrap{
                margin-top: 15px;
            }
                .tit{
                    font-size: 16px;
                    color: #333;
                }
                i{
                    font-size: 16px;
                }
            .left{
                line-height: 20px;
                .cin{
                    display: inline-block;
    width: 130px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #572c16;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
                }
            }
        }
        .phone{
            margin-top: 15px;
            line-height: 20px;
            padding: 10px 15px;
            background-color: #fff;
            .user{
                color: #333;
                font-size: 14px;
                height: 50px;
                line-height: 50px;
                border-bottom: 1PX #ccc solid;
            }
            p{
                font-size: 12px;
                color: #999;
                height: 36px;
                line-height: 36px;
            }
        }
        .payFor{
            position: absolute;
            padding: 15px;
            bottom: 0;
            width: 100%;
            height: 57px;
            background-color: #fff;
            .price{
                width: 140px;
                    font-size: 21px;
    font-family: PingFangSC-Medium,Hiragino Sans GB,sans-serif;
    color: #ef4238;
            }
            i{
                font-size: 14px;
            }
            .btn{
                

    line-height: 45px;
    width: 153px;
    background-color: #ff9e05;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    font-size: 16px;
            }
        }
    }
</style>