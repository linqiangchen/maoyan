<template>
  <div class="hot">
    <iscroll-view class="content" @scrollStart="log" @pullUp="reflsh">
      <div>
        <ul class="show-ul">
          <li class v-for="(item ,index) in showList" :key="index" @click="toMovie(item.id)"
          
          >
            <img v-lazy="item.img" alt />
            <div class="show-wrap j-s-a one-line">
              <div class="info one-line">
                <p class="one-line move-name j-s-a">
                  <span class="nm one-line">{{item.title}}</span>
                  <span class="grade" v-if="item.grade!=='暂无评分'">
                    <i >{{item.grade}}</i>分
                  </span>
                  <span v-else class="grade">暂无评分</span>
                </p>
                <p class="one-line wish">{{item.english}}</p>
                <p class="one-line">{{item.actors}}</p>
                <p class="one-line">{{item.showInfo}}</p>
              </div>
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
      offset: 0,
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
      showList: (state) => state.home.classics,
    }),
  },
  created() {
    this.toggleTime();

    this.$store.dispatch("home/loadClassics",0);


    // loadExpected
    // loadComingMovie
  },
  mounted() {},
  methods: {
     toMovieCinema(id){
      this.$store.commit('movie/setMovieId',id)
       this.$store.dispatch('movie/loadMovieInfo',id)
        //  this.$store.dispatch("movie/loadMovieInfo", 1211269);
      this.$store.dispatch("home/loadMoveCinema", id);
       this.$router.push('/movieInfo')
    },
    imax(str) {
      return str === "v2d imax" ? "../assets/2d.png" : "../assets/3d.png";
    },
      toMovie(id){
        this.$store.commit('movie/setMovieId',id)
       this.$store.dispatch('movie/loadMovieInfo',id)
       this.$router.push('/movie')
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
        this.offset +=10
      if (this.offset > 100) {
        return;
      }
      this.$store.dispatch("home/loadClassics",this.offset);
    },
    log(e) {
      // console.log(1111);
      e.refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  overflow: hidden;
  top: 94px;
  bottom: 48px;
  .show-ul {
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

        padding: 12px 0;
        margin-left: 12px;
      }
      .info {
        width: 100%;
        overflow: hidden;
        color: #666;
        font-size: 13px;
        .move-name {
          display: flex;
          align-items: center;
        }
        p {
          width: 100%;
          color: #666;
          font-size: 13px;
          i {
            color: #faaf00;
            font-size: 15px;
            margin-right: 5px;
          }
          .nm {
            font-size: 17px;
            color: #333;
            font-weight: 700;
            padding-right: 5px;
          }
          .grade {
            margin-right: 20px;
          }
          img {
            width: 43px;
            height: 13px;
          }
        }

        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      img {
        width: 64px;
        height: 90px;
      }
    }
  }
}
</style>
