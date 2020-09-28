import { mapState } from 'vuex';
<template>
  <div class="videoPlay">
    <video :src="videoUrl" controls autoplay></video>
    <div class="info">
    <h3>{{videoDetail.shareInfo.content}}</h3>
    <p>{{videoDetail.shareInfo.title}}</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:"smallPlay",
     computed: {
    ...mapState({
      videoUrl: (state) => state.small.videoUrl,
     videoDetail: (state) => state.small.videoDetail,
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
        width: 100%;
        background-color: #000;
        video{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
        }
        .info{
            position: absolute;
            bottom: 50px;
            width: 100%;
            padding:  0 10px;
            color: #fff;
            line-height: 30px;
            h3{
                font-size: 19px;
            }
            p{
                font-size: 15px;
            }
        }
    }
</style>