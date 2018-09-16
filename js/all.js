var app = new Vue({
  el: "#app",
  data: {
    data: [],
    last: {},
    filter_kinds: '',
    current_page: '',
    per_page:20,
  },
  methods: {
    getData() {
      const vm = this;
      const api =
        "https://spreadsheets.google.com/feeds/list/1vnk6HDkr3JEyFeAyKtLH0U2yUlNSRb-104W_O0VW1j4/1/public/values?alt=json";
      axios
        .get(api)
        .then(res => {
          //console.log(res.data.feed.entry[0]['gsx$您想挑戰誰']['$t'])
          vm.data = res.data.feed.entry;
          vm.last = vm.data.slice(vm.data.length - 5).reverse(); //最後3筆
          vm.newsHandler()
        })
        .catch(function(err) {
          console.log("err");
        });
    },
    newsHandler(){
      //最新戰帖輪播
      const $newsbox = $('.newsbox')
      const $allnews = $('.allnews')
      function Handler(){
        $newsbox.css({height:$allnews.children('.content').eq(1).outerHeight()})
        $allnews.animate({top:$allnews.children('.content').eq(0).outerHeight()*-1},500,()=>{
          $allnews.children('.content').eq(0).appendTo($allnews)
          $allnews.css({top:0})
        })
      }
      setInterval(Handler,5000)
    }
  },
  created() {
    this.getData();
  },
  computed: {
    levelone() {
      const vm = this;
      return vm.data.filter(item => {
        return item["gsx$您想挑戰誰"]["$t"] === "?? - 前端實習生";
      });
    },
    leveltwo() {
      const vm = this;
      return vm.data.filter(item => {
        return item["gsx$您想挑戰誰"]["$t"] === "葉子 - 初階前端工程師";
      });
    },
    levelthree() {
      const vm = this;
      return vm.data.filter(item => {
        return item["gsx$您想挑戰誰"]["$t"] === "俊儀 - 設計師";
      });
    },
    levelfour() {
      const vm = this;
      return vm.data.filter(item => {
        return item["gsx$您想挑戰誰"]["$t"] === "志誠 - 資深前端設計師";
      });
    },
    levelfive() {
      const vm = this;
      return vm.data.filter(item => {
        return item["gsx$您想挑戰誰"]["$t"] === "洧杰 - 資深前端工程師";
      });
    },
    filterPeople(){
      const vm = this
      //vm.current_page = 1 //要過濾前返回第一頁
      //$('.page span').eq(0).addClass('current').siblings().removeClass()//要過濾前返回第一頁
      //四個條件:種類/星期/時段/特殊
      const kindReg = new RegExp(
        this.filter_kinds ? `[${this.filter_kinds}@]` : `.*`,'gi'
      )
      //過濾
      const result = vm.data.filter((item)=>{
        return item['gsx$您想挑戰誰']['$t'].match(kindReg)
        
      })
      return result.reverse()
    }
  }
});

const $slide = $(".slide");
const $btn = $(".btn");
const $slidebox = $(".slidebox");
const $block = $(".block");
const length = $block.length;
const move = $block.outerWidth();
const containWidth = $block.length * $block.outerWidth() * 2; //兩倍數量的寬(因複製)
let counts = 3; //視窗顯示數量
const star = $(".block")
  .slice(-1)
  .clone(); //前面補上尾巴1個
const end = $(".block")
  .slice(0, length - 1)
  .clone(); //後面補上剩下的

function handler() {
  if ($(this).is(".next")) {
    $slidebox.stop().animate({ left: move * -1 - move }, 400, () => {
      $slidebox.css({ left: move * -1 });
      $(".slidebox .block")
        .eq(0)
        .appendTo($slidebox);
    });
  } else {
    $slidebox.stop().animate({ left: 0 }, 400, () => {
      $slidebox.css({ left: move * -1 });
      $(".slidebox .block")
        .eq(-1)
        .prependTo($slidebox);
    });
  }
}

function reset() {
  $slide.css({ width: move * counts });
  $btn.css({ width: move * counts });
}
let timer; //節流
$(window).resize(function() {
    let w = $(this).width();
    // if(timer) clearTimeout(timer)
    // timer = setTimeout(function(){
    if (w < 640) {
      counts = 1;
    } else if (w < 960) {
      counts = 2;
    } else {
      counts = 3;
    }
    reset();
    // },500)
}).resize();

$(".prev,.next").click(handler);
$slidebox.css({ width: containWidth, left: move * -1 });


const $newsbox = $('.newsbox')
const $content = $('.content')
$newsbox.css({height:$content.eq(0).outerHeight()})


//回頂端
const $backTOp = $('.backTop')
$backTOp.click(function(){
  $("html,body").animate({scrollTop:0},600)
})
$(window).scroll(function(){
  var scrollY = $(this).scrollTop()
  scrollY>300?$backTOp.fadeIn():$backTOp.fadeOut()
})

