//->nav导航hover效果
~function(){
    var navListBtn = document.getElementById("listBtnLeft"),
        navBtnList = navListBtn.getElementsByTagName("li");
    for(var i=1;i<navBtnList.length;i++){
        navBtnList[i].onmouseover = function(){
            DOM.setCss(this,"border-bottom","5px solid #ffffff")
        };
        navBtnList[i].onmouseout = function(){
            DOM.setCss(this,"border-bottom","none")
        }
    }
}();





//->轮播图
/*第一区域*/
var subject1 = document.getElementById("subject1");
var banner1 = document.getElementById("banner1");
var inner1 = document.getElementById("inner1"),
    innerList1 = inner1.getElementsByTagName("li");
var subject1_bg = document.getElementById("subject1_bg"),
    subject1BgList = subject1_bg.getElementsByTagName("li");
var btnUl1 = document.getElementById("btnUl1"),
    btnList1 = btnUl1.getElementsByTagName("li");
var leftBtn1 = document.getElementById("leftBtn1");
var rightBtn1 = document.getElementById("rightBtn1");
move(banner1,innerList1,subject1BgList,btnList1,leftBtn1,rightBtn1);
/*第二区域*/
var subject2 = document.getElementById("subject2");
var banner2 = document.getElementById("banner2");
var inner2 = document.getElementById("inner2"),
    innerList2 = inner2.getElementsByTagName("li");
var subject2_bg = document.getElementById("subject2_bg"),
    subject2BgList = subject2_bg.getElementsByTagName("li");
var btnUl2 = document.getElementById("btnUl2"),
    btnList2 = btnUl2.getElementsByTagName("li");
var leftBtn2 = document.getElementById("leftBtn2");
var rightBtn2 = document.getElementById("rightBtn2");
var MovieContent = document.getElementById("MovieContent"),
    MovieContentList = DOM.children(MovieContent,"li");
move(banner2,innerList2,subject2BgList,btnList2,leftBtn2,rightBtn2,MovieContentList);
/*第四区域*/
var subject4 = document.getElementById("subject4");
var banner4 = document.getElementById("banner4");
var inner4 = document.getElementById("inner4"),
    innerList4 = inner4.getElementsByTagName("li");
var subject4_bg = document.getElementById("subject4_bg"),
    subject4BgList = subject4_bg.getElementsByTagName("li");
var btnUl4 = document.getElementById("btnUl4"),
    btnList4 = btnUl4.getElementsByTagName("li");
var leftBtn4 = document.getElementById("leftBtn4");
var rightBtn4 = document.getElementById("rightBtn4");
move(banner4,innerList4,subject4BgList,btnList4,leftBtn4,rightBtn4);
/*第五区域*/
var subject5 = document.getElementById("subject5");
var banner5 = document.getElementById("banner5");
var inner5 = document.getElementById("inner5"),
    innerList5 = inner5.getElementsByTagName("li");
var subject5_bg = document.getElementById("subject5_bg"),
    subject5BgList = subject5_bg.getElementsByTagName("li");
var btnUl5 = document.getElementById("btnUl5"),
    btnList5 = btnUl5.getElementsByTagName("li");
var leftBtn5 = document.getElementById("leftBtn5");
var rightBtn5 = document.getElementById("rightBtn5");
move(banner5,innerList5,subject5BgList,btnList5,leftBtn5,rightBtn5);


var bayBanner = document.getElementById("bayBanner");
var bayInner = document.getElementById("bayInner"),
    bayInnerList = DOM.children(bayInner,"li");
var bayBtnUl = document.getElementById("bayBtnUl"),
    bayBtnList = DOM.children(bayBtnUl,"li");
var bayLeftBtn = document.getElementById("bayLeftBtn");
var bayRightBtn = document.getElementById("bayRightBtn");
move(bayBanner,bayInnerList,false,bayBtnList,bayLeftBtn,bayRightBtn);









/**
 * 轮播图函数包
 * @param banner
 * @param innerList
 * @param subjectBgList
 * @param btnList
 * @param leftBtn
 * @param rightBtn
 * @param MovieContentList
 */
function move(banner,innerList,subjectBgList,btnList,leftBtn,rightBtn,MovieContentList){
    //轮播图自动轮播 一个定时器不断驱动一个autoMove函数
    var timer = window.setInterval(function(){
        step++;
        autoMove();
    },4000);
    var step = 0;
    var count = innerList.length;

    //->鼠标悬停,停止动画,鼠标移开,开始动画
    //subject1.addEventListener("mouseover",hover,false);
    //function hover(){
    //    window.clearInterval(timer)
    //}
    //subject1.addEventListener("mouseout",out,false);
    //function out(){
    //    timer = window.setInterval(autoMove,4000)
    //}
    banner.onmouseover = function(){
        window.clearInterval(timer);
        for(var i=0;i<count;i++){
            DOM.setCss(DOM.getByClass(innerList[i],"fx")[0],"display","block");
        }
    };
    banner.onmouseout = function(){
        timer = window.setInterval(function(){
            step++;
            autoMove();
        },4000);
        for(var i=0;i<count;i++){
            DOM.setCss(DOM.getByClass(innerList[i],"fx")[0],"display","none");
        }
    };
    if(MovieContentList){
        MovieContent.onmouseover = function(){
            window.clearInterval(timer);
        };
        MovieContent.onmouseout = function(){
            timer = window.setInterval(function(){
                step++;
                autoMove();
            },4000);
        };
    }
//->焦点对齐,点击事件绑定
    function listBtn(n){
        if(n === count){
            n = 0;
        }
        for(var i =0;i<count;i++){
            btnList[i].className = "";
        }
        btnList[n].className = "select"
    }
    for(var i =0;i<count;i++){
        var oLi = btnList[i];
        oLi.i = i;
        oLi.onclick = function(){
            step = this.i;
            listBtn(this.i);
            for(var i=0;i<count;i++){
                jackAnimate(innerList[i],{"opacity":0},1000);
                DOM.setCss(innerList[i],"z-index",1);
                if(subjectBgList){
                    jackAnimate(subjectBgList[i],{"opacity":0},1000);
                    DOM.setCss(subjectBgList[i],"z-index",1);
                }
                if(MovieContentList){
                    DOM.setGroupCss(MovieContentList[i],{"opacity":0,"z-index":1});
                }
            }
            autoMove();
        }
    }

//->左右按钮点击事件
    leftBtn.onmouseover = function(){
        window.clearInterval(timer);
    };
    leftBtn.onmouseout = function(){
        timer = window.setInterval(function(){
            step++;
            autoMove();
        },4000)
    };
    leftBtn.onclick = function () {
        step--;
        if(step < 0){
            step = count-1;
            jackAnimate(innerList[step],{"opacity":1},1000);
            DOM.setCss(innerList[step],"z-index",3);
            jackAnimate(innerList[0],{"opacity":0},500);
            DOM.setCss(innerList[0],"z-index",1);
            if(subjectBgList) {
                jackAnimate(subjectBgList[step], {"opacity": 1}, 500);
                DOM.setCss(subjectBgList[step], "z-index", 3);
                jackAnimate(subjectBgList[0], {"opacity": 0}, 500);
                DOM.setCss(subjectBgList[0], "z-index", 1);
            }
            if(MovieContentList) {
                DOM.setGroupCss(MovieContentList[step],{"z-index":3});
                setTimeout(function(){
                    jackAnimate(MovieContentList[step], {"opacity": 1}, 500);
                },500);
                DOM.setGroupCss(MovieContentList[0],{"z-index":1,"opacity":0});
            }
        }else{
            jackAnimate(innerList[step],{"opacity":1},1000);
            DOM.setCss(innerList[step],"z-index",3);
            jackAnimate(innerList[step+1],{"opacity":0},1000);
            DOM.setCss(innerList[step+1],"z-index",1);
            if(subjectBgList) {
                jackAnimate(subjectBgList[step], {"opacity": 1}, 500);
                DOM.setCss(subjectBgList[step], "z-index", 3);
                jackAnimate(subjectBgList[step + 1], {"opacity": 0}, 500);
                DOM.setCss(subjectBgList[step + 1], "z-index", 1);
            }
            if(MovieContentList) {
                DOM.setGroupCss(MovieContentList[step],{"z-index":3});
                setTimeout(function(){
                    jackAnimate(MovieContentList[step], {"opacity": 1}, 500);
                },500);
                DOM.setGroupCss(MovieContentList[step + 1],{"z-index":1,"opacity":0});
            }
        }
        listBtn(step);
    };
    rightBtn.onmouseover = function(){
        window.clearInterval(timer);
    };
    rightBtn.onmouseout = function(){
        timer = window.setInterval(function(){
            step++;
            autoMove();
        },4000)
    };
    rightBtn.onclick = function(){
        step++;
        autoMove();
    };

//->主要动画
    function autoMove(){
        //step++;
        if(step == count || step <= 0){

            step = 0;
            /*--轮播图外侧图片--*/
            jackAnimate(innerList[0],{"opacity":1},1000);
            DOM.setCss(innerList[0],"z-index",3);
            jackAnimate(innerList[count-1],{"opacity":0},500);
            DOM.setCss(innerList[count-1],"z-index",1);
            /*--轮播图背景图片--*/
            if(subjectBgList) {
                jackAnimate(subjectBgList[0], {"opacity": 1}, 500);
                DOM.setCss(subjectBgList[0], "z-index", 3);
                jackAnimate(subjectBgList[count - 1], {"opacity": 0}, 500);
                DOM.setCss(subjectBgList[count - 1], "z-index", 1);
            }
            /*--轮播图内容部分--*/
            if(MovieContentList) {
                DOM.setGroupCss(MovieContentList[0],{"z-index":3});
                setTimeout(function(){
                    jackAnimate(MovieContentList[0], {"opacity": 1}, 500);
                },500);
                DOM.setGroupCss(MovieContentList[count - 1],{"z-index":1,"opacity":0});
            }
        }else{
            jackAnimate(innerList[step],{"opacity":1},1000);
            DOM.setCss(innerList[step],"z-index",3);
            jackAnimate(innerList[step-1],{"opacity":0},500);
            DOM.setCss(innerList[step-1],"z-index",1);
            if(subjectBgList) {
                jackAnimate(subjectBgList[step], {"opacity": 1}, 500);
                DOM.setCss(subjectBgList[step], "z-index", 3);
                jackAnimate(subjectBgList[step - 1], {"opacity": 0}, 500);
                DOM.setCss(subjectBgList[step - 1], "z-index", 1);
            }
            if(MovieContentList) {
                DOM.setGroupCss(MovieContentList[step],{"z-index":3});
                setTimeout(function(){
                    jackAnimate(MovieContentList[step], {"opacity": 1}, 500);
                },500);
                DOM.setGroupCss(MovieContentList[step - 1],{"z-index":1,"opacity":0});
            }
        }
        listBtn(step);
    }
}







~function(){
    //->小轮播图
    var funInner = document.getElementById("funInner");
    var funInnerList = funInner.getElementsByTagName("li");
    var funLeft = document.getElementById("funLeft");
    var funRight = document.getElementById("funRight");
    var funLeftI =document.getElementById("funLeftI");
    var funRightI =document.getElementById("funRightI");
    sroll(funInner,funInnerList,funLeft,funRight,funLeftI,funRightI,3);

    var s3Banner = document.getElementById("s3Banner");
    var s3Inner = document.getElementById("s3Inner");
    var s3InnerList = s3Inner.getElementsByTagName("li");
    var s3LeftBtn = document.getElementById("s3LeftBtn");
    var s3RightBtn = document.getElementById("s3RightBtn");
    var s3LeftI =document.getElementById("s3LeftI");
    var s3RightI =document.getElementById("s3RightI");
    sroll(s3Inner,s3InnerList,s3LeftBtn,s3RightBtn,s3LeftI,s3RightI,3,s3Banner);

    var s3_3Banner = document.getElementById("s3_3Banner");
    var s3_3Inner = document.getElementById("s3_3Inner");
    var s3_3InnerList = s3_3Inner.getElementsByTagName("li");
    var s3_3LeftBtn = document.getElementById("s3_3LeftBtn");
    var s3_3RightBtn = document.getElementById("s3_3RightBtn");
    var s3_3LeftI =document.getElementById("s3_3LeftI");
    var s3_3RightI =document.getElementById("s3_3RightI");
    sroll(s3_3Inner,s3_3InnerList,s3_3LeftBtn,s3_3RightBtn,s3_3LeftI,s3_3RightI,3,s3_3Banner);


    /**
     * sroll横屏滚动函数包
     * @param inner
     * @param innerList
     * @param leftBtn
     * @param rightBtn
     * @param leftShw
     * @param rightShw
     * @param {Number} fnNum
     * @param banner
     */
    function sroll(inner, innerList, leftBtn, rightBtn, leftShw, rightShw, fnNum,banner) {
        var step = 0;
        var liWidth = DOM.getCss(innerList[0], "width");//->单个li长度
        if(DOM.getCss(innerList[0], "margin-right")){
            liWidth = DOM.getCss(innerList[0], "margin-right")+DOM.getCss(innerList[0], "width");

            var allWidth = liWidth * innerList.length;
        }else{
            var allWidth = DOM.getCss(innerList[0], "width") * innerList.length;
        }
        var tempStep = liWidth * 3;//->滚动步长
        var end = liWidth * 4;//->滚动结束边界
        if(banner){
            end = DOM.getCss(banner,"width");
            tempStep = DOM.getCss(banner,"width")-end%liWidth;
        }
        DOM.setCss(inner, "width", allWidth);
        DOM.setCss(leftBtn, "display", "none");
        DOM.setCss(leftShw, "display", "none");
        leftBtn.onclick = function () {
            step = step + tempStep;
            if (step > 0) {
                jackAnimate(inner, {left: 0}, 400, fnNum);
                step = 0;
                DOM.setCss(leftBtn, "display", "none");
                DOM.setCss(leftShw, "display", "none");
                return;
            } else {
                jackAnimate(inner, {left: step}, 400, fnNum);
                DOM.setCss(rightBtn, "display", "block");
                DOM.setCss(rightShw, "display", "block");
            }
        };
        rightBtn.onclick = function () {
            step = step - tempStep;
            if (step < -(allWidth - end)) {
                jackAnimate(inner, {left: -(allWidth - end)}, 400, fnNum);
                step = -(allWidth - end);
                DOM.setCss(rightBtn, "display", "none");
                DOM.setCss(rightShw, "display", "none");
                return;
            } else {
                jackAnimate(inner, {left: step}, 400, fnNum);
                DOM.setCss(leftBtn, "display", "block");
                DOM.setCss(leftShw, "display", "block");
            }
        }
    }




}();
















