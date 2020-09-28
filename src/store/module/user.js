import axios  from 'axios'
export default {
    namespaced: true,
    state: {
    login:false,
    },
    mutations: {
        setVideo(state,arr){
            state.video = arr
        },
        setVideoUrl(state,url){
            state.videoUrl = url
        },
        setVideoDetail(state,arr){
            state.videoDetail = arr
        },
        setLogin(state,bool){
            state.login = bool
        }
    },
    actions: {
        // https://m.maoyan.com/asgard/asgardapi/sns/common/feed/channel/list.json?uuid=EB59D420FA4D11EA84B2FD17908B7FDB9C740CE045034FE1B16DFFCF0325448F&token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&channelId=4&feedChannelId=105&timestamp=1600732630745&offset=10
        loadVideo(context){
            axios.get('asgard/asgardapi/sns/common/feed/channel/list.json?uuid=EB59D420FA4D11EA84B2FD17908B7FDB9C740CE045034FE1B16DFFCF0325448Ftoken=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&channelId=4&feedChannelId=105&timestamp=1600732630745&offset=10').then(res =>{
                console.log(res.data.data.feeds)
                context.commit('setVideo',res.data.data.feeds)
            })
         
        },
       
    }
}