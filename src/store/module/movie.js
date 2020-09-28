import axios  from 'axios'
export default {
    namespaced: true,
    state: {
        movieId:'',
        com:[],
        movieInfo:{},
        star:[],
        video:[],
        movieName:'八百',
        movieImg:"http://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg",
        plist:'',
        tacit: [{
            row:5,
            column:9
        }],
        count:2,
        price:140,
        cinema:''
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
        },
        setCinema(state,obj){
            state.cinema = obj
        },
        setSelect(state,obj){
            state.tacit = obj.tacit,
            state.count = obj.count,
            state.price = obj.price
        },
        setMovieDetail(state,obj){
            state.movieName = obj.name
            state.movieImg = obj.movieImg
            state.plist = obj.plist
        }
    },
    actions: {
        loadStar(context,id){
            
            axios.get('http://localhost:3000/data?movieId=' +context.state.movieId).then(res => {//加载演员列表
                let div = document.createElement("div");
                div.innerHTML =res.data
             let star =   [...div.querySelectorAll('.actor')]
              let arr =   star.map(item => ({
                    img:item.querySelector('img').getAttribute('data-src'),
                    name:item.querySelector('.name')&&item.querySelector('.name').innerText.trim(),
                    role:item.querySelector('.role')&&item.querySelector('.role').innerText.trim(),
                }))
                
                context.commit('setStar' ,arr )
                let video =   [...div.querySelectorAll('.top-list')]
              let arr2 =   video.map(item => ({
                    img:item.querySelector('img').src,
                   href:item.querySelector('a').href,
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