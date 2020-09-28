<template>
  <div id="cinemaDetail" ref="root" @touchstart="stopScroll" @touchend="openScroll">
    <div class="cinemaInfo">
      <h1>猫眼电影>{{cinemaDeatil.showData.cinemaName}}</h1>
      <div class="addr j-s-a">
        <div class="left">
          <h2>{{cinemaDeatil.showData.cinemaName}}</h2>
          <p>{{cinemaDeatil.cinemaData.addr}}</p>
        </div>
        <div class="right">
          <i class="iconfont iconlocation"></i>
        </div>
      </div>
      <div class="_wrap" v-blur="handleImg(cinemaDeatil.showData.movies[activeIndex].img)">
        <div class="swiper-container" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in cinemaDeatil.showData.movies" :key="item.id">
              <img :src="handleImg(item.img)" alt />
            </div>
          </div>
          <!-- Add Pagination -->
        </div>
      </div>

      <div class="movieInfo">
        <p>
          <span class="title">{{cinemaDeatil.showData.movies[activeIndex].nm}}</span>
          <span>
            <i>{{handleNum(cinemaDeatil.showData.movies[activeIndex])}}</i>
            {{handleText(cinemaDeatil.showData.movies[activeIndex])}}
          </span>
        </p>
        <p class="desc">{{cinemaDeatil.showData.movies[activeIndex].desc}}</p>
      </div>
      <div class="showDay">
       <div class="swiper-container" ref="showDay">
          <div class="swiper-wrapper">
            <div class="swiper-slide"  v-for="(item,index) in cinemaDeatil.showData.movies[activeIndex].shows"
                :key="index"
                :class="{active:selectDay === index}"
                @click="handleSelectDay(index,item.showDate)">
             {{item.dateShow}}
            </div>
          </div>
          <!-- Add Pagination -->
        </div>
       <!-- <iscroll-view class="showDayScroll" @scrollStart="log"  ref="showDayScroll">
          <div>
            <ul class="flex">
              <li
                v-for="(item,index) in cinemaDeatil.showData.movies[activeIndex].shows"
                :key="index"
                :class="{active:selectDay === index}"
                @click="handleSelectDay(index,item.showDate)"
              >{{item.dateShow}}</li>
            </ul>
          </div>
        </iscroll-view>-->
      </div>
      <div class="plist">
        <ul>
          <li
            v-for="(item , index) in cinemaDeatil.showData.movies[activeIndex].shows[selectDay].plist"
            :key="index"
            class="j-s-a"
            @click="toSeat(item)"
          >
            <div class="left">
              <p>
                <span class="start">{{item.tm}}</span>
                <span class="lang">{{item.lang}} {{item.tp}}</span>
                <i class="_p">￥</i>
                <span class="price">{{item.vipPrice || 38}}</span>
                <span class="vip">
                  <i class="card">折扣卡</i>
                  <i class="_price">{{+item.vipPrice - 3>0? +(item.vipPrice - 3).toFixed(2):35}}</i>
                </span>
              </p>
              <p class="leavel">
                <span>{{leavel(cinemaDeatil.showData.movies[activeIndex].dur,item.tm)}} 散场</span>
                <span class="th">{{item.th}}</span>
              </p>
            </div>
            <div class="right">
              <span>购票</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import cinemaDeatil from "../../data/cinemaDetail";
import { mapState } from "vuex";

export default {
  name: "cinemaDetail",
  data() {
    return {
      cinemaDeatil,
      activeIndex: 0,
      selectDay: 0,
      show: false,
    };
  },
  created() {
    this.$store.dispatch("home/loadCinemaDetail");
    // this.cinemaDeatil = this.cinemaList.movies || cinemaDeatil
  },
  computed: {
    ...mapState({
      cinemaList: (state) => state.home.cineamDetail,
      movieId: (state) => state.movie.movieId,
    }),
  },
  watch: {
    cinemaList: {
      handler(newVal) {
        if (newVal.showData) {
          this.cinemaDeatil = this.cinemaList;

          this.show = true;
        }
        this.$nextTick(() => {
          if (this.swiper1) {
            let index = this.cinemaDeatil.showData.movies.findIndex(
              (item) => item.id === this.movieId
            );
            
            this.swiper1.slideTo(0);
            this.selectDay = 0;
            this.activeIndex = index < 0 ? 0 : index;
            this.swiper1.update();
            this.swiper1.slideTo(this.activeIndex);
          }
     
        });
      },
      immediate: true,
    },
    activeIndex(newVal){
      // if( this.$refs.showDayScroll){
      //    this.$refs.showDayScroll.iscroll.refresh()
      // }
    }
    // movieId:{
    //   handler(newVal){
    //     
    //     let index =  this.cinemaDeatil.showData.movies.findIndex(item => item.id === newVal)
    //   this.activeIndex = index < 0?0:index
    //   

    // },immediate:true
    // }
  },
  methods: {
    toSeat(item) {
      this.$store.commit("movie/setMovieDetail", {
        name: this.cinemaDeatil.showData.movies[this.activeIndex].nm,
        movieImg: this.cinemaDeatil.showData.movies[this.activeIndex].img,
        plist: item,
      });
      this.$store.commit(
        "movie/setCinema",
        this.cinemaDeatil.showData.cinemaName
      );

      this.$router.push("/cinemaDetail/seat");
    },
    leavel(time, start) {
      let arr = start.split(":").map((item) => +item);
      let hour = parseInt(time / 60);
      let min = parseInt(time % 60);
      arr[1] += min;
      if (arr[1] >= 60) {
        arr[0]++;
        arr[1] %= 60;
      }
      arr[0] += hour;
      if (arr[0] >= 24) {
        arr[0] %= 24;
      }

      return arr.map((item) => (item < 10 ? "0" + item : item)).join(":");
    },
    handleSelectDay(index, day) {
      //    this.$store.dispatch("home/loadMoveCinema", {id:this.movieId,day});
      this.selectDay = index;
    },
    handleNum(item) {
      return item.sc === "0.0" ? item.wish : item.sc;
    },
    handleImg(url) {
      return url.replace("/w.h", "");
    },
    handleText(item) {
      return item.sc === "0.0" ? "人想看" : "分";
    },
    log(e) {
      
      e.refresh();
    //  this.$refs.showDayScroll.iscroll.options.scrollX = true;
    },
    stopScroll(){
      //  this.$refs.showDayScroll.iscroll.options.scrollX = false;
      
    },
    openScroll(){
      //  this.$refs.showDayScroll.iscroll.options.scrollX = true;
      
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
  },
  mounted() {
    let that = this
    this.$nextTick(() => {
      if (this.swiper1) {
        this.swiper.update();
      } else {
        this.swiper1 = new Swiper(this.$refs.swiper, {
          slidesPerView: 5,
          spaceBetween: 0,
          centeredSlides: true,
          slideToClickedSlide: true,
        });
    
      }
    
      if (this.swiper2) {
        this.swiper2.update();
      } else {
        this.swiper2 = new Swiper(this.$refs.showDay, {
       slidesPerView: 4,
      spaceBetween: 30,  
        });
      }
  this.swiper1.on('slideChange', ()=>{
      //你的事件that
   
      this.activeIndex = this.swiper1.activeIndex
    }),
      
      this.swiper2.slideTo(this.swiper1.selectDay);
      // this.$refs.showDayScroll.iscroll.options.scrollX = true;
      // this.$refs.showDayScroll.iscroll.options.scrollY = false; 
      // this.$refs.root.addEventListener('touchstart', ()=>{
      //    this.$refs.showDayScroll.iscroll.options.scrollX = false;
      
      // })
      // this.$refs.root.addEventListener('toucheend', ()=>{
      //    this.$refs.showDayScroll.iscroll.options.scrollX = true;
      
      // })
      // // 
        
      
    });
  },
};
</script>

<style lang="scss" scoped>
#cinemaDetail {
  position: absolute;
  top: 50px;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
  overflow: auto;
  background-color: #fff;
  ._wrap {
    margin-top: 20px;
    // background-color: red;
  }
  .cinemaInfo {
    h1 {
      padding: 10px;
      line-height: 25px;
      font-size: 14px;
      color: #777;
    }
    .addr {
      margin-top: 10px;
      padding: 0 10px;
      height: 40px;
      .left {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;

        border-right: 1PX #ccc solid;
        h2 {
          font-size: 17px;
          color: #333;
          font-weight: bold;
        }
        p {
          font-size: 13px;
          color: #999;
        }
      }
      .right {
        text-align: center;
        line-height: 40px;
        width: 71px;
        height: 40px;
        i {
          font-size: 17px;
          color: #589daf;
        }
      }
    }
  }
  .movieInfo {
    padding-top: 10px;
    text-align: center;
    p {
      line-height: 24px;
    }
    .desc {
      color: #999;
      font-size: 13px;
    }
    .title {
      font-size: 17px;
      color: #333;
      font-weight: bold;
    }
    span {
      margin-left: 5px;
      font-size: 12px;
      color: #ffb400;
    }
    i {
      color: #ffb400;
      font-size: 16px;
    }
  }
  .showDay {
    width: 100%;
      height: 42px;
    .swiper-slide{
          width: 115px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .active {
          border-bottom: 2PX solid #f03d37;
          color: #f03d37;
        }
  }
  .showDayScroll {
    width: 100%;
    height: 45px;

    overflow: hidden;
    div {
      width: max-content;
      ul {
        width: max-content;
        .swiper-slide{
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
  .plist {
    ul {
      padding: 0 15px;
      li {
        height: 75px;

        border-bottom: 1PX  #ccc solid;
        .left {
          height: 42px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .start {
            font-size: 20px;
            color: #333;
          }
          .lang {
            margin-left: 15px;
            display: inline-block;
            width: 100px;
            font-size: 13px;
            color: #333;
          }
          ._p {
            color: #f03d37;
          }
          .card {
            color: #fff;
            background-color: #f90;
          }
          .vip {
            margin-left: 10px;
            border: 1PX #f90 solid;
          }
          ._price {
            color: #f90;
            background-color: #fff;
          }
          .price {
            color: #f03d37;

            font-size: 19px;
          }
          .leavel {
            font-size: 12px;
            color: #999;
          }
          .th {
            margin-left: 8px;
          }
        }

        .right {
          width: 45px;
          height: 28px;
          span {
            display: block;
            width: 100%;
            height: 27px;
            line-height: 28px;
            font-size: 12px;
            background-color: #f03d37;
            color: #fff;
            border-radius: 4px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
._wrap {
  .__bg {
    z-index: 0;
  }
  .my_mask {
    z-index: 0;
  }
}

._wrap .swiper-wrapper {
  width: 100%;
  height: 135px;
  padding: 10px 0;
  background-color: transparent;
  position: relative;
  z-index: -10;
}

._wrap .swiper-slide {
  margin: 0;
  background-color: transparent;
  text-align: center;
  width: 75px;
  overflow: hidden;
  img {
    width: 75px;
    height: 110px;
  }
}
._wrap .swiper-slide.swiper-slide-active img {
  position: relative;
  border: 4PX  #fff solid;
}
._wrap .swiper-slide.swiper-slide-active::before {
  content: "";
  content: "";
  position: absolute;
  display: block;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  border: 6PX  transparent solid;
  border-top-color: #fff;
}
._wrap .swiper-container {
  width: 100%;
  height: 100%;
}
._wrap .swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 300ms;
  transform: scale(0.8);
}
._wrap .swiper-slide-active,
._wrap .swiper-slide-duplicate-active {
  transform: scale(1);
}
</style>
