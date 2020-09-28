import axios from 'axios'
export default {
    namespaced: true,
    state: {

        order: [
            {
                id:1,
            cinema: '嘉福国际影城',
            movie: {
                img: '//p1.meituan.net/114.160/movie/04de313fdd7f3835563d3c4bdfb980735556062.jpg',
                name: '你的名字'
            },
            plist:{
                time:'2016-12-04 ',
                tm:'12:25',
                hall:'3号厅',
                select:[
                    {
                        row:6,
                        column:8
                    }
                ],
               
            },
            price:46,
            count:1
        },    {
            id:2,
            cinema: '嘉福国际影城',
            movie: {
                img: '//p1.meituan.net/114.160/movie/04de313fdd7f3835563d3c4bdfb980735556062.jpg',
                name: '你的名字'
            },
            plist:{
                time:'2016-12-04 ',
                tm:'12:25',
                hall:'3号厅',
                select:[
                    {
                        row:6,
                        column:8
                    }
                ],
             
            },
            price:46,
            count:1
        }],
    },
    mutations: {
        setOrder(state, arr) {
            state.order.unshift(arr)
        },

    },
    actions: {

    }
}