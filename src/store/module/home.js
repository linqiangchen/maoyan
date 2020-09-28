import axios from 'axios'
import city from '../module/city'
import movieDetail from '../../data/movieDetail'
const uuid = '8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10'
const token = 'YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw'
function getMyDay(){
    let date = new Date()
    let str = date.getFullYear() + '-' + (date.getMonth()*1 +1<10?'0'+(date.getMonth()*1 +1):date.getMonth()*1 +1)  + '-' +date.getDate()
    
    return str
}
export default {
    namespaced: true,
    state: {
        hotMovie: [],
        showMove: [],
        movieIds: [],
        nextBanner: [],
        cinemas: [],
        cinemaSelect:[],
        selected:{
            districtId:-1,
            areaId:-1,
            lineId:-1,
            stationId:-1,
            brandId:-1,
            serviceId:-1,
            hallType:-1,
        },
        cinemaId:'',
        cineamDetail:'',
        classics: [],
        topRated: [],
        comingMovie: [],
        comingMovieIds: [],
        Expected: [],
        city,
        cityId:30,
        cityName:'深圳',
        movieCinema:[]

    },
    mutations: {
        setHotMovie(state, obj) {
            state.hotMovie = obj
        },
        setCityId(state,obj){ 
            state.cityId = obj.id
            state.cityName = obj.nm
            for (const key in state.selected) {
                if (state.selected.hasOwnProperty(key)) {
                    state.selected[key] = -1;
                    
                }
            }
        },
        setShowMove(state, arr) {
            state.showMove.push(...arr)
        },
        setHotId(state, arr) {
            state.movieIds = arr
        },
        setCinemas(state, arr) {
            state.cinemas = arr
        },
        setClassics(state, arr) {
            state.classics.push(...arr)
        },
        setTopRated(state, arr) {
            state.topRated = arr
        },
        setComingMovie(state, arr) {
            state.comingMovie.push(...arr)
        },
        setComingMovieIds(state, arr) {
            state.comingMovieIds = arr
        },
        setExpected(state, arr) {
            state.Expected = arr
        },
        setCinemaSelect(state, arr) {
            state.cinemaSelect = arr
        },
        setSelected(state, obj) {

            state.selected[obj.type] = obj.value
        },
        setMovieCinema(state, obj) {
            
            state.movieCinema = obj
        },
        setCinemaDetail(state,obj){
            state.cineamDetail = obj
        }
    },
    actions: {
        // https://m.maoyan.com/ajax/moreComingList?token=&movieIds=


        //热映
        // https://m.maoyan.com/ajax/movieOnInfoList?token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10


        //根据id获取电影
        // https://m.maoyan.com/ajax/moreComingList?ci=30&token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&limit=20&movieIds=



        //电影详情
        //https://m.maoyan.com/ajax/detailmovie?movieId=1247287&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10


        //最受期待的电影
        //https://m.maoyan.com/ajax/mostExpected?ci=30&limit=10&offset=0&token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10

        //即将上映的电影
        // https://m.maoyan.com/ajax/comingList?ci=30&token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&limit=10&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10


        //影院 districtId=32区id areaId 商区id lineId 地铁线路id stationId 地铁站id brandId 品牌id serviceId 服务id hallType 特殊厅id
        // districtId=-1请求地铁 lineId=-1请求商区

        // https://m.maoyan.com/ajax/moreCinemas?day=2020-09-18&offset=0&limit=20&districtId=3056&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=false&reqId=1600411323603&cityId=217&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10

        // http://localhost:8080/ajax/moreCinemas?day=2020-09-18&offset=0&limit=20&districtId=3056&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1600322140959&cityId=30&optimus_uuid=%27%20+%20uuid



        // https://m.maoyan.com/ajax/moreCinemas?day=2020-09-17&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1600322140959&cityId=30&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10

        // 每个城市对应影院选项
        // https://m.maoyan.com/ajax/filterCinemas?ci=30&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10

        //选择城市对应的影院列表 ci城市id
        // https://m.maoyan.com/ajax/filterCinemas?ci=57&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10

        //影院详情，上映电影
        // https://m.maoyan.com/ajax/cinemaDetail?cinemaId=6326&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10


        // 电影购票页面
        // /ajax/movie?forceUpdate=1600336048737   1600338547614
        // axios.post('/ajax/movie',{
        //     movieId: 346210,
        //     day: '2020-09-17',
        //     offset: 0,
        //     limit: 20,
        //     districtId: -1,
        //     lineId: -1,
        //     hallType: -1,
        //     brandId: -1,
        //     serviceId: -1,
        //     areaId: -1,
        //     stationId: -1,
        //     updateShowDay: true,
        //     reqId: 1600338547614,
        //     cityId: 30,
        //     optimus_uuid:' 8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3',
        //     optimus_risk_level: 71,
        //     optimus_code: 10,}).then(res =>{
        //     
        // })
        //最受好评的电影
        // https://m.maoyan.com/ajax/topRatedMovies?token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10


        //经典电影 offset 分页
        //https://m.maoyan.com/ajax/moreClassicList?sortId=1&showType=3&limit=10&offset=0&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10


        // https://m.maoyan.com/ajax/comingList?ci=30&token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&limit=10&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10
        // async loadHotMove(context) {
        //     axios.get('/data/hot.json').then(res => {

        //         res.data.coming.forEach(item => {
        //             item.img = item.img.replace('/w.h', '')
        //         })
        //         // context.commit('setShowMove',res.data.coming)
        //     })
        //     const {
        //         data
        //     } = await axios.get('/data/hot.json')
        //     let hotMove = data.coming.slice(0, 12)
        //     context.commit('setHotMovie', hotMove)
        //     axios.get('/data/hot.json').then(res => {
        //         let arr = res.data.coming.slice(0, 12)
        //         context.commit('setShowMove', arr)
        //     })
        //     // axios.get('/ajax/moreComingList?token=&movieIds=' + movieIds.slice(0,12).join(',')).then(res => {
        //     //     
        //     //     res.data.coming.forEach(item =>{item.img = item.img.replace('/w.h','')})
        //     //     context.commit('setShowMove',res.data.coming)
        //     // })

        // },
        // async loadMore(context, offset) {
        //     const {
        //         data
        //     } = await axios.get('/data/hot.json')
        //     context.commit('setShowMove', data.coming.slice(12 * offset, 12 * offset + 12))
        // }
        async loadTopRated(context) { //最受好评
            axios.get('/ajax/topRatedMovies?token=' + token + '&optimus_uuid=' + uuid).then(res => {
                let div = document.createElement("div");
                div.innerHTML = res.data
                let a = [...div.querySelectorAll(".top-rated-item")].map(item => ({
                    "id": item.getAttribute('data-id'),
                    "nm": item.querySelector(".name").innerText,
                    "img": item.querySelector("img").src,
                    "wish": item.querySelector(".wish-num") && item.querySelector(".wish-num").innerText,
                    "sc": item.querySelector(".rated-score") ? item.querySelector(".rated-score").innerText : 0,
                }));
                
                context.commit('setTopRated', a)
            })
        },
        async loadComingMovie(context) { //即将上映
            axios.get('/ajax/comingList?ci=30&token=' + token + '&optimus_uuid=' + uuid).then(res => {

                let coming = res.data.coming;
                coming.forEach(item => {
                    item.img = item.img.replace('/w.h', '')
                })
                context.commit('setComingMovie', coming)
                
                context.commit('setComingMovieIds', res.data.movieIds)
            })
        },
        async loadExpected(context) { //最受期待
            axios.get('http://localhost:3000/detail?id=9012450').then((res)=>{
                console.log(res)
            })
            axios.get('/ajax/mostExpected?ci=30&limit=10&offset=0&token=' + token + '&optimus_uuid=' + uuid).then(res => {
                let coming = res.data.coming;
                coming.forEach(item => {
                    item.img = item.img.replace('/w.h', '')
                })
                axios.get('/ajax/mostExpected?ci=30&limit=10&offset=10&token=' + token + '&optimus_uuid=' + uuid).then(res => {
                    let coming2 = res.data.coming;
                    coming2.forEach(item => {
                        item.img = item.img.replace('/w.h', '')
                    })
                    coming.push(...coming2)
                    
                })
                context.commit('setExpected', coming)
            })
        },
        async loadCinemas(context) { //影院
            // ?day='+day+'&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1600322140959&cityId=30&optimus_uuid=' + uuid
            let day = getMyDay()
            let {districtId,lineId,hallType,brandId,serviceId,areaId,stationId} = context.state.selected
            const url = `?day=${day}&offset=0&limit=20&districtId=${districtId}&lineId=${lineId}&hallType=${hallType}&brandId=${brandId}&serviceId=${serviceId}&areaId=${areaId}&stationId=${stationId}&item=&updateShowDay=false&reqId=1600322140959&cityId=${context.state.cityId}&optimus_uuid=' + uuid`
            
            axios.get('/ajax/moreCinemas'+ url).then(res => {
                let div = document.createElement("div");
                div.innerHTML = res.data
                let a = [...div.querySelectorAll("a")].map(item => ({
                    "id": item.href.split('/shows/')[1],
                    "title": item.querySelectorAll(".title span")[0].innerText,
                    "price": item.querySelector(".title .price") && item.querySelector(".title .price").innerText,
                    "location": item.querySelector(".location-block .flex").innerText,
                    "distance": item.querySelector(".location-block .distance").innerText,
                    "lable": [...item.querySelectorAll(".label-block div")].map(el => ({
                        class: el.className,
                        value:el.innerText
                    })),
                    "img": item.querySelector("img") && item.querySelector("img").src,
                    "discountText": item.querySelector(".discount-label-text") && item.querySelector(".discount-label-text").innerText
                }));
                console.log(JSON.stringify(a))
                context.commit('setCinemas', a)
            })
        },
        async loadCinemaSelect(context) { //城市对应影院
            axios.get('/ajax/filterCinemas?ci='+ context.state.cityId+ '&optimus_uuid=' + uuid).then(res => {
                
                // context.commit('setHotMovie', res.data.movieList)
                context.commit('setCinemaSelect', res.data)
              
            })



        },
        async loadCinemaDetail(context,id) { //影院详情
            
            axios.get('/ajax/cinemaDetail?cinemaId='+id+'&optimus_uuid=8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3&optimus_risk_level=71&optimus_code=10').then(res => {
                
                // context.commit('setHotMovie', res.data.movieList)
                context.commit('setCinemaDetail', res.data)
              
            })


        },
        async loadClassics(context, offset) { //经典电影
            axios.get('/ajax/moreClassicList?sortId=1&showType=3&limit=10&offset=' + offset + '&optimus_uuid=' + uuid).then(res => {
                let div = document.createElement("div");
                div.innerHTML = res.data
                let a = [...div.querySelectorAll("a")].map(item => ({
                    "id": item.href.split('/movie/')[1],
                    "title": item.querySelector(".title").innerText,
                    "english": item.querySelector(".english-title") ? item.querySelector(".english-title").innerText : null,
                    "img": item.querySelector("img").src,
                    "actors": item.querySelector(".actors") ? item.querySelector(".actors").innerText : null,
                    "showInfo": item.querySelector(".show-info") ? item.querySelector(".show-info").innerText : null,
                    "grade": item.querySelector(".grade") ? item.querySelector(".grade").innerText : '暂无评分',
                }));
                context.commit('setClassics', a)
            })
        },

        async loadHotMove(context) { //
            axios.get('/ajax/movieOnInfoList?token=' + token + '&optimus_uuid=' + uuid).then(res => {
               
                res.data.movieList.forEach(item => {
                    item.img = item.img.replace('/w.h', '')
                })
                context.commit('setHotMovie', res.data.movieList)
                context.commit('setHotId', res.data.movieIds)
                axios.get('/ajax/moreComingList?ci=30&token=' + token + '&limit=20&movieIds=' + res.data.movieIds.slice(0, 12).join(',')).then(res => {
                    res.data.coming.forEach(item => {
                        item.img = item.img.replace('/w.h', '')
                    })
                    context.commit('setShowMove', res.data.coming)
                })
            })


        },

        loadMoveCinema(context,obj){
            
            let day =obj.day || getMyDay();
            let {districtId,lineId,hallType,brandId,serviceId,areaId,stationId} = context.state.selected
            axios.post('/ajax/movie',{
            movieId: obj.id,
            day: day,
            offset: 0,
            limit: 20,
            districtId: districtId,
            lineId: lineId,
            hallType: hallType,
            brandId: brandId,
            serviceId: serviceId,
            areaId: areaId,
            stationId: stationId,
            updateShowDay: true,
            reqId: 1600338547614,
            cityId: context.state.cityId,
            optimus_uuid:' 8346F3C0F7E811EA8A202B28784D5F1E036A5087935B423599D63F01A6CADAB3',
            optimus_risk_level: 71,
            optimus_code: 10,}).then(res =>{  
                if(res.data.code === 406){
                    context.commit('setMovieCinema',movieDetail)
                }else{
                    context.commit('setMovieCinema',movieDetail)
                }
               
              
        })     
    },



        // const {
        //     data
        // } = await axios.get('/data/hot.json')
        // let hotMove = data.coming.slice(0, 12)
        // context.commit('setHotMovie', hotMove)
        // axios.get('/data/hot.json').then(res => {
        //     let arr = res.data.coming.slice(0, 12)
        //     context.commit('setShowMove', arr)
        // })



        async loadMore(context, offset) {
            let data = await axios.get('/ajax/moreComingList?ci=30&token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&limit=20&movieIds=' + context.state.movieIds.slice(12 * offset, 12 * (offset + 1)).join(','))
            console.log(data)
            let list = data.data.coming
            list.forEach(item => {
                item.img = item.img.replace('/w.h', '')
            })
            context.commit('setShowMove', list)
        },
        async loadMoreComming(context, offset) {
            
            let data = await axios.get('/ajax/moreComingList?ci=30&token=YqbtZ_gowgRxdeleGuBLaNszTtwAAAAAkgsAAFx09eiSIizSpVlp7RT7CMiet5A7uzGgAwXylHnILTphl_ar0sBuj0NWWPXxitOwLw&limit=20&movieIds=' + context.state.comingMovieIds.slice(12 * offset, 12 * (offset + 1)).join(','))

            let list = data.data.coming
            list.forEach(item => {
                item.img = item.img.replace('/w.h', '')
            })
            context.commit('setComingMovie', list)
        }
    },
    modules: {}
}