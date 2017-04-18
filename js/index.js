/**
 * Created by ASUS on 2017/4/16.
 */
(function () {
    var Util = (function () {
        var StorageGetter = function (key) {
            var prefix ='h5_reader_';
            return localStorage.getItem(prefix+key);
        }
        var StorageSetter = function (key, val) {
            return localStorage.setItem(prefix+key,val);
        }
        return{
            StorageGetter:StorageGetter,
            StorageSetter:StorageSetter
        }
    })();
    var Dom ={
        topNav:$('#top-nav'),
        footerNav:$('.footer-nav')
    };
    var Win = $(window);
    var Doc = $(document);
    function ReaderModel() {
        //实现和阅读器相关的数据交互方法
    }
    function ReaderBaseFrame() {
        //渲染基本的UI结构
    }
    function EventHandler() {
        //交互事件绑定
        $('#article-action').click(function () {
            if(Dom.topNav.css('display') =='none'){
                Dom.footerNav.show();
                Dom.topNav.show();
            }else{
                Dom.footerNav.hide();
                Dom.topNav.hide();
            }
        });
        Win.scroll(function () {
            Dom.footerNav.hide();
            Dom.topNav.hide();
        });
    }
    function main() {
        //整个项目入口函数
        EventHandler();
    }
    main();
})();