import Vue from 'vue'
import Vuex from 'vuex'
import home from './module/home'
import movie from './module/movie'
import video from './module/video'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    home,
    movie,
    video
  }
})
