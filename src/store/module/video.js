import axios  from 'axios'
export default {
    namespaced: true,
    state: {
      video:[],
      videoUrl:''
    },
    mutations: {
        setVideo(state,arr){
            state.video = arr
        },
        setVideoUrl(state,url){
            state.videoUrl = url
        },
      
    },
    actions: {
        // https://m.maoyan.com/asgard/asgardapi/sns/common/feed/channel/list.json?uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&channelId=4&feedChannelId=1614507&timestamp=1600484443462&offset=15
        loadVideo(context){
            axios.get('/asgard/asgardapi/sns/common/feed/channel/list.json?uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&channelId=4&feedChannelId=1614507&timestamp=1600484443462&offset=15').then(res =>{
                
                context.commit('setVideo',res.data.data.feeds)
            })
         
        },
       
    }
}