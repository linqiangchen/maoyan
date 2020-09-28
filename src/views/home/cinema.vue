import { mapState } from 'vuex';
<template>
  <div class="cinema" @click="hideSelect">
    <div class="cinema-header">
      <ul class="j-s-a t-c">
        <li @click.stop="handleSelect(0)">
          <span>全城</span>
          <i class="iconfont iconDownarrow-filled"></i>
        </li>
        <li @click.stop="handleSelect(1)">
          <span>品牌</span>
          <i class="iconfont iconDownarrow-filled"></i>
        </li>
        <li class="none-b" @click.stop="handleSelect(2)">
          <span>特色</span>
          <i class="iconfont iconDownarrow-filled"></i>
        </li>
      </ul>
       <mySelect v-show="showSelect" v-model="com" @done="handleDone"></mySelect>
    </div>

    <iscroll-view class="content" @scrollStart="log" ref="playListCat">
      <div>
        <ul>
          <li v-for="item in cinemas" :key="item.id" @click="toDetail(item.id)">
            <p class="tit">
              <span>{{item.title}}</span>
              <span v-if="item.price" class="price">
                <i class="num">{{item.price}}</i>元起
              </span>
            </p>
            <p class="one-line loaction j-s-a">
              <span class="one-line">{{item.location}}</span>
              <span>{{item.distance}}</span>
            </p>
            <p>
              <span
                v-for="lable in item.lable"
                :key="lable.value"
                class="lable"
                :class="lable.class"
              >{{ lable.value}}</span>
            </p>
            <p class="dis"><img :src="item.img" alt="">{{item.discountText}}</p>
          </li>
        </ul>
      </div>
    </iscroll-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import mySelect from './select'
export default {
  name: "cinema",
  data(){
    return {
      showSelect:false,
      com:0,
    }
  },
  components:{
    mySelect,
  },
  methods: {
    toDetail(id){
this.$store.dispatch('home/loadCinemaDetail',id)
      this.$router.push('/cinemaDetail')
    },
    handleDone(){
      this.showSelect = false;
              this.$store.dispatch("home/loadCinemas");
    },
    hideSelect(){
       this.showSelect = false
    },
    handleSelect(num){
      this.com = num
      this.showSelect = true
    },
    log(e) {
      //
      e.refresh();
    },
  },
  computed: {
    ...mapState({
      cinemas: (state) => state.home.cinemas,
      cinemaSelect: (state) => state.home.cinemaSelect,
      //   showList: (state) => state.home.comingMovie,
    }),
  },
  created() {
    // discountText:null
    // distance:"400m"
    // id:"17068"
    // img:null
    // lable:Array[3]
    // 0:Object
    // 1:Object
    // 2:Object
    // location:"宝安区西乡街道后瑞地铁站B出口100处（壹航城购物中心T2栋）"
    // price:"28"
    // title:"传奇影城（后瑞店）"

    // this.$store.dispatch("home/loadComingMovie");
    this.$store.dispatch("home/loadCinemas");
   this.$store.dispatch("home/loadCinemaSelect");
    // loadExpected
    // loadComingMovie
  },
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  position: absolute;
  top: 135px;
  bottom: 48px;
  background-color: #fff;
  overflow: hidden;
  ul {
    li {
      padding: 13px 13px;
      border-bottom: 1PX #ccc solid;
      p{
          margin: 10px 0;
      }
      .tit {
 
        font-size: 16px;
        color: #000;
        .price {
          margin-left: 5px;
          color: #f03d37;
          font-size: 12px;
        }
        .num {
          margin-right: 2px;
          font-size: 18px;
        }
      }
      .dis{
        display: flex;
        align-items: center;
        img{
          margin-right: 5px;
        }
      }
      .loaction {
     
        font-size: 13px;
        color: #666;
      }
      .lable{
      margin-right: 5px;
        display: inline-block;
        padding: 2px 4px;
        border-radius: 2PX;;
      }
      .allowRefund {
         
        color: #589daf;
        border: 1PX solid #589daf;
      }
      .vipTag{
        color: #f90;
        border: 1PX solid #f90;
      }
      .endorse {
   
        color: #589daf;
        border: 1PX solid #589daf;
      }
      .snack {
     
        color: #f90;
        border: 1PX solid #f90;
      }
      .hallType {
     
        color: #589daf;
        border: 1PX solid #589daf;
      }
    }
  }
}
.cinema-header {
    background-color: #fff;
    position: relative;
  ul {
    height: 100%;
    padding: 10px 0;
    li {
      height: 100%;
      line-height: 20px;

      flex: 1;
      font-size: 13px;
      color: #777;
      i {
        font-size: 13px;
      }
      border-right: 1PX #777 solid;
    }
    border-bottom: 1PX #777 solid;
  }
  width: 100%;
  height: 40px;
}

</style>