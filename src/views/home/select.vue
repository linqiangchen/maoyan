<template>
  <div class="my-select" @click.stop>
    <div class="cinema-header">
      <ul class="j-s-a t-c header-ul">
        <li @click="toggleShowCom(0)" :class="{active:value===0}">
          <span>全城</span>
          <i class="iconfont iconDownarrow-filled"></i>
        </li>
        <li @click="toggleShowCom(1)" :class="{active:value===1}">
          <span>品牌</span>
          <i class="iconfont iconDownarrow-filled"></i>
        </li>
        <li class="none-b" @click="toggleShowCom(2)" :class="{active:value===2}">
          <span>特色</span>
          <i class="iconfont iconDownarrow-filled"></i>
        </li>
      </ul>
    </div>
    <div class="con">
      <div class="_city" v-show="value===0">
        <ul class="all-h">
          <li :class="{activeNav:nav===0}" @click="showItem('district',0)">商区</li>
          <li :class="{activeNav:nav===1}" @click="showItem('subway',1)">地铁站</li>
        </ul>
        <div class="district" v-if="type ==='district' ">
          <div class="left">
            <iscroll-view class="content" @scrollStart="log" ref="iscroll">
              <ul>
                <li
                  v-for="(item ,index) in districtList"
                  :key="index"
                  :class="{active:selected.districtId===item.id}"
                  @click="actionDistrict(item.id)"
                >{{item.name}}({{item.count}})</li>
              </ul>
            </iscroll-view>
          </div>
          <div class="right">
            <iscroll-view class="content" @scrollStart="log" ref="iscroll">
              <ul>
                <li
                  v-for="(item ,index) in districtItem"
                  :key="index"
                  :class="{active:selected.areaId===item.id}"
                  @click="actionArea(item.id)"
                >{{item.name}}({{item.count}})</li>
              </ul>
            </iscroll-view>
          </div>
        </div>
        <div class="subway" v-if="type ==='subway' ">
          <div class="left">
            <iscroll-view class="content" @scrollStart="log" ref="iscroll">
              <ul>
                <li
                  v-for="(item ,index) in subwayList"
                  :key="index"
                  :class="{active:selected.lineId===item.id}"
                  @click="actionSubway(item.id)"
                >{{item.name}}({{item.count}})</li>
              </ul>
            </iscroll-view>
          </div>
          <div class="right">
            <iscroll-view class="content" @scrollStart="log" ref="iscroll">
              <ul>
                <li
                  v-for="(item ,index) in subwayItem"
                  :key="index"
                  :class="{active:selected.stationId===item.id}"
                  @click="actionStation(item.id)"
                >{{item.name}}({{item.count}})</li>
              </ul>
            </iscroll-view>
          </div>
        </div>
      </div>

      <div class="brand" v-show="value === 1">
        <iscroll-view class="content" @scrollStart="log" ref="iscroll">
          <ul>
            <li
              v-for="(item,index) in brandList"
              :key="index"
              class="j-s-a"
              :class="{active:selected.brandId===item.id}"
              @click="handleBrand(item.id)"
            >
              <p>
                <i class="iconfont icongou" :class="{active:selected.brandId===item.id}"></i>
                <span>{{item.name}}</span>
              </p>
              <span class="num" :class="{active:selected.brandId===item.id}">{{item.count}}</span>
            </li>
          </ul>
        </iscroll-view>
      </div>
      <div class="feature" v-show="value === 2">
        <iscroll-view class="content" @scrollStart="log" ref="iscroll">
          <div>
            <div class="feature-wrap">
              <h2>特色功能</h2>
              <ul>
                <li
                  v-for="(item , index) in serverList"
                  :key="index"
                  :class="{active:selected.serviceId===item.id}"
                  @click="actionService(item.id)"
                >{{item.name}}</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="feature-wrap">
              <h2>特殊厅</h2>
              <ul>
                <li
                  v-for="(item , index) in hallTypeList"
                  :key="index"
                  class="one-line"
                  :class="{active:selected.hallType===item.id}"
                  @click="actionHallType(item.id)"
                >{{item.name}}</li>
              </ul>
            </div>
          </div>
        </iscroll-view>
        <div class="_btn j-s-a">
          <span @click="cancel">重置</span>
          <span class="sure" @click="ok">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "mySelect",
  data() {
    return {
      districtList: [],
      districtItem: [],
      subwayList: [],
      subwayItem: [],
      brandList: [],
      hallTypeList: [],
      serverList: [],
      nav: 0,
      type: "district",
      typeId: "districtId",
    };
  },
  props: ["value"],
  computed: {
    ...mapState({
      selected: (state) => state.home.selected,
      cinemaSelect: (state) => state.home.cinemaSelect,
      //   districtList: (state) => state.home.comingMovie,
    }),
    showSubItems() {
      const item = this.districtList.find(
        (item) => item.id === this.selected.districtId
      ) || { subItems: [] };

      return item.subItems;
    },
  },
  methods: {
    toggleShowCom(id) {
      this.$emit("input", id);
    },
    actionDistrict(id) {
      this.$store.commit("home/setSelected", { type: "districtId", value: id });
      if (id === -1) {
        this.$emit('done')


        return;
      }
      const item = this.districtList.find(
        (item) => item.id === this.selected.districtId
      ) || { subItems: [] };
      this.districtItem = item.subItems;
      //
    },
    actionSubway(id) {
      this.$store.commit("home/setSelected", { type: "lineId", value: id });
      if (id === -1) {
         this.$emit('done')
        return;
      }
      const sitem = this.subwayList.find(
        (item) => item.id === this.selected.lineId
      ) || { subItems: [] };
      this.subwayItem = sitem.subItems;
      //
    },
    actionArea(id) {
      this.$store.commit("home/setSelected", { type: "areaId", value: id });

       this.$emit('done')
    },
    actionStation(id) {
      this.$store.commit("home/setSelected", { type: "stationId", value: id });
       this.$emit('done')
    },
    actionService(id) {
      this.$store.commit("home/setSelected", { type: "serviceId", value: id });
    },
    actionHallType(id) {
      this.$store.commit("home/setSelected", { type: "hallType", value: id });
    },
    showItem(str, index) {
      this.nav = index;
      this.type = str;
      this.districtList = this.cinemaSelect[str].subItems;
    },
    handleBrand(id) {
      this.$store.commit("home/setSelected", { type: "brandId", value: id });
      this.$emit('done');
    },
    cancel() {
      this.$store.commit("home/setSelected", { type: "serviceId", value: -1 });
      this.$store.commit("home/setSelected", { type: "hallType", value: -1 });
    },
    ok() {
       this.$emit('done')
    },
    log(e) {
      //
      e.refresh();
    },
  },
  watch: {
    cinemaSelect(newVal) {
      this.districtList = newVal.district.subItems;
      this.subwayList = newVal.subway.subItems;
      this.serverList = newVal.service.subItems;
      this.hallTypeList = newVal.hallType.subItems;
      const ditem = this.districtList.find(
        (item) => item.id === this.selected.districtId
      ) || { subItems: [] };
      const sitem = this.subwayList.find(
        (item) => item.id === this.selected.lineId
      ) || { subItems: [] };

      this.districtItem = ditem.subItems;
      this.subwayItem = sitem.subItems;
      this.brandList = newVal.brand.subItems;

      //   this.showSubItems = newVal[this.type].subItems
    },
  },
};
</script>

<style lang="scss" scoped>
.my-select {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 375px;

  z-index: 100;
  background-color: #fff;
  box-shadow: 0 0 0 50vmax rgba(0, 0, 0, 0.5);
}
.cinema-header {
  background-color: #fff;
  position: relative;
  .header-ul {
    height: 100%;
    padding: 10px 0;
    li {
      height: 100%;
      line-height: 20px;

      flex: 1;
      font-size: 13px;
      color: #777;
      i {
        font-size: 13px;
      }
      border-right: 1px #777 solid;
    }
    .active {
      color: #f03d37;
      i {
        transform: rotate(-90deg);
      }
    }
    border-bottom: 1PX#777 solid;
  }
  width: 100%;
  height: 40px;
}

.active {
  color: #f03d37 !important;
}
.con {
  height: 335px;
  position: relative;
  ._city {
    position: absolute;
    top: 0;
    width: 100%;
    .all-h {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 44px;

      .activeNav {
        color: #f03d37 !important;
        border-bottom: 2px #f03d37 solid;
      }
      li {
        flex: 1;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #777;
        font-size: 15px;
      }
    }
    .district {
      position: absolute;
      top: 44px;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      z-index: 10;
      height: 294px;

      .left {
        float: left;
        height: 291px;
        width: 30%;
        background-color: #fff;

        ul {
          li {
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 14px;
            color: #777;
          }
        }
      }
      .right {
        float: right;
        height: 291px;
        width: 70%;
        background-color: #f5f5f5;

        ul {
          li {
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 14px;
            color: #777;
          }
        }
      }
    }
    .subway {
      position: absolute;
      top: 44px;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      z-index: 10;
      height: 294px;
      .left {
        float: left;
        height: 291px;
        width: 30%;
        background-color: #fff;

        ul {
          li {
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 14px;
            color: #777;
          }
        }
      }
      .right {
        float: right;
        height: 291px;
        width: 70%;
        background-color: #f5f5f5;

        ul {
          li {
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 14px;
            color: #777;
          }
        }
      }
    }
  }
  .content {
    height: 291px;
    width: 100%;
    overflow: hidden;
  }

  .brand {
    position: absolute;
    top: 0;
    width: 100%;
    .content {
      height: 335px;
    }

    ul {
      padding: 0 10px;
      li {
        font-size: 15px;
        color: #333;
        height: 44px;
        line-height: 44px;
        border-bottom: 1px #ccc solid;
        i {
          font-size: 15px;
        }
        .num {
          color: #8f9296;
          font-size: 12px;
        }
      }
    }
  }
  .feature {
    width: 100%;
    height: 100%;
    padding: 0 15px;
    // .active{
    //     background: #fcf0f0;
    // color: #f03d37;
    // border: 1px solid #f03d37;
    // }
    .content {
      height: 276px;
      width: 100%;
      overflow: hidden;
    }
    .feature-wrap {
      h2 {
        padding: 10px 0;
        font-size: 15px;
        color: #777;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          font-size: 12px;
          width: 71px;
          height: 38px;
          line-height: 38px;
          border: 1px #ccc solid;
          color: #777;
          border-radius: 5px;
          margin-right: 10px;
          margin-bottom: 10px;
          text-align: center;
        }
        .active {
          background: #fcf0f0;
          color: #f03d37;
          border-color: #f03d37;
        }
      }
    }
    ._btn {
      height: 61px;
      border-top: 1px #ccc solid;
      span {
        color: #777;
        width: 80px;
        height: 36px;
        font-size: 15px;
        line-height: 36px;
        border-radius: 5px;
        border: 1px #ccc solid;
        text-align: center;
      }
      .sure {
        background: #f03d37;
        border: 1px solid #f03d37;
        color: #fff;
      }
    }
  }
}
</style>