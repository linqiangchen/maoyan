
<template>
  <div id="myOrder">
    <ul>
      <li v-for="item in order" :key="item.id">
        <h3>
          {{item.cinema}}
          <i class="iconfont iconhtbArrowright02"></i>
        </h3>
        <div class="wrap flex">
          <div class="left">
            <img :src="item.movie.img" alt />
          </div>
          <div class="right">
            <h4>
              {{item.movie.name}}
              <span>{{item.count}}张</span>
            </h4>
            <p>{{item.plist.time}} {{handleDay(item.plist.time)}} {{item.plist.tm}}</p>
            <p>
              {{item.plist.hall}}
              <span
                v-for="(tacit,index) in item.plist.select"
                :key="index"
              >{{tacit.row}}排{{tacit.column}}座</span>
            </p>
          </div>
        </div>
        <div class="bottom j-s-a">
          <P>总价：{{item.price}}元</P>
          <span>已完成</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "myOrder",
  computed: {
    ...mapState({
      order: (state) => state.order.order,
    }),
  },
  inject: ["setTitle", "showBack", "setBack"],
  created() {
    this.setTitle("我的电影订单");
    this.showBack(true);
    this.setBack(this.back);
  },
  beforeRouteLeave (to, from, next) {
      // ...
      this.setTitle("我的");
    this.showBack(false);
    next()
  },
  methods: {
    back() {
      this.$router.replace("/mine");
    },
    handleDay(_date) {
      let week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let _day = new Date(_date).getDay();
      return week[_day];
    },
  },
};
</script>

<style lang="scss" scoped>
#myOrder {
  position: absolute;
  top: 50px;
  bottom: 0;
  width: 100%;
  background-color: #f3f3f3;
  ul {
    li {
      padding: 0 15px;
      background-color: #fff;
      margin-bottom: 10px;
      h3 {
        height: 38px;
        line-height: 38px;
        font-size: 13px;
        color: #666;
        border-bottom: 1PX #ccc solid;
      }
      .wrap {
        padding: 15px 0;
        img {
          width: 57px;
          height: 80px;
        }
        .right {
          margin-left: 15px;
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          h4 {
            font-size: 15px;
            color: #000;
          }
          p {
            font-size: 12px;
            color: #888;
          }
        }
      }
      .bottom {
        border-top: 1PX #ccc solid;
        height: 42px;
        line-height: 42px;
        p {
          font-size: 13px;
          color: #888;
        }
      }
    }
  }
}
</style>