<template>
  <div class="hot">
    <iscroll-view class="content" @scrollStart="log" @pullUp="reflsh">
      <div>
        <div class="scr-X">
          <h2>最受好评电影</h2>
          <iscroll-view class="scroll-wrap" @scrollStart="log" ref="playListCat">
            <div>
              <ul>
                <li v-for="item in topRated" :key="item.id" @click="toMovie(item.id)">
                  <img v-lazy="item.img" alt />
                  <p class="one-line">{{item.nm}}</p>
                  <div class="mask">
                    <p>{{showInfo(item)}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </iscroll-view>
        </div>
        <ul class="show-ul">
          <li class v-for="(item ,index) in showList" :key="index"
          @click="toMovieCinema(item.id)"
          >
            <img v-lazy="item.img" alt />
            <div class="show-wrap j-s-a one-line">
              <div class="info one-line">
                <p class="one-line move-name">
                  <span class="nm">{{item.nm}}</span>
                  <img :src="imax(item.version)" alt v-if="item.version !==''" />
                </p>
                <p class="one-line wish">{{showInfo(item)}}</p>
                <p class="one-line">主演:{{item.star}}</p>
                <p class="one-line">{{item.showInfo}}</p>
              </div>
              <div class="buy" :class="{noPlay:toggleTime(item.rt)}">{{showBtn(item.rt)}}</div>
            </div>
          </li>
        </ul>
      </div>
    </iscroll-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      offset: 1,
      navList: [
        {
          id: 0,
          title: "热映",
        },
        {
          id: 1,
          title: "影院",
        },
        {
          id: 2,
          title: "待映",
        },
        {
          id: 3,
          title: "经典电影",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      topRated: (state) => state.home.topRated,
      showList: (state) => state.home.showMove,
    }),
  },
  
  created() {
    this.toggleTime();
    this.$store.dispatch("home/loadHotMove");

    this.$store.dispatch("home/loadTopRated");

    // loadExpected
    // loadComingMovie
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.playListCat.iscroll.options.scrollX = true;
      this.$refs.playListCat.iscroll.options.scrollY = false;
   
      // this.$refs.singerName.iscroll.options.scrollX = true;
    });
  },

  methods: {
    toMovieCinema(id){
      this.$store.commit('movie/setMovieId',id)
       this.$store.dispatch('movie/loadMovieInfo',id)
        //  this.$store.dispatch("movie/loadMovieInfo", 1211269);
        
      this.$store.dispatch("home/loadMoveCinema", {id});
       this.$router.push('/movieInfo')
    },
    toMovie(id){
      this.$store.commit('movie/setMovieId',id)
      this.$store.dispatch('movie/loadStar')
       this.$store.dispatch('movie/loadMovieInfo',id)
       this.$router.push('/movie')
    },
    imax(str) {
      return str === "v2d imax" ? "../assets/2d.png" : "../assets/3d.png";
    },
    toggleTime(str) {
      let date = new Date(str);
      return Date.now() < +date;
    },
    showBtn(str) {
      let date = new Date(str);
      return Date.now() < +date ? "预售" : "购票";
    },
    showInfo(item) {
      return item.sc === 0 ? item.wish + "人想看" : "观众评分 " + item.sc;
    },
    reflsh() {
      if (this.offset > 3) {
        return;
      }
      this.$store.dispatch("home/loadMore", this.offset++);
    },
    log(e) {
      // 
      e.refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
.hot {
  height: 100%;
}
.nav {
  background-color: #fff;
  width: 100%;
  height: 44px;
  font-size: 15px;
  color: #666;
  border-bottom: 1PX  solid #666;
  i {
    font-size: 15px;
    // color: #f03d37;
  }
  .city {
    width: 62px;
  }
  .serch {
    width: 45px;
    i {
      font-size: 20px;
      color: #f03d37;
    }
  }

  ._nav {
    padding: 0 10px;
    li {
      font-weight: 1000;
    }

    flex: 1;
  }
}
.scr-X {
  background-color: #fff;
    

  padding: 12px 0 12px 10px;
  h2 {
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
  }
  .scroll-wrap {
    height: 135px;
    width: 100%;
    overflow: hidden;
    div {
      width: max-content;
      overflow: hidden;
    }
    ul {
      width: max-content;
      overflow: hidden;

      li {
        float: left;
        position: relative;
        width: 85px;
        margin-right: 10px;
        .mask {
          display: block;
          width: 100%;

          position: absolute;
          bottom: 23px;
          padding-left: 4px;
          background-image: -webkit-linear-gradient(
            top,
            rgba(77, 77, 77, 0),
            #000
          );
          background-image: linear-gradient(-180deg, rgba(77, 77, 77, 0), #000);
          p {
            color: #faaf00;

            color: #faaf00;
            font-size: 11px;
            font-weight: 600;
          }
        }
        img {
          width: 85px;
          height: 115px;
        }
        p {
          width: 100%;
          font-weight: bold;
          font-size: 13px;
          color: #222;
          margin: 5px 0;
        }
      }
    }
  }
}
.content {
  position: absolute;
  background-color: #f5f5f5;
  left: 0;
  right: 0;
  overflow: hidden;
  top: 94px;
  bottom: 48px;
  .show-ul {
      background-color: #fff;
      margin-top: 10px;
    padding-left: 10px;
    li {
      height: 114px;

      display: flex;
      align-items: center;
      ._nav {
        flex: 1;
      }
      .show-wrap {
        flex: 1;
        height: 114px;
        border-bottom: 1PX#666 solid;
        padding: 12px 0;
        margin-left: 12px;
      }
      .info {
        width: 100%;
        overflow: hidden;
        .move-name {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        p {
          width: 100%;
          color: #666;
          font-size: 13px;
          .nm {
            font-size: 17px;
            color: #333;
            font-weight: 700;
            padding-right: 5px;
          }

          img {
            width: 43px;
            height: 13px;
          }
        }
        .wish {
          color: #faaf00;
          font-size: 15px;
          font-weight: 600;
        }
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .buy {
        width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        box-sizing: border-box;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        white-space: nowrap;
        font-size: 12px;
        cursor: pointer;
        margin-right: 10px;
      }
      .play {
        background-color: #f03d37;
      }
      .noPlay {
        background-color: #3c9fe6;
      }
      img {
        width: 64px;
        height: 90px;
      }
    }
  }
}
</style>
