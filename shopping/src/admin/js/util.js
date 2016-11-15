!function(window,document,$,undefined) {

    function Util() {

    };
    Util.prototype = {
        ajax:function(param) {
            setTimeout(function() {
                layer.load('加载中',{time:0,shade:[0.2,'#000']});    
            }, 0);
            $.ajax({
                method:param.method || 'get', //请求方法
                url:param.url, //请求地址
                data:param.data || {},//发送到服务器端的值
                dataType:param.dataType || 'json', //请求类型
                success:function(response) { //请求成功后的回调函数
                    layer.closeAll();
                    param.success(response);
                },
                error:function(response) { //请求失败时的回调函数
                    layer.closeAll();
                    param.error && param.error(response);
                }
            });
        },
        http: function($http, param) {
            setTimeout(function() {
                layer.load('加载中',{time:0,shade:[0.2,'#000']});    
            }, 0);

            $http({
                url: param.url,
                method: param.method || 'get',
                params: param.params || {}
            }).success(function(response) {
                param.success && param.success(response);
                layer.closeAll();
            });
        }
    };

    window.Util = new Util();
}(window,document,jQuery);