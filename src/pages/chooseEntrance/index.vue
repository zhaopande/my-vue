<template>
  <div class="carousels">
    <div class="zp-carousel pr" :style="windowWidth">
      <button class="left-btn pa" @click="move(singleItemWidth, 1,speed)">《</button>
      <button class="right-btn pa" @click="move(singleItemWidth, -1,speed)">》</button>
      <div class="zp-carousel-box" ref="zpCarousel" :style="containerStyle">
        <div class="zp-carousel-item" :style="itemStyle">{{imgArr[imgArr.length-1]}}</div>
        <div
          class="zp-carousel-item"
          :style="itemStyle"
          v-for="(item,index) in imgArr"
          :key="index"
        >{{item}}</div>
        <div class="zp-carousel-item" :style="itemStyle">{{imgArr[0]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZpCarousel",
  data() {
    return {
      imgArr: [1, 2, 3, 4, 5],
      zpCarousel: null,
      singleItemWidth: 300,
      currentIndex: 1, //当前选中的下标
      distance: -300, //初始化显示第一条
      speed: 30,
      totalLength: 0,
      transitionEnd: true, //是否滑动结束
      scale:1,//缩放倍数
    };
  },

  computed: {
    containerStyle() {
      //用transform来移动整个图片列表
      return {
        transform: `translateX(${this.distance}px)`,
        width: `${this.singleItemWidth * this.imgArr.length + //总宽度+前后
          this.singleItemWidth * 2}px`
      };
    },
    itemStyle() {
      return {
        width: `${this.singleItemWidth}px`,
        transform: `scale(${this.scale})`
      };
    },
    windowWidth() { //轮播窗口
      return {
        width: `${this.singleItemWidth}px`
      };
    }
  },
  mounted() {
    this.totalLength = this.imgArr.length * this.singleItemWidth;

    console.log(this.distance);
  },
  methods: {
    /**
     * offset:距离
     * direction:左/右
     * speed 速度
     */
    move(offset, direction, speed) {
      if (!this.transitionEnd) return;
      this.transitionEnd = false;
      direction === -1 ? this.currentIndex++ : this.currentIndex--;
      if (this.currentIndex > 5) this.currentIndex = 1;
      if (this.currentIndex < 1) this.currentIndex = 5;
      console.log(this.currentIndex);
      // this.distance += offset * direction;
      // if (this.distance < -1500) this.distance = -300;//大于第五张时回到第一张
      // if (this.distance > -300) this.distance = -1500;//滑动距离小于显示第一张时显示最后一张
      const destination = this.distance + offset * direction; //左/右需要滑动到的地方
      this.createAnimate(destination, direction, speed);
    },
    createAnimate(des, direc, speed) {
      console.log(this.totalLength);
      if (this.temp) {
        window.clearInterval(this.temp);
        this.temp = null;
      }
      this.temp = window.setInterval(() => {
        if (
          (direc === -1 && des < this.distance) ||
          (direc === 1 && des > this.distance)
        ) {
          this.distance += speed * direc;
        } else {
          this.transitionEnd = true;
          window.clearInterval(this.temp);
          this.distance = des;
          if (des < -this.totalLength) this.distance = -(this.singleItemWidth); //-
          if (des > -(this.singleItemWidth)) this.distance = -this.totalLength; //+
        }
      }, 20);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./carousel.less";
</style>