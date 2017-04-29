/**
 * Created by ASUS on 2017/4/16.
 */
(function () {

    var Util = (function () {  //实现浏览器本地存储
        var prefix = 'h5_reader_';
        var StorageGetter = function (key) {
            return localStorage.getItem(prefix + key);
        };
        var StorageSetter = function (key, val) {
            return localStorage.setItem(prefix + key, val);
        };
        return {
            StorageGetter: StorageGetter,
            StorageSetter: StorageSetter
        }
    })();


    var Dom = {
        topNav: $('#top-nav'),
        footerNav: $('.footer-nav'),
        fontContainer: $('#font-container'),
        fontContainerBg: $('.nav-pannel-bg'),
        bgCurrent:$('.bg-current'),
        nightIcon:$('#night-icon'),
        dayIcon:$('#day-icon')
    };
    var Win = $(window);
    var Doc = $(document);
    var body = $('body');
    var RootContainer = $('#chapter-content');
    var initFontSize = Util.StorageGetter('font_size');//初始字号
    var bgColor = Util.StorageGetter('background');//初始背景
    var color= Util.StorageGetter('color');//初始字体颜色
    initFontSize = parseInt(initFontSize);
    if (!initFontSize) {
        initFontSize = 14;
    }
    RootContainer.css('font-size', initFontSize);
    if(!bgColor){
        bgColor = '#e9dfc7';
    }
    body.css('background',bgColor);
    if(!color){
        color='#555';
    }
    RootContainer.css('color',color);




    function ReaderModel() {
        //实现和阅读器相关的数据交互方法
    }

    function ReaderBaseFrame() {
        //渲染基本的UI结构
    }

    function EventHandler() {
        //交互事件绑定
        $('#article-action').click(function () {
            if (Dom.topNav.css('display') == 'none') {
                Dom.footerNav.show();
                Dom.topNav.show();
            } else {
                Dom.footerNav.hide();
                Dom.topNav.hide();
                Dom.fontContainer.hide();
                Dom.fontContainerBg.hide();
            }
        });
        $('#large-font').click(function () { //字体增大
            if (initFontSize > 20) {
                return;
            }
            initFontSize += 1;
            RootContainer.css('font-size', initFontSize);
            Util.StorageSetter('font_size', initFontSize);
        })
        $('#small-font').click(function () {//字体减小
            if (initFontSize < 12) {
                return;
            }
            initFontSize -= 1;
            RootContainer.css('font-size', initFontSize);
            Util.StorageSetter('font_size', initFontSize);
        })
        $('#font-button').click(function () {
            if (Dom.fontContainer.css('display') == 'none') {
                Dom.fontContainer.show();
                Dom.fontContainerBg.show();
            } else {
                Dom.fontContainer.hide();
                Dom.fontContainerBg.hide();
            }
        })

        $('.bg-container').click(function () {//改变背景
            bgColor =  $(this).css('background');
            $('.bg-current').css('display','none');
            $(this).find('.bg-current')[0].style.display = 'block';
            //console.log(bgColor);
            body.css('background',bgColor);
            switch(bgColor){
                case 'rgb(15, 15, 15)':
                    color = 'rgb(169,169,169)';
                    break;
                case 'rgb(255, 255, 255)':
                    color='rgb(0,0,0)';
                    break;
                case 'rgb(167, 251, 177)':
                    color='rgb(0,0,0)';
                    break;
                default:
                    color='rgb(85,85,85)';
            }
            RootContainer.css('color',color);
            Util.StorageSetter('color',color);
            Util.StorageSetter('background', bgColor);


            Dom.nightIcon.show();//在开启夜间模式后，若点击切换背景，夜间模式失效
            Dom.dayIcon.hide();
        })

        $('#night-button').click(function () {//夜间模式切换
            if(Dom.dayIcon.css('display') == 'none'){//切换到夜间
                Dom.nightIcon.hide();
                Dom.dayIcon.show();
                body.css('background', 'rgb(15, 15, 15)');
                RootContainer.css('color', 'rgb(169,169,169)');
            }else {
                Dom.nightIcon.show();
                Dom.dayIcon.hide();
                body.css('background','rgb(255, 255, 255)');
                RootContainer.css('color','rgb(0, 0, 0)');
            }
        });


        Win.scroll(function () {
            Dom.footerNav.hide();
            Dom.topNav.hide();
            Dom.fontContainer.hide();
            Dom.fontContainerBg.hide();
        });
    }

    function main() {
        //整个项目入口函数
        EventHandler();
    }

    main();
})();