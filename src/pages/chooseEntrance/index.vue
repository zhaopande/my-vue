<template>
  <div class="carousels">
    <div
      class="zp-carousel pr"
      :style="windowWidth"
      @mouseover="stopTimedLoop"
      @mouseleave="restartTimedLoop"
    >
      <button class="left-btn pa" @click="move(singleItemWidth, 1,speed)">《</button>
      <button class="right-btn pa" @click="move(singleItemWidth, -1,speed)">》</button>
      <div class="zp-carousel-box" ref="zpCarousel" :style="containerStyle">
        <div
          class="zp-carousel-item"
          :class="{'carousel-item-active':isActiveLeft(index)}"
          :style="[itemStyle,isActivePrevOrNext(imgArr.length-(dataEndThreeArr.length-index-1),1)]"
          v-for="(item,index) in dataEndThreeArr"
          :key="random+index+item*2"
          :data-index="imgArr.length-(dataEndThreeArr.length-index-1)"
        >{{item}}</div>

        <div
          class="zp-carousel-item"
          :class="{'carousel-item-active':currentIndex==index+1}"
          :style="[itemStyle,isActivePrevOrNext(index+1)]"
          v-for="(item,index) in imgArr"
          :key="index"
          :data-index="index+1"
        >{{item}}</div>
        <div
          class="zp-carousel-item"
          :class="{'carousel-item-active':
          (currentIndex==(index+1))}"
          :style="[itemStyle,isActivePrevOrNext(index+1)]"
          v-for="(item,index) in dataBeginThreeArr"
          :key="random+index+item"
          :data-index="index+1"
        >{{item}}</div>
      </div>
      <div class="carousel-all-dot pa">
        <div
          class="carousel-dot cp"
          v-for="(item,index) in imgArr.length"
          :key="index"
          @click="jumpDot(index+1)"
        ></div>
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
      distance: 0, //初始化显示第一条
      speed: 5,
      totalLength: 0,
      animateEnd: true, //是否滑动结束
      scale: 0.85, //缩放倍数
      itemDislocationLength: "20%", //
      timedLoop: false, //定时循环
      isTimedLoop: false, //是否开启定时循环
      switchTime: 1000 //切换间隔
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
    itemDislocationLengthPx() {
      //错位长度px
      return (
        (this.singleItemWidth *
          Number(this.itemDislocationLength.split("%")[0])) /
        100
      );
    },
    // 单个样式
    itemStyle() {
      return {
        width: `${this.singleItemWidth}px`,
        transform: `scale(${this.scale})`
      };
    },
    // 当前项上一个样式
    prevItemStyle() {
      return {
        transform: `scale(${this.scale}) translateX(${this.itemDislocationLength})`
      };
    },
    // 当前项下一个样式
    nextItemStyle() {
      return {
        transform: `scale(${this.scale}) translateX(-${this.itemDislocationLength})`
      };
    },
    // 窗口大小
    windowWidth() {
      //轮播窗口宽度，要减去两边重合的宽度
      return {
        width: `${this.singleItemWidth * 3 -
          this.itemDislocationLengthPx * 2}px`
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
  created() {
    // 获取总长度
    this.totalLength = this.imgArr.length * this.singleItemWidth;
    // 根据默认显示项初始滑动位置
    this.distance = -(
      (this.currentIndex + 1) * this.singleItemWidth +
      this.itemDislocationLengthPx
    );
  },
  mounted() {
    this.isTimedLoop ? this.startTimedLoop() : "";
  },
  destroyed() {
    clearInterval(this.timedLoop);
  },
  methods: {
    /**
     * offset:距离
     * direction:左/右
     * speed 速度
     */
    move(offset, direction, speed) {
      if (!this.animateEnd) return;
      this.animateEnd = false;
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
    /**
     * des:滑动的位置
     * direction：1右 -1左
     */
    createAnimate(des, direc, speed) {
      console.log(des);
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
          this.animateEnd = true;
          window.clearInterval(this.temp);
          this.distance = des;
          let initDistance = this.totalLength + this.itemDislocationLengthPx; //最右边的位置
          if (des < -initDistance)
            this.distance =
              -this.singleItemWidth - this.itemDislocationLengthPx; //-滑动距离超过最右边就回到最左边位置
          if (des > -this.singleItemWidth) this.distance = -initDistance; //+滑动距离超过最左边就回到最右边位置
        }
      }, 5);
    },

    // 是否是左边选中
    isActiveLeft: function(index) {
      return (
        this.currentIndex ===
        this.imgArr.length - (this.dataEndThreeArr.length - index - 1)
      );
    },
    // 是否是当前选中的前后
    isActivePrevOrNext: function(index) {
      // 排除当前项
      if (index !== this.currentIndex) {
        if (index < this.currentIndex && this.currentIndex - index == 1) {
          //确认是相邻项
          return this.prevItemStyle;
        } else {
          return this.currentIndex - index != -4
            ? this.nextItemStyle
            : this.prevItemStyle;
        }
      }
    },
    // 开始循环
    startTimedLoop: function() {
      this.timedLoop = setInterval(() => {
        this.move(this.singleItemWidth, -1, this.speed);
      }, this.switchTime);
    },
    stopTimedLoop: function() {
      clearInterval(this.timedLoop);
    },
    restartTimedLoop: function() {
      if (this.isTimedLoop) {
        this.startTimedLoop();
      }
    },
    //点击圆点跳转
    jumpDot: function(index) {
      const diff = index - this.currentIndex;
      console.log(diff);
      if (diff == 0) return;
      const direction = diff >= 0 ? -1 : 1;
      this.currentIndex = index;
      // this.createAnimate(
      //   -((index + 1) * this.singleItemWidth + this.itemDislocationLengthPx),
      //   direction,
      //   10
      // );
      const jumpDistance =
        (index + 1) * this.singleItemWidth + this.itemDislocationLengthPx;
      if (diff > 0) {
        console.log("next");
        this.createAnimate(-jumpDistance, direction, 10);
      } else if (diff < 0) {
        console.log("prev");
        // this.createAnimate(
        //   -((index + 1) * this.singleItemWidth + this.itemDislocationLengthPx),
        //   direction,
        //   10
        // );
        for (let i = 0; i < diff; i++) {
          this.move(this.singleItemWidth, direction, this.speed);
        }
      }

      // const offset = Math.abs(index - this.currentIndex) * this.distance;
      // const jumpSpeed =
      //   Math.abs(index - this.currentIndex) === 0
      //     ? this.speed
      //     : Math.abs(index - this.currentIndex) * this.speed;
      // this.move(offset, direction, jumpSpeed);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./carousel.less";
</style>