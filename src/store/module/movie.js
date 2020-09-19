import axios  from 'axios'
export default {
    namespaced: true,
    state: {
        movieId:'',
        com:[],
        movieInfo:{},
        star:[],
        video:[]
    },
    mutations: {
        setStar(state,arr){
            state.star = arr
        },
        setMovieId(state,id){
            state.movieId = id
        },
        setMovieInfo(state,obj){
            state.movieInfo = obj
        }
    },
    actions: {
        loadStar(context){
            
            axios.get('asgard/movie/1277457?$from=canary#').then(res => {//加载演员列表
                let div = document.createElement("div");
                div.innerHTML =res.data
             let star =   [...div.querySelectorAll('.actor-list li')]
              let arr =   star.map(item => ({
                    img:item.querySelector('img').src,
                    name:item.querySelector('.name')&&item.querySelector('.name').innerText,
                    role:item.querySelector('.role')&&item.querySelector('.role').innerText,
                }))
                context.commit('setStar' ,arr )
                let video =   [...div.querySelectorAll('.videos-list li')]
              let arr2 =   video.map(item => ({
                    img:item.querySelector('img').src,
                   href:'/asgard' + item.querySelector('a').href.split('/asgard')[1],
                }))
                let comment =  [...div.querySelectorAll('.discussion article')]
                let arr3 =   comment.map(item => ({
                    avatar:item.querySelector('.avatar').src,
                    level:item.querySelector('.level-icon').src,
                   name: item.querySelector('.name')&&item.querySelector('.name').innerText,
                   grade:item.querySelector('.grade-score')&&item.querySelector('.grade-score').innerText,
                   con:item.querySelector('.comment-content').innerText,
                   time:item.querySelector('.time').innerText,
                   praise:item.querySelector('.praise-num').innerText,
                   comNum:item.querySelector('.comments-num').innerText
                }))
                

                // discussion
            //    
            })
        },
        loadMovieInfo(context,id){
            //https://m.maoyan.com/ajax/detailmovie?movieId=1247287&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10

            // https://m.maoyan.com/asgard/asgardapi/review/realtime/data.json?movieId=346210
            context.commit('setMovieId',id)
            axios.get('/ajax/detailmovie?movieId='+id+'&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10').then(res => {
                
                context.commit('setMovieInfo',res.data.detailMovie)
            })
        }
    }
}