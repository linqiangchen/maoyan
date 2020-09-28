<template>
  <div id="seat">
    <div class="plistinfo">
      <div>
        <h2>{{movieName}}</h2>
        <p>
          <span>{{plist.dt}} {{plist.tm}} {{plist.lang}} {{plist.tp}}</span>
        </p>
      </div>
    </div>
    <div class="seatInfo">
      <iscroll-view class="scroll-seat" @scrollStart="log" ref="playListCat">
        <div class="_wrap">
          <div class="top">
            <span>{{plist.th}}</span>
          </div>
          <div class="midle">
            <ul class="row">
              <li v-for="(item ,index1) in seat.seat.regions[0].rows" :key="index1 + '_'">
                <ul class="flex colum">
                  <li
                    v-for="(item2 ,index2) in item.seats"
                    :key="index2"
                    v-show="item2.seatStatus != 0"
                    @click="selectSeat(item2,$event,index2)"
                  >
                    <img :src="showSeat(item2.seatStatus)" alt />
                  </li>
                </ul>
              </li>
              <li class="line"></li>
            </ul>

            <div class="left">
              <ul>
                <li
                  v-for="(item ,index) in seat.seat.regions[0].rows"
                  :key="index + '__'"
                >{{item.rowNum}}</li>
              </ul>
            </div>
          </div>
          <div class="bottom">
            <ul>
              <li
                v-for="(item ,index) in seat.seat.image.seatLegends"
                :key="index + '__'"
                class="j-s-a"
              >
                <img :src="item.legendIcon" alt />
                <span>{{item.legendName}}</span>
              </li>
            </ul>
          </div>
        </div>
      </iscroll-view>
    </div>
    <div class="selectEd" v-if="showSelect">
      <h2>已选座位</h2>
      <ul class="flex">
        <li v-for="(item , index) in selectList" :key="item.id">
          <p class="local">{{item.row}}排{{item.column}}座</p>
          <p>￥{{seat.price['1'].seatsPrice['1'].totalPrice}}</p>
          <span class="del" @click="remove(index,item)">X</span>
        </li>
      </ul>
      <div class="btn" @click='pay'>{{(+seat.price['1'].seatsPrice['1'].totalPrice)*this.count}}确认选座</div>
    </div>
    <div class="select" v-else>
      <div class="btn">请先选座</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import seat from "../../data/seat";
import { mapState } from "vuex";
export default {
  name: "seat",
  data() {
    return {
      seat:'',
      selectList: [],
      count: 0,
      column: "",
      showSelect: false,
    };
  },
  watch: {
    count(newVal) {
      if (newVal > 0) {
        this.showSelect = true;
      } else {
        this.showSelect = false;
      }
    },
  },
   computed: {
    ...mapState({
      plist: (state) => state.movie.plist,
      movieName: (state) => state.movie.movieName,
      login: (state) => state.user.login,
    }),
  },
  beforeRouteEnter (to, from, next) {
    // ...
 
    next()
      
  },
  created(){
    this.seat = JSON.parse(JSON.stringify(seat))
  },
  mounted(){
    if(!this.login){
      this.$router.replace('/login')
    }
  },
  methods: {
      pay(){
          this.$store.commit('movie/setSelect',{tacit:this.selectList,
         count:this.count,
         price:(+this.seat.price['1'].seatsPrice['1'].totalPrice)*this.count})
          this.$router.push('/cinemaDetail/seat/pay')
      },
    showSeat(state) {
      switch (state) {
        case 1:
          return "http://p1.meituan.net/movie/9dfff6fd525a7119d44e5734ab0e9fb41244.png";
        case 2:
          return "http://p1.meituan.net/moviemachine/7135080c0aa49531019d436f513ce5df1003.png";
        case 3:
          return "http://p0.meituan.net/moviemachine/2af4c987b1758563e22258c077139cdf842.png";
        case 4:
          return "http://p0.meituan.net/moviemachine/4abd89a0c0a864694b27c54d229fa7f41099.png";
      }
    },
    selectSeat(seat, e, coumIndex) {
        
      if (seat.seatStatus !== 1 &&seat.seatStatus !== 2) {
        return;
      }
      if (seat.seatStatus === 2) {
          
        this.selectList.splice(
          this.selectList.findIndex(
            (item) => item.row === seat.rowId && item.column === seat.columnId
          ),
          1
        );
        this.seat.seat.regions[0].rows[+seat.rowId - 1].seats[
          coumIndex
        ].seatStatus = 1;
        this.count--;
      } else {
          if(this.count >=5){
              alert('最多买5张');
              return
          }
        this.selectList.push({
          id: Date.now(),
          row: seat.rowId,
          column: seat.columnId,
        });
        this.seat.seat.regions[0].rows[+seat.rowId - 1].seats[
          coumIndex
        ].seatStatus = 2;
         this.count++;
      }


    },
    remove(index , item) {
      this.selectList.splice(index, 1);
       this.seat.seat.regions[0].rows[+item.row - 1].seats.find(item2 => item2.columnId == item.column).seatStatus = 1
       
      this.count--;
    },
    log(e) {
      //
      e.refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
#seat {
  position: fixed;
  top: 44px;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 11;
}
.plistinfo {
  padding: 0 15px;
  div {
    padding: 15px 0;
    border-bottom: 1PX  #ccc solid;
  }

  h2 {
    margin-bottom: 5px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  p {
    font-size: 13px;
    color: #777;
  }
}
.scroll-seat {
  position: absolute;
  top: 65px;
  width: 100%;
  background-color: #f2f1f6;
  bottom: 65px;
  div {
    width: 100%;
    height: 100%;
  }
  .top {
    margin: 0 auto;
    text-align: center;
    height: 18px;
    span {
      font-size: 14px;
      color: #777;
      line-height: 18px;
      display: inline-block;

      width: 200px;
      height: 18px;
      background: #e3e3e3;
      border-radius: 0 0 30px 30px;
    }
  }
  .row {
    position: absolute;
    top: 50%;
    left: 50%;
    height: max-content;
    width: max-content;
    transform: translate(-50%, -50%);

    li {
      margin: 2px;
    }
    .line {
      position: absolute;
      width: 0;
      top: 0;
      left: 50%;
      height: 100%;
      // transform: translateX(-50%);
      margin-left: -1px;
      border-left: 1PX  #ccc dashed;
    }
    img {
      width: 17px;
      height: 15px;
    }
  }
  .left {
    position: absolute;
    top: 50%;
    height: max-content;
    width: max-content;
    transform: translateY(-50%);
    left: 0px;
    background-color: rgba(0, 0, 0, 0.05);
    li {
      margin: 10px 0;
      width: 16px;
      font-size: 12px;
      color: #777;
      text-align: center;
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 36px;
    font-size: 12px;
    color: #777;
    line-height: 36px;
    ul {
      display: flex;
      justify-content: center;
      li {
        img {
          width: 17px;
          height: 15px;
          margin: 0 5px;
        }
      }
    }
  }
}
.select {
  padding: 10px;
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 65px;
  .btn {
    background-color: #ffddb2;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: #fff;
    border-radius: 4px;
  }
}
.selectEd {
  padding: 10px;
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: max-content;
  background-color: #fff;
  ul {
    flex-wrap: wrap;
  }
  li {
    margin: 5px 3px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 2px 0;
    justify-content: space-around;
    text-align: center;
    width: 80px;
    height: 37px;
    border: 1PX  #ccc solid;
    .local {
      font-size: 12px;
      color: #333;
    }
    p {
      color: #fa5939;
    }
    span {
      color: #999;
    }
  }
  li::before {
    content: "";
    width: 5px;
    height: 10px;
    border-radius: 0 5px 5px 0px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -1px;
    border: 1PX  #ccc solid;
    border-left: none;
    background-color: #fff;
  }
  .del {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
  }
  .btn {
    background-color: #f90;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: #fff;
    border-radius: 4px;
  }
}
</style>