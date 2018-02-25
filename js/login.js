$().ready(function () {
    // 获取验证码
    var verifyCode = new GVerify("v_container");
    // 获取所有待处理按钮
    var joinUs = $("#joinUs");
    var resgister_dialog = $("#register-dialog");
    var close_register_btn = $("#close-btn");
    var forgetBtn = $("#forgetBtn");
    var forget_dialog = $("#forget-dialog");
    var close_forget_btn = $("#close-forget-btn");
    // 注册弹层
    openDialog(joinUs, resgister_dialog, close_register_btn);
    // 忘记密码弹层
    openDialog(forgetBtn, forget_dialog, close_forget_btn);


    // 原始方法测试通过后删除
    // $("#joinUs").bind("click",function(){
    //     $("#register-dialog").fadeIn();
    //     $("document").addClass("bindheight");
    //     $("body").addClass("bindheight");
    // });
    // $("#close-btn").bind("click",function(){
    //     $("#register-dialog").fadeOut();
    //     $("document").removeClass("bindheight");
    //     $("body").removeClass("bindheight");
    // });
    
    // $("#forgetBtn").bind("click",function(){
    //     $("#forget-dialog").fadeIn();
    //     $("document").addClass("bindheight");
    //     $("body").addClass("bindheight");
    // });
    // $("#close-forget-btn").bind("click",function(){
    //     $("#forget-dialog").fadeOut();
    //     $("document").removeClass("bindheight");
    //     $("body").removeClass("bindheight");
    // });

    // 添加验证密码强度方法
    $.validator.addMethod("af",function(value,element,params){  
        return this.optional(element) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(value);
    },"必须包含大小写字母,数字及一个特殊字符");
    // 添加验证图片验证码方法
    $.validator.addMethod("picValidate",function(value,element,params){  
        //return this.optional(element) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(value);
        return this.optional(element) || verifyCode.validate(value);
    },"图片验证码有误");
    // 在键盘按下并释放及提交后验证提交表单
    $("#commentForm").validate({
        onkeyup:false,
        rules: {
            emailnumber: "required",
            siginpassword1: "required",
            siginpassword2: "required",
            pic_validator:"required",
            email_validator:"required",
            login_email:"required",
            login_password: "required",
            emailnumber: {
                required: true,
                minlength: 2,
            },
            pic_validator: {
                required:true,
                picValidate:true,
                minlength:4
            },
            signpassword1: {
                required: true,
                minlength: 6,
                af:true,
            },
            signpassword2: {
                required: true,
                minlength: 6,
                equalTo: "#signpassword1"
            },
            agree: "required"
        },
        messages: {
            emailnumber: "请输入一个正确的邮箱",
            signpassword1: {
                required: "请输入密码",
                af: '密码至少包一个大写字母、一个小写字母及一个符号，长度至少6位',  
                minlength: "密码长度不能小于 6 个字母"
            },
            signpassword2: {
                required: "请输入密码",
                minlength: "密码长度不能小于 6 个字母",
                equalTo: "两次密码输入不一致"
            },
            pic_validator: {
                required: "请输入验证码",
                minlength: "图片验证码不能为空",
                picValidate: "图片验证码有误"
            },
            email_validator:"邮箱验证码不能为空",
            agree: "请接受我们的声明",
        },
        submitHandler: function () {
            alert("提交事件!");
        }
    });
    $("#loginForm").validate({
        rules: {
            login_email:"required",
            login_password: "required",
            login_email: {
                required: true,
                minlength: 2,
            },
            login_password: {
                required: true,
                minlength: 6,
                af:true,
            },
        },
        messages: {
            login_email: "请输入一个正确的邮箱",
            login_password: {
                required: "请输入密码",
                af: '密码至少包一个大写字母、一个小写字母及一个符号，长度至少6位',  
                minlength: "密码长度不能小于 6 个字母"
            },
        },
        submitHandler: function () {
            alert("提交事件!");
        }
    });
    $("#forgetForm").validate({
        rules: {
            forget_email:"required",
            forget_email: {
                required: true,
                minlength: 2,
            },
        },
        messages: {
            forget_email: "请输入一个正确的邮箱",
        }
    });
});
/**
 * 打开&&关闭弹层方法
 * @param {*} clickElement 开启按钮
 * @param {*} openElement 打开层
 * @param {*} closeBtn 关闭按钮
 */
function openDialog(clickElement, openElement, closeBtn) {
    clickElement.bind("click",function(){
        openElement.fadeIn();
        $("document").addClass("bindheight");
        $("body").addClass("bindheight");
    });
    closeBtn.bind("click",function(){
        openElement.fadeOut();
        $("document").removeClass("bindheight");
        $("body").removeClass("bindheight");
    });
}
