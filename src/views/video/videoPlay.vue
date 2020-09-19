import { mapState } from 'vuex';
<template>
  <div class="videoPlay">
    <video :src="videoUrl" controls autoplay></video>
  
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:"videoPlay",
     computed: {
    ...mapState({
      videoUrl: (state) => state.video.videoUrl,

      //   showList: (state) => state.home.comingMovie,
    }),
  },
}
</script>

<style lang="scss" scoped>
    .videoPlay{
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: #fff;
        video{
            width: 100%;
        }
    }
</style>