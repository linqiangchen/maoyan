<template>
  <div class="movie">
    <iscroll-view class="content" @scrollStart="log" ref="playListCat">
      <div>
        <ul>
          <li v-for="item in video" :key="item.id">
          <div class="cover" @click="playVideo(item.video.url)">
            <img :src="item.images[0].url" alt class="cover" />
            <div class="mask"><p>
            {{item.title}}
            </p></div>
            </div>
            <div class="user j-s-a">
                <img :src="item.user.avatarurl" alt="" class="avatr">
                <span>{{item.user.nickName}}</span>
            </div>
          </li>
        </ul>
      </div>
    </iscroll-view>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";
export default {
  name: "Video",
  components: {
    HelloWorld,
  },
  data() {
    return {
      Index: 0,
    };
  },

  computed: {
    ...mapState({
      // city: (state) => state.home.city,
      video: (state) => state.video.video,
      //   showList: (state) => state.home.comingMovie,
    }),
  },

  created() {
    this.$store.dispatch("video/loadVideo");
  },
  mounted() {},
  methods: {
    playVideo(url){
      this.$store.commit('video/setVideoUrl',url)
      this.$router.push('/video/videoPlay');

    },
    log(e) {
      //
      e.refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
.movie {
 position: absolute;
 top: 44px;
 bottom: 48px;

}
.content {
  
  width: 100%;
  height: 100%;
  overflow: hidden;
  .cover {
    position: relative;
    width: 100%;
  }
   .mask {
          display: block;
          width: 100%;

          position: absolute;
          top: 0px;
          padding: 10px;
          background-image: -webkit-linear-gradient(
            top,
            rgba(77, 77, 77, 0),
            #000
          );
          background-image: linear-gradient(-180deg, #000, rgba(77, 77, 77, 0),);
          p {
           color: #fff;
            font-size: 17px;
           
          }
        }
  .user{
    img{
      border-radius: 50%;
      width: 22px;
      height: 22px;
    }
  }
}
</style>
