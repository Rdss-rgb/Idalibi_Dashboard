const swiperEl = document.querySelector('swiper-container')

const params = {
  injectStyles: [`
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
  }

  .swiper-pagination-bullet-active {
    color: #fff;
    background: #007aff;
  }
  `],
  pagination: {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "</span>";
    },
  },
}

Object.assign(swiperEl, params)

swiperEl.initialize();


function next(){
    console.log('next')
    swiper.nextEl();
}