!function(window,document,$,undefined) {
    var init = function() {
        $('#loginBtn').on('click',onLoginBtnClick);
    };

    var onLoginBtnClick = function() {
        var data = {
            user : $('#uname').val(),
            pswd : $('#pword').val()
        };

        //表单验证
        
        var url = "../../../api/shopping_user_login.php";

        $.get(url,data,function(response) {
            if(response.success) {
                location.href = "../index.php";
            } else {
                alert('登录失败，请重试！')
            }
        },'json');
        
    };

    $(document).ready(init);
}(window,document,jQuery);