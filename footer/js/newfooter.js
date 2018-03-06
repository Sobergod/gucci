$(document).ready(function () {
    $(function () {
        GoTop.init("#goTop");
    });
    $(".free-send").click(function(){
        popDialog.init(".free-send-dialog", ".closeDialog");
    });
    $(".free-bag").click(function(){
        popDialog.init(".free-bag-dialog", ".closeDialog");
    })
    $(".call-phone").click(function(){
        popDialog.init(".phone-dialog", ".closeDialog");
    })
});

// 回到顶部方法
var GoTop = {
    goBtn: null,
    topHeight: 100,
    mWindow: $(window),

    // 初始化
    init: function (config) {
        this.goBtn = $(config);
        this.bind();
        return this;
    },

    // 为按键绑定事件
    bind: function () {
        var self = this;
        this.goBtn.on("click", function () {
            self.gotoTop();
        })
    },

    // 回到顶部
    gotoTop: function () {
        $('html , body').animate({ scrollTop: 0 }, 'slow');
    },
    // 检查当前屏幕高度
    checkTop: function () {
        if (this.mWindow.scrollTop() > this.topHeight) {
            return true;
        } else {
            return false;
        }
    }
};
// 弹层方法
var popDialog = {
    mPopDialog: null,
    mCloseBtn: null,
    // 初始化
    init: function (popBtn, closeBtn) {
        this.mPopDialog = $(popBtn);
        this.mCloseBtn = $(closeBtn);
        this.bind();
        return this;
    },
    // 绑定事件
    bind: function () {
        var self = this;
        this.render();
        this.mCloseBtn.on("click", function () {
            self.close();
        });
    },
    // 渲染
    render: function () {
        if (this.mPopDialog.is(":hidden")) {
            $("body").addClass("noScroll");
            $("document").addClass("noScroll");
            this.mPopDialog.fadeIn()
        } else {
            $("body").remove("noScroll");
            $("document").remove("noScroll");
            this.mPopDialog.fadeOut();
        }
    },
    close: function () {
        $("body").removeClass("noScroll");
        $("document").removeClass("noScroll");
        this.mPopDialog.fadeOut();
    }
}