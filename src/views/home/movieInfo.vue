
<template>
  <div class="movieInfo" @click="hideSelect">
    <div class="info flex" v-blur="handleImg(movieInfo.img)">
      <div class="info-left">
        <img :src="handleImg(movieInfo.img)" alt />
      </div>
      <div class="info-right">
        <h1>{{movieInfo.nm}}</h1>
        <p>{{movieInfo.enm}}</p>
        <p>
          {{handleArr(movieInfo.cat)}}
          <img
            src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/movie-tag-3D.png"
            alt
          />
        </p>
        <p>{{handleArr(movieInfo.star)}}</p>
        <p class="one-line">{{movieInfo.pubDesc}} / {{movieInfo.dur}} 分钟 ></p>
        <p class="btn-wrap j-s-a">
          <span class="btn">
            <img
              src="https://s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/want-to-watch.png"
              alt
            /> 想看
          </span>
          <span class="btn">
            <img src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star.png" alt /> 看过
          </span>
        </p>
      </div>
    </div>
    <div class="showDay">
      <iscroll-view class="showDayScroll" @scrollStart="log" ref="showDayScroll">
        <div>
          <ul class="flex">
            <li v-for="(item,index) in day" :key="index"
            :class="{active:selectDay === index}"
            @click="handleSelectDay(index,item.date)"
            >{{handleDay(item.date,index)}}</li>
          </ul>
        </div>
      </iscroll-view>
    </div>
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
          <li v-for="item in cinemasList" :key="item.id" @click="toCinema(item.id)">
            <p class="tit">
              <span>{{item.nm}}</span>
              <span v-if="item.sellPrice" class="price">
                <i class="num">{{item.sellPrice}}</i>元起
              </span>
            </p>
            <p class="one-line loaction j-s-a">
              <span class="one-line">{{item.addr}}</span>
              <span>{{item.distance}}</span>
            </p>
            <p>
              <span
                v-for="(item,index) in handleTag(item.tag)"
                :key="index"
                class="lable"
                :class="item.class"
              >{{ item.value}}</span>
            </p>
            <p class="dis">
              <img :src="item.img" alt />
              {{item.discountText}}
            </p>
            <p class="showTimes">近期上映{{item.showTimes}}</p>
          </li>
        </ul>
      </div>
    </iscroll-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import mySelect from "./select";
export default {
  name: "cinema",
  data() {
    return {
      showSelect: false,
      com: 0,
      cinemasList: [],
      day: [],
      selectDay:0,
      init:true
    };
  },
  components: {
    mySelect,
  },
  mounted() {
   
    this.$nextTick(() => {
      this.$refs.showDayScroll.iscroll.options.scrollX = true;
      this.$refs.showDayScroll.iscroll.options.scrollY = false;

      // this.$refs.singerName.iscroll.options.scrollX = true;
    });
  },
  methods: {
    toCinema(id){
      
      this.$store.dispatch('home/loadCinemaDetail',id)
      this.$router.push('/cinemaDetail')
    },
    handleSelectDay(index,day){
      
       this.$store.dispatch("home/loadMoveCinema", {id:this.movieId,day});
 
      this.selectDay = index;
    },
    handleDone() {
      this.showSelect = false;
      this.$store.dispatch("home/loadMoveCinema", this.movieId);
    },
    handleImg(url) {
      return url ? url.replace("/w.h", "") : "";
    },
    handleDay(_date, index) {
      let week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let _day = new Date().getDay();
      
      
      let dayStr = _date.split("-");
      let showStr = dayStr[1] + "月" + dayStr[2] + "日";
      switch (index) {
        case 0:
          return "今天" + showStr;
        case 1:
          return "明天" + showStr;
        case 2:
          return "后天" + showStr;
        default:
          return week[(+_day + +index) % 7] + showStr;
      }
    },
    handleTag(obj) {
      let arr = [];
      for (let key in obj) {
        if (obj[key]) {
          switch (key) {
            case "allowRefund":
              arr.push({ class: key, value: "退" });
              break;
            case "endorse":
              arr.push({ class: key, value: "改签" });
              break;
            case "snack":
              arr.push({ class: key, value: "小吃" });
              break;
            case "vipTag":
              arr.push({ class: key, value: "折扣卡" });
              break;
            case "hallType":
              arr.push(
                ...obj[key].map((item) => ({
                  class: key,
                  value: item,
                }))
              );
              break;
          }
        }
      }

      return arr;
    },
    handleNum() {},
    handleArr(arr) {
      return arr ? arr.split(",").join(" / ") : "";
    },
    hideSelect() {
      this.showSelect = false;
    },
    handleSelect(num) {
      this.com = num;
      this.showSelect = true;
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
      movieInfo: (state) => state.movie.movieInfo,
      movieId: (state) => state.movie.movieId,
      movieCinema: (state) => state.home.movieCinema,
      //   showList: (state) => state.home.comingMovie,
    }),
  },
  watch: {
    movieCinema(newVal) {
      this.cinemasList = newVal.cinemas;
  
      this.day = newVal ? newVal.showDays.dates : [];
    },
    day(newVal){
      if(newVal.length >0 && this.init){
        
         this.handleSelectDay(0,newVal[0].date);
         this.init = false
      }
    }
  },
    inject: ["setTitle", "showBack", "setBack"],
  
  created() {
    //   this.$store.dispatch("movie/loadMovieInfo", 1211269);
    // /  this.$store.dispatch("home/loadMoveCinema", 1211269);


    //   loadMoveCinema
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
  
    this.showBack(true);
    // this.setBack(this.back);
    // loadExpected
    // loadComingMovie
  },
};
</script>

<style scoped lang="scss">
.movieInfo {
  position: fixed;
  top: 48px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
}
.info {
  width: 100%;
  height: 150px;
  padding: 15px;
  .info-left {
    img {
      width: 100px;
      height: 120px;
    }
  }
  .info-right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    color: #fff;
    h1 {
      font-size: 20px;
      color: #fff;
    }
    img {
      width: 16px;
      height: 14px;
    }
    p {
      display: flex;
      align-items: center;
      font-size: 12px;
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        background: hsla(0, 0%, 100%, 0.35);
        box-shadow: 0 0.02rem 0.08rem 0 rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        font-size: 14px;
        width: 110px;
        height: 30px;
        color: #fff;
        img {
          width: 14px;
          height: 14px;
          margin-right: 10px;
        }
      }
    }
  }
}
.content {
  width: 100%;
  position: absolute;
  top: 235px;
  bottom: 0px;
  background-color: #fff;
  overflow: hidden;
  ul {
    li {
      padding: 13px 13px;
      border-bottom: 1PX  #ccc solid;
      p {
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
      .dis {
        display: flex;
        align-items: center;
        img {
          margin-right: 5px;
        }
      }
      .loaction {
        font-size: 13px;
        color: #666;
      }
      .lable {
        margin-right: 3px;
        display: inline-block;
        padding: 2px 2px;
        border-radius: 2px;
      }
      .allowRefund {
        color: #589daf;
        border: 1PX  solid #589daf;
      }
      .showTimes {
        font-size: 12px;
        color: #999;
      }
      .endorse {
        color: #589daf;
        border: 1PX  solid #589daf;
      }
      .vipTag {
        color: #f90;
        border: 1PX  solid #f90;
      }
      .snack {
        color: #f90;
        border: 1PX  solid #f90;
      }
      .hallType {
        color: #589daf;
        border: 1PX  solid #589daf;
      }
    }
  }
}
.showDay {
  width: 100%;
}
.showDayScroll {
  width: 100%;
  height: 45px;
 
  overflow: hidden;
  div {
    width: max-content;
    ul {
      width: max-content;
      li {
        width: 115px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: #666;
        font-size: 14px;
      }
      .active {
        border-bottom: 2PX solid #f03d37;
        color: #f03d37;
      }
    }
  }
}
.cinema-header {
  background-color: #fff;
  position: relative;
  border-top: 1PX #777 solid;
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
      border-right: 1PX  #777 solid;
    }
    border-bottom: 1PX #777 solid;
  }
  width: 100%;
  height: 40px;
}
</style>