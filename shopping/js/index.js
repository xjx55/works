!function(window,document,$,undefined) {
    var init = function() {
        $('#logout').on('click',onLogoutClick);

        initHandleBarsHelper();
        initGlist();

    };

    var initHandleBarsHelper = function() {
        Handlebars.registerHelper('strCut',function(str,options) {
            var len = str.length;
            if(len > 8) {
                str = str.substr(0,8) + '...';
            }
            return str;
            //console.log(str);

        });
        Handlebars.registerHelper('strCutd',function(str,options) {
            var len = str.length;
            if(len > 8) {
                str = str.substr(0,15) + '...';
            }
            return str;
            //console.log(str);

        });
    };

    var initGlist = function() {
        var url = "../../api/shopping_goods_list.php";
        $.get(url,{size:8,classify:1},function(response) {
            if(response.success) {
                //console.log(response.data);
                var source,template,html;
                source = $('#gListTpl').html(); //得到那个模板
                template = Handlebars.compile(source); //编译模板
                html = template(response); //数据和模板混合
                //console.log(html) 
                $('#gList').html(html);
            } else {

            }
        },'json');
        //gList
    };

    var onLogoutClick = function() {
        
        var url = "../../api/shopping_user_logout.php";

        $.get(url,function(response) {
                location.href = "../src/index.php";
        },'json');
        
    };

    $(document).ready(init);
}(window,document,jQuery);