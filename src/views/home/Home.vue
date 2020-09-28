<template>
  <div class="home">
    <div class="nav j-s-a">
      <div class="city t-c" @click="$router.push('/city')">
        <span>{{cityName}}</span>
        <i class="iconfont iconDownarrow-filled"></i>
      </div>
      <div class="_nav">
        <ul class="j-s-a">
          <li v-for="(item ,index) in navList" :key="item.id"
          :class="{active:item.id === Index}"
           @click="action(index)">{{item.title}}</li>
        </ul>
      </div>

      <div class="serch t-c">
        <i class="iconfont iconsearch-b"></i>
      </div>
    </div>
   <keep-alive>
     <router-view></router-view>
   </keep-alive>
    </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { createLogger, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      Index:0,
      notShow:true,
      navList: [
        {
          id: 0,
          title: "热映",
          path:'/hot'
        },
        {
          id: 1,
          title: "影院",
          path:'/cinema'
        },
        {
          id: 2,
          title: "待映",
          path:'/coming'
        },
        {
          id: 3,
          title: "经典电影",
          path:'/classics'
        },
      ],
    };
  },

     computed: {
    ...mapState({
      // city: (state) => state.home.city,
       cityName: (state) => state.home.cityName,
      //   showList: (state) => state.home.comingMovie,
    }),
  },
  inject:['setTitle','showBack'],
  created() {
this.showBack(false)
    this.$store.dispatch("home/loadCinemaSelect");

 this.setTitle('猫眼电影')
      // this.$store.dispatch("home/loadComingMovie");
       
      // loadExpected
      // loadComingMovie

  },
  mounted() {
     this.Index = this.navList.findIndex(item => item.path === this.$route.path)
  },
  watch:{
      "$route"(newVal){
        this.Index = this.navList.findIndex(item => item.path === newVal.path)
        
      },
        minShowBack(newVal){
          
        }
  },
  methods: {
   action(index){
     
     if(index === this.Index){
       return
     }

     this.Index = index;
     
     this.$router.replace(this.navList[index].path)
   }
   
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #f5f5f5;
}
.nav {
  background-color: #fff;
  width: 100%;
  height: 44px;
  font-size: 15px;
  color: #666;
  border-bottom: 1PX solid #666;
  .active{
    color: #333;
  }
  i {
    font-size: 15px;
    // color: #f03d37;
  }
  .city {
    width: 62px;
  }
  .serch {
    width: 45px;
    i {
      font-size: 20px;
      color: #f03d37;
    }
  }

  ._nav {
    padding: 0 10px;
    li {
      font-weight: 1000;
    }

    flex: 1;
  }
}

</style>
