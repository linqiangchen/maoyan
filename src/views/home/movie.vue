<template>
  <div class="movie" v-if="movieInfo">
    <iscroll-view
      class="content"
      @scrollStart="log"
      :style="{background:movieInfo.backgroundColor}"
    >
      <div>
        <h3>猫眼电影 > {{movieInfo.nm}}</h3>
        <div class="info flex">
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
        <div class="real">
          <div class="top flex">
            <img src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/logo.png" alt />
            <span>实时口碑</span>
          </div>
          <div class="con">
            <p>
              <span class="num">
                {{wish.toLocaleString()}}
                <span>人想看</span>
              </span>
            </p>
          </div>
        </div>
        <div class="discrible">
          <div class="tit j-s-a">
            <span>简介</span>
            <span>展开</span>
          </div>
          <p class="line3">{{movieInfo.dra}}</p>
        </div>
        <div class="star">
          <div class="tit j-s-a">
            <span>演职人员</span>
            <span>全部</span>
          </div>
          <iscroll-view
            class="star-scroll"
            @scrollStart="log"
            ref="iscrollstar"
            
          >
          <ul class="flex">
          <li v-for="(item , index) in starList" :key="index">
            <img :src="item.img" alt="">
            <p class="name">{{item.name}}</p>
            <p class="desc">{{item.role}}</p>
          </li>
          </ul>
          </iscroll-view>
        </div>
        <div class="video">
          <div class="tit j-s-a">
            <span>视频推荐</span>
            <span>全部</span>
          </div>
          <iscroll-view
            class="star-scroll"
            @scrollStart="log"
            ref="iscroll1"
          >
          <ul class="flex">
          <li v-for="(item , index) in movieInfo.photos" :key="index">
            <img :src="handleImg(item)" alt="">
          </li>
          </ul>
          </iscroll-view>
        </div>
        <div class="photo">
          <div class="tit j-s-a">
            <span>剧照</span>
            <span>全部</span>
          </div>
          <iscroll-view
            class="star-scroll"
            @scrollStart="log"
            ref="iscroll2"
           
          >
          <ul class="flex">
          <li v-for="(item , index) in movieInfo.photos" :key="index">
            <img :src="handleImg(item)" alt="">
       
          </li>
          </ul>
          </iscroll-view>
        </div>
      </div>
    </iscroll-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import star from "./star.js";
export default {
  data() {
    return {
      wish: 0,
      timer: 0,
      star
    };
  },
  created() {
    // this.$store.dispatch("movie/loadMovieInfo", 1211269);
      this.$store.dispatch("movie/loadStar");
    // 
    // 
    axios
      .get(
        "/asgard/asgardapi/review/realtime/data.json?movieId=" + this.movieId
      )
      .then((res) => {
        this.wish = res.data.data.wish;
      });

    this.timer = setInterval(() => {
      axios
        .get(
          "/asgard/asgardapi/review/realtime/data.json?movieId=" + this.movieId
        )

        .then((res) => {
          this.wish = res.data.data.wish;
        });
    }, 10000);
  },
  computed: {
    ...mapState({
      movieInfo: (state) => state.movie.movieInfo,
      movieId: (state) => state.movie.movieId,
      starList :(state) => state.movie.star,
      //    cityName: (state) => state.home.cityName,
      //   showList: (state) => state.home.comingMovie,
    }),
  },
    mounted() {
    this.$nextTick(() => {
      this.$refs.iscrollstar.iscroll.options.scrollX = true;
    this.$refs.iscrollstar.iscroll.options.scrollY = false;
     this.$refs.iscroll1.iscroll.options.scrollX = true;
    this.$refs.iscroll1.iscroll.options.scrollY = false;
     this.$refs.iscroll2.iscroll.options.scrollX = true;
    this.$refs.iscroll2.iscroll.options.scrollY = false;
      // this.$refs.singerName.iscroll.options.scrollX = true;
    });
  },
  methods: {
    log(e) {
      //
      e.refresh();
    },
    handleImg(url) {
      return url ? url.replace("/w.h", "") : "";
    },
    handleNum() {},
    handleArr(arr) {
      return arr ? arr.split(",").join(" / ") : "";
    },
  },
};
</script>

<style scoped lang="scss">
.movie {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 21px 16px;
    padding-bottom: 0;
    h3 {
      font-size: 14px;
      color: #ccc;
      margin-bottom: 15px;
    }
    .info {
      width: 100%;
      height: 138px;
      .info-left {
        img {
          width: 100px;
          height: 138px;
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
    .real {
      background-color: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 0.06rem 0 hsla(0, 0%, 100%, 0.03);
      border-radius: 5px;
      margin-top: 15px;
      padding: 10px 12px;
      height: 128px;
      .top {
        align-items: center;
        span {
          margin-left: 10px;
          font-size: 12px;
          color: #fff;
        }
        img {
          width: 14px;
          height: 14px;
        }
      }
      .con {
        height: 80px;
        line-height: 80px;
        text-align: center;
        border-bottom: 1PX  #ccc solid;
        p {
          .num {
            font-size: 28px;
            color: #ffbb29;
            margin-right: 4px;
          }
          span {
            color: #fff;
          }
        }
      }
    }
    .tit {
      margin-top: 20px;
      span {
        font-size: 15px;
        color: #fff;
      }
    }
    .discrible {
      p {
        margin-top: 15px;
        font-size: 15px;
        line-height: 25px;
        color: #fff;
      }
    }
    .star {
        .star-scroll{
            margin-top: 15px;
            height: 150px;
            width: 100%;
            overflow: hidden;
            div{
                width: max-content;
                ul{
                    width: max-content;
                    li{
                        margin-right: 10px;
                        text-align: center;
                        img{
                    
                            height: 112px;
                        }
                        p{
                            font-size: 12px;
                            line-height: 15px;
                            width: 100%;
                           text-align: center; 
                           color: #666;
                        }
                        .name{
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
    .video{
          .star-scroll{
            margin-top: 15px;
            height: 100px;
            width: 100%;
            overflow: hidden;
            div{
                width: max-content;
                ul{
                    width: max-content;
                    li{
                        margin-right: 10px;
                        text-align: center;
                        img{
                    
            height: 93px;
                        }
                     
                    }
                }
            }
        }
        img{
            width: 140px;
            height: 93px;
        }
    }
    .photo  {
          .star-scroll{
            margin-top: 15px;
            height: 120px;
            width: 100%;
            overflow: hidden;
            div{
                width: max-content;
                ul{
                    width: max-content;
                    li{
                        margin-right: 10px;
                        text-align: center;
                        img{
                
            height: 93px;
                        }
                     
                    }
                }
            }
        }
        img{
            width: 140px;
            height: 93px;
        }
    }
  }
}
</style>