//高级单例模式:使用惰性思想实现的单例模式,项目中的单例模式一般都是要用这样的来使用->把一些公用的放在私有作用域中事先获取到,然后以以后每一个方法需要使用都可以直接的获取使用了,不需要自己再单独的处理一遍

var DOM = (function () { //这个作用域不销毁
    var flag = "getComputedStyle" in window;
    return {
        /**
         *  获取浏览器窗口
         * @param attr 读取
         * @param val   赋值(设置值)
         * @returns {number}
         */
        getWin: function (attr, val) {//获取可视窗口的高度
            if (val != undefined) {
                document.documentElement[attr] = val;
                document.body[attr] = val;
            }
            return document.documentElement[attr] || document.body[attr];
        },

        listToArray: function (likeArray) {
            var arr = [];
            try {
                arr = Array.prototype.slice.call(likeArray);
            } catch (e) {
                for (var i = 0; i < likeArray.length; i++) {
                    arr.push(likeArray[i]);
                }
            }
            return arr;
        },
        formatJSON: function (str) {
            return "JSON" in window ? JSON.parse(str) : eval('(' + str + ')');
        },
        win: function (attr, val) {
            if (typeof val == "undefined") {
                return document.documentElement[attr] || document.body[attr]
            }
            document.documentElement[attr] = val;
            document.body[attr] = val;
        },
        getCss: function (ele, attr) {
            var val = '';
            var reg = '';
            if (flag) {
                val = getComputedStyle(ele, null)[attr];
            } else {
                if (attr == "opacity") {
                    val = ele.currentStyle["filter"];
                    reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/;
                    val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
                } else {
                    val = ele.currentStyle[attr];
                }
            }
            reg = /^-?\d+(\.\d+)?(px|pt|em|rem|%)?$/;
            return reg.test(val) ? parseFloat(val) : val;
        },
        offset: function (ele) {
            var top = ele.offsetTop;
            var left = ele.offsetLeft;
            var p = ele.offsetParent;
            while (p) {
                if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                    top += p.clientTop;
                    left += p.clientLeft;
                }
                top += p.offsetTop;
                left += p.offsetLeft;
                p = p.offsetParent;
            }
            return {
                top: top,
                left: left
            }
        },
        /**
         * 子节点
         * @param ele 要找谁的儿子标签(哪个元素的)
         * @param tagName 我们要找特定的儿子
         * @returns {Array} 是我们返回找到的儿子节点
         */
        children: function (ele, tagName) {
            //要返回一个数组
            var ary = [];
            if (flag) {//判断是不是ie8 != -1是ie8
                ary = DOM.listToArray(ele.children);
            } else {
                //要先拿到ele下的所有儿子节点 ele.childNodes
                for (var i = 0; i < ele.childNodes.length; i++) {
                    var cur = ele.childNodes[i];//拿到当前节点
                    if (cur.nodeType == 1) {//如果nodeType是1的话 表示当前是标签元素
                        ary[ary.length] = cur;
                    }
                }
            }
            if (typeof tagName == "string") {
                //把ary再次进行筛选
                var newAry = [];
                for (var i = 0; i < ary.length; i++) {
                    var cur = ary[i];
                    if (cur.nodeName == tagName.toUpperCase()) {//当前的标签名是否等于需要的那一个
                        newAry.push(cur)
                    }
                }
                ary = newAry;
            }
            return ary;
        },
        /**
         * 哥哥元素
         * @param ele 要获得上一元素的元素名
         * @returns {*}
         */
        prev: function (ele) {
            if (flag) {
                return ele.previousElementSibling;
            }
            var p = ele.previousSibling;//先找一次
            while (p && p.nodeType != 1) {
                p = p.previousSibling;
            }
            return p;
        },

        next: function (ele) {
            if (flag) {
                return ele.nextElementSibling;
            }
            var n = ele.nextSibling;
            while (n && n.nodeType != 1) {
                n = n.nextSibling;
            }
            return n;
        },

        prevAll: function (ele) {
            var ary = [];
            var p = this.prev(ele);//先望上找一个标签元素
            while (p) {
                ary.unshift(p);//倒序
                p = this.prev(p);
            }
            return ary;
        },

        nextAll: function (ele) {
            var ary = [];
            var n = this.next(ele);//先望上找一个标签元素
            while (n) {
                ary.push(n);
                n = this.next(n);
            }
            return ary;
        },
        /**
         * 获取相邻元素 一个哥哥和一个弟弟
         * @param ele
         * @returns {Array} 如果没有就返回null
         */
        sibling: function (ele) {
            var ary = [];
            this.prev(ele) ? ary.push(this.prev(ele)) : false;
            this.next(ele) ? ary.push(this.next(ele)) : false;
            return ary;
        },

        /**
         * 获取兄弟元素 所有的哥哥和所有的弟弟
         * @param ele
         * @returns {Array.<T>|string}  如果没有就返回空数组
         */
        siblings: function (ele) {
            return this.prevAll(ele).concat(this.nextAll(ele));
        },

        /**
         * 获得当前元素的索引位置
         * @param ele
         * @returns {*}
         */
        index: function (ele) {
            return this.prevAll(ele).length;
        },

        /**
         * 第一个子节点
         * @param container 第一个子节点
         * @returns {*}
         */
        firstChild: function (container) {
            if (flag) {
                return container.firstElementChild;
            }
            //拿到所有子节点,并判断子节点是否存在
            return this.children(container).length ? this.children(container).length[0] : null;
        },

        /**
         * 最后一个子节点
         * @param container 最后一个子节点
         * @returns {*}
         */
        lastChild: function (container) {
            if (flag) {
                return container.lastElementChild;
            }
            return this.children(container).length ? this.children(container).length - 1 : null;
        },

        //把某个元素
        /**
         * 把某个元素追加到哪个元素里面的末尾
         * @param ele 要操作的元素
         * @param container 被添加的盒子
         * @return 被添加的标签
         */
        append: function (ele, container) {
            return container.appendChild(ele);
        },

        /**
         * 插入盒子内元素的前面
         * @param ele 要插进去的元素
         * @param container 被元素插入的容器
         * @return 被添加的标签
         */
        prepend: function (ele, container) {
            //先获取第一个子元素
            var of = this.firstChild(container);
            return container.insertBefore(ele.of);//没有子元素会自动把ele添加进去

        },

        /**
         * 把新的元素插入到旧的元素前面
         * @param newEle 新的元素
         * @param oldEle 旧的元素
         */
        insertBefore: function (newEle, oldEle) {
            return oldEle.parentNode.insertBefore(newEle, oldEle);
        },

        /**
         * 把某个元素插入到某个元素的后面
         * @param newEle
         * @param oldEle
         * @returns {Node}
         */
        insertAfter: function (newEle, oldEle) {
            var oN = this.next(oldEle);
            return oldEle.parentNode.insertBefore(newEle, oN);
        },

        /**
         * 判断标签的class名里是否含有类名
         * @param ele 要判断的标签名
         * @param name 判断是否存在的类名
         * @returns {boolean}
         */
        hasClass: function (ele, name) {
            var reg = new RegExp("(?:^| +)" + name + "(?: +|$)");
            return reg.test(ele.className);
        },

        /**
         * 添加class名称样式
         * @param ele 被添加的元素
         * @param className 要添加的类名 字符串格式
         */
        addClass: function (ele, className) {
            var ary = className.split(/\s+/);//把多个要添加的class名分开,把多个的分开成一个数组
            for (var i = 0; i < ary.length; i++) {
                var cur = ary[i];//要把每一个要添加的样式都拿出来进行判断
                if (!(this.hasClass(ele, cur))) {//先判断有没有要添加的样式(没有样式才要添加),
                    ele.className += " " + cur;//要增加一个空格,否则会连在一起,添加的是拆分完毕的样式
                }
            }
        },

        /**
         *移除class中的类名
         * @param ele 当前操作的元素
         * @param className 移除的哪个样式
         */
        removeClass: function (ele, className) {
            if (this.hasClass(ele, className)) {
                ele.className = ele.className.replace(className, "");
            }
        },

        /**
         * 通过class类名获取元素
         * @param className 要获得所带样式名的
         * @param context  上下文,从哪里获取
         */
        getByClass: function (context,className) {//
            var context = context || document;//如果context没有传就默认document
            if (flag) {//不是ie低版本下就可以直接调用原声的
                return this.listToArray(context.getElementsByClassName(className));
            }
            //如果在ie低版本下,那么先拿到context下的所有标签,再一一匹配看是否能匹配到带有样式的 如果匹配了 就放入数组里
            var allTag = context.getElementsByTagName("*");
            var classList = className.replace(/^ +| +$/g, "").split(/\s+/);//去掉前后空格/^ +| +$/g 全局匹配
            var ary = [];
            for (var i = 0; i < allTag.length; i++) {//遍历每一个标签
                var cur = allTag[i];//拿到一个标签和任意一个class名字匹配,如果有一个不一样,就不是想要的
                var f = true;//刚开始设置为是当前元素上的
                for (var j = 0; j < classList.length; j++) {
                    var curClassName = classList[j];
                    var reg = new RegExp("(?:^| +)" + curClassName + "(?:  +|$)");
                    if (!reg.test(cur.className)) {
                        f = false;
                        break;
                    }
                }
                if (f) {
                    ary.push(cur);
                }
            }
            return ary;
        },

        /**
         *  设置元素的样式
         * @param ele 当前要设置样式的元素
         * @param attr 当前元素要设置的css属性
         * @param value 当前元素要设置的css属性的值
         */
        setCss: function (ele, attr, value) {
            if (attr == "opacity") {//处理透明度
                if (window.navigator.userAgent.indexOf("MSIE") >= 0) {
                    ele.style["filter"] = "alpha(opacity =" + value * 100 + ")";
                } else {
                    ele.style.opacity = value;
                }
                return;
            }
            //float的问题也需要处理 cssFloat  styleFloat
            if (attr === "float") {
                ele.style["cssFloat"] = value;
                ele.style["styleFloat"] = value;
                return;
            }


            var reg = /^(width|height|top|right|bottom|left|(margin|padding)(Top|Right|Bottom|Left)?)$/;//判断传进来这个value是否带单位,如果带单位就不加
            if (reg.test(attr)) {//验证通过就证明是平常的标准css样式
                if (!isNaN(value)) {//没带单位就加上单位
                    value += "px";
                }
            }
            ele.style[attr] = value;
        },

        /**
         * 批量设置元素样式属性
         * @param curEle 要设置动画的元素
         * @param obj 元素的样式属性--->对象
         */
        setGroupCss: function (curEle, obj) {//因为是一组样式,所以需要传一个对象参数,一个对象可以包含多组属性和属性值
            obj = obj || "0";
            //if(Object.prototype.toString.call(obj) === "[object Object]"){}
            if (obj.toString() != "[object Object]")return;
            for (var key in obj) {//循环设置obj的每一组属性样式
                if (obj.hasOwnProperty(key)) {//如果是自己的私有属性才循环设置
                    this.setCss(curEle,key,obj[key]);
                }
            }
        }
    }
})();



