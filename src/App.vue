<template>
  <div id="app">
    <div class="header j-s-a">
      <span></span>
      <h2 class="t-c">猫眼电影</h2>
      <span class="j-s-a">
        <i class="iconfont icontoggle"></i>
      </span>
    </div>

    <div class="footer">
      <ul class="j-s-a">
        <li @click="handleActive(index)" v-for="(item,index) in navList" :key="item.id">
          <router-link
            to="/"
            class="d-j t-c"
            :class="{active:active===index}"
            @click="handleActive(index)"
          >
            <i :class="item.icon " class></i>
            <span>{{item.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      navList: [
        {
          id: 0,
          title: "电影/影院",
          path: "",
          icon: "iconfont icondianying",
        },
        {
          id: 1,
          title: "视频",
          path: "",
          icon: "iconfont iconvideo",
        },
        {
          id: 2,
          title: "小视频",
          path: "iconfont",
          icon: "iconfont iconxiaoshipin",
        },
        {
          id: 3,
          title: "我的",
          path: "",
          icon: "iconfont iconmy",
        },
      ],
      active: 0,
    };
  },
  methods: {
    handleActive(index) {
      this.active = index;
    },
  },
 created(){
    this.$store.dispatch("home/loadCinemaSelect");
 }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  // text-align: center;
  // color: #2c3e50;
}
.header {
  background: #e54847;
  width: 100%;
  height: 50px;
  font-size: 18px;
  color: #fff;
  span {
    width: 50px;
    height: 50px;
  }
  h2 {
    flex: 1;
  }
  i {
    margin-left: 20px;
    font-size: 18px;
    color: #fff;
  }
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.footer {
  background-color: #fff;
  position: absolute;
  border-top: 1px #d8d8d8 solid;
  bottom: 0;
  width: 100%;
  height: 48px;
  ul {
    height: 100%;
    justify-content: space-around;
  }
  li {
    height: 100%;
  }
  a {
    height: 100%;
    justify-content: space-around;
  }
  span {
    font-size: 12px;
    color: #696969;
  }

  i {
    font-size: 25px;
    color: #696969;
  }
  .active {
    span {
      color: #f03d37;
    }
    i {
      color: #f03d37;
    }
  }
}
</style>
