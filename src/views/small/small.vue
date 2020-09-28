<template>
  <div class="small">
    <iscroll-view class="content" @scrollStart="log" ref="playListCat">
      <div>
        <ul>
          <li v-for="item in video" :key="item.id">
          <div class="cover" @click="playVideo(item.video.url,item)"
          :style="{background:`url(${item.images[0].url}) center no-repeat`,backgroundSize: 'cover'}"
          >

            <div class="mask"><p>
            {{item.title}}
            </p>
            <div class="user j-s-a">
                <img :src="item.user.avatarurl" alt="" class="avatr">
                <span>{{item.user.nickName}}</span>
            </div>
            
            </div>
            </div>
            
          </li>
        </ul>
      </div>
    </iscroll-view>

      <router-view></router-view>

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
      video: (state) => state.small.video,
      //   showList: (state) => state.home.comingMovie,
    }),
  },
  inject:['setTitle'],
  created() {
    this.$store.dispatch("small/loadVideo");
    this.setTitle('猫眼电影')
  },
  mounted() {},
  methods: {
    playVideo(url,obj){
      this.$store.commit('small/setVideoUrl',url)
       this.$store.commit('small/setVideoDetail',obj)
      this.$router.push('/small/smallPlay');

    },
    log(e) {
      //
      e.refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
.small {
 position: absolute;
 top: 44px;
 bottom: 48px;

}
.content {
    padding:  6px 0;
  ul{
      display: flex;
      flex-wrap: wrap;
      li{
background-size: cover;
          margin: 2px 0;
          width: 50%;
          height: 300px;
          position: relative;
      }
  }
  width: 100%;
  height: 100%;
  overflow: hidden;
  .cover {
    position: relative;
    width: 185px;
    height: 100%;
    display: block;
  }
   .mask {
          display: block;
          width: 100%;

          position: absolute;
          bottom: 0px;
          padding: 10px;
          background-image: -webkit-linear-gradient(
            top,
            #000,
            rgba(77, 77, 77, 0),
          );
          background-image: linear-gradient(-180deg,  rgba(77, 77, 77, 0),#000,);
          p {
           color: #fff;
            font-size: 17px;
           
          }
        }
  .user{
    padding: 10px;
    color: #fff;
    img{
      border-radius: 50%;
      width: 22px;
      height: 22px;
    }
  }
}
</style>
