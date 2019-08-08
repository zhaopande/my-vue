<template>
  <div class="carousels">
    <div class="zp-carousel pr" :style="windowWidth">
      <button class="left-btn pa" @click="move(singleItemWidth, 1,speed)">《</button>
      <button class="right-btn pa" @click="move(singleItemWidth, -1,speed)">》</button>
      <div class="zp-carousel-box" ref="zpCarousel" :style="containerStyle">
        <!-- <div class="zp-carousel-item" :style="itemStyle">{{imgArr[imgArr.length-3]}}</div>
        <div class="zp-carousel-item" :style="itemStyle">{{imgArr[imgArr.length-2]}}</div>
        <div class="zp-carousel-item" :style="itemStyle">{{imgArr[imgArr.length-1]}}</div>
        :class="{'carousel-item-active':getLeft(index)}"-->
        <div
          class="zp-carousel-item"
          :class="{'carousel-item-active':isActiveLeft(index)}"
          :style="itemStyle"
          v-for="(item,index) in dataEndThreeArr"
          :key="random+index+item*2"
          :data-index="imgArr.length-(dataEndThreeArr.length-index-1)"
        >{{item}}</div>

        <div
          class="zp-carousel-item"
          :class="{'carousel-item-active':currentIndex==index+1}"
          :style="itemStyle"
          v-for="(item,index) in imgArr"
          :key="index"
          :data-index="index+1"
        >{{item}}</div>
        <div
          class="zp-carousel-item"
          :class="{'carousel-item-active':
          (currentIndex==(index+1))}"
          :style="itemStyle"
          v-for="(item,index) in dataBeginThreeArr"
          :key="random+index+item"
          :data-index="index+1"
        >{{item}}</div>
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
      currentIndex: 2, //当前选中的下标
      distance: -900, //初始化显示第一条
      speed: 5,
      totalLength: 0,
      transitionEnd: true, //是否滑动结束
      scale: 0.8, //缩放倍数
    };
  },

  computed: {
    containerStyle() {
      //用transform来移动整个图片列表
      return {
        transform: `translateX(${this.distance}px)`,
        width: `${this.singleItemWidth * this.imgArr.length + //总宽度+前后
          this.singleItemWidth * 6}px`
      };
    },
    // 单个样式
    itemStyle() {
      return {
        width: `${this.singleItemWidth}px`,
        transform: `scale(${this.scale})`
      };
    },
    // 窗口大小
    windowWidth() {
      //轮播窗口
      return {
        width: `${this.singleItemWidth * 3}px`
      };
    },
    //数据结束后三位
    dataEndThreeArr() {
      return this.imgArr.slice(this.imgArr.length - 3);
    },
    //数据开始前三位
    dataBeginThreeArr() {
      return this.imgArr.slice(0, 3);
    },
    //随机数
    random() {
      return Math.random() * 100;
    }
  },
  mounted() {
    this.totalLength = this.imgArr.length * this.singleItemWidth;
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
      // console.log(this.totalLength);
      console.log(this.distance);
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
          if (des < -this.totalLength) this.distance = -this.singleItemWidth; //-
          if (des > -this.singleItemWidth) this.distance = -this.totalLength; //+
        }
      }, 5);
    },

    // 是否是左边选中
    isActiveLeft: function(index) {
      return (
        this.currentIndex ===
        this.imgArr.length - (this.dataEndThreeArr.length - index - 1)
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "./carousel.less";
</style>