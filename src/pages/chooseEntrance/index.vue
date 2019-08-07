<template>
  <div class="carousels">
    <div class="zp-carousel">
      <button class="left-btn pa" @click="move(singleItemWidth, 1,speed)">《</button>
      <button class="right-btn pa" @click="move(singleItemWidth, -1,speed)">》</button>
      <div class="zp-carousel-box" ref="zpCarousel" :style="containerStyle">
        <div class="zp-carousel-item">{{imgArr[imgArr.length-1]}}</div>
        <div class="zp-carousel-item" v-for="(item,index) in imgArr" :key="index">{{item}}</div>
        <div class="zp-carousel-item">{{imgArr[0]}}</div>
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
      totalLength: 0
    };
  },

  computed: {
    containerStyle() {
      //这里用了计算属性，用transform来移动整个图片列表
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      };
    }
    // totalLength() {
    //   return this.imgArr.length * this.singleItemWidth;
    // }
  },
  mounted() {
    // this.zpCarousel = this.$refs["zpCarousel"];
    // console.log(this.zpCarousel);
    this.totalLength = this.imgArr.length * this.singleItemWidth;

    console.log(this.distance);
  },
  methods: {
    move(offset, direction, speed) {
      direction === -1 ? this.currentIndex++ : this.currentIndex--;
      if (this.currentIndex > 5) this.currentIndex = 1;
      if (this.currentIndex < 1) this.currentIndex = 5;
      console.log(this.currentIndex);
      // this.distance += offset * direction;
      // if (this.distance < -1500) this.distance = -300;//大于第五张时回到第一张
      // if (this.distance > -300) this.distance = -1500;//滑动距离小于显示第一张时显示最后一张
      const destination = this.distance + offset * direction;
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
          if (des < -this.totalLength) this.distance = -300;
          if (des > -300) this.distance = -this.totalLength;
        }
      }, 20);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./carousel.less";
</style>