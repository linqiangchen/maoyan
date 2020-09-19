<template>
  <div class="city">
    <iscroll-view class="content" @scrollStart="log" ref="iscroll">
      <div>
        <div class="wrap"  ref="box1">
          <div class="tit">定位城市</div>
          <ul>
            <li >{{cityName}}</li>
          </ul>
        </div>
        <div class="wrap"  ref="box2">
          <div class="tit">最近访问城市</div>
          <ul>
            <li>深圳</li>
            <li>武汉</li>
            <li>广州</li>
          </ul>
        </div>
        <div class="wrap" ref="box3">
          <div class="tit">热门城市</div>
          <ul>
            <li v-for="item in city.hotCity" :key="item.id"  @click="selectCity(item.id,item.nm)">{{item.nm}}</li>
          </ul>
        </div>
        <div class="wrap" v-for="(val,key,i) in city.letterMap" :key="i"  :ref="key">
          <div class="tit">{{key}}</div>
          <ul>
            <li v-for="item in val" :key="item.id" class="one-line" @click="selectCity(item.id,item.nm)">{{item.nm}}</li>
          </ul>
        </div>
      </div>
    </iscroll-view>
    <div class="right">
        <ul>

             <li v-for="(val,key,i) in city.letterMap" :key="i">
             <a  @click="to(key)"> {{key}}</a>
               
             </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "city",
  methods: {
    log(e) {
      e.refresh();
    },
    to(val){
      console.log(val);
        const el = this.$refs[val][0]
        console.log('el: ', el);
        this.$refs.iscroll.iscroll.scrollToElement(el,{})
    },
    selectCity(id,nm){
        this.$store.commit('home/setCityId',{id,nm});
        this.$store.dispatch('home/loadCinemaSelect');
          this.$store.dispatch('home/loadCinemas')
        setTimeout(()=>{
             this.$router.back()
        },0)
       
    }
  },
  computed: {
    ...mapState({
      city: (state) => state.home.city,
       cityName: (state) => state.home.cityName,
      //   showList: (state) => state.home.comingMovie,
    }),
  },
};
</script>

<style lang="scss" scoped>
.city {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ebebeb;
  //   background-color: aqua;
}
.content {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  overflow: hidden;
}
.right{
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    right: 5px;
    ul{
        text-align: right;
        li{
            margin:  10px 0;
        }
        a{
            font-size: 12px;
            color: #333;
        }
    }
}
.wrap {
  .tit {
    background-color: #ebebeb;
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
  }
  ul {
    background-color: #f5f5f5;
    padding: 10px 15px;
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 10px 0;
      margin-right: 15px;
      width: 100px;
      height: 33px;
      border-radius: 4px;
      text-align: center;
      line-height: 33px;
      background-color: #fff;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>