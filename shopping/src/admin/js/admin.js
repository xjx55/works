!function(window,document,$,undefined) {
    var $modal= $('#myModal');
    var cache = {};
    var param = {
        query:'',
        size:3,
        page:0

    };
    var totalPage;
    var clsCache;
   //程序的唯一入口
    var init = function() {  

        bindEvent();  //新增商品
        getTableData();    //把对象组成的数组渲染成表格到页面
    };

    var getTableData = function() {
        var url =  '../../../api/shopping_goods_list.php';
        var url2 = '../../../api/shopping_classify_list.php';

        setTimeout(function() {
            layer.load('加载中',{time:0,shade:[0.2,'#000']});    
        }, 0);

        $.when($.getJSON(url,param),$.getJSON(url2)).done(function(resList,resClassify) {
            //console.log(a);
            //console.log(b);
            if(resList[0].success && resClassify[0].success) {
                //renderTable(response); //把数据渲染到页面
                //cache = response.data;
                layer.closeAll();
            } else {
                layer.closeAll();
                layer.msg('暂无查询数据',{offset:0,shift:0}); 
            };
            clsCache = resClassify[0];
            renderTable(resList[0]);
            renderPaging(resList[0]);
        });
        /*setTimeout(function() {
            layer.load('加载中',{time:0,shade:[0.2,'#000']});    
        }, 0);
        $.get(url,param,function(response) {
            if(response.success) {
                //renderTable(response); //把数据渲染到页面
                //cache = response.data;
                layer.closeAll();
            } else {
                layer.closeAll();
                layer.msg('暂无查询数据',{offset:0,shift:0}); 
            };
            //layer.closeAll();
            renderTable(response);
            renderPaging(response);
        },'json');*/
    };
    var renderPaging = function(response) {
        var total = response.total;
        totalPage = Math.ceil(total/param.size);//总页数    
        //var $pageUl = $('#pageUl');
        var liArr = ['<li class="prev"><a href="javescript:;">&laquo;</a></li>'];
        //param.totalPage = totalPage;
        for(var i=0; i<totalPage; i++) {
            if(param.page == i) {  //方法二
                liArr.push('<li data-page="',i,'" class="active"><a href="javescript:;">', i + 1,'</a></li>'); 
            }else {
                liArr.push('<li data-page="',i,'" ><a href="javescript:;">', i + 1,'</a></li>');
            };
            
        };
        liArr.push('<li class="next"><a href="#">&raquo;</a></li>');
        $('#pageUl').html(liArr.join(''));
        //$('#pageUl').html(liArr.join('')).find('li').eq(param.page + 1).addClass('active'); //方法一
        
        //console.log(totalPage);
    };
    var renderTable = function(resList) {
        var data = resList.data,
            trArr = [];
    $.each(data,function(i,obj) {
        var title = obj.title;
        title = title.length > 20 ? title.substr(0, 20) + '...' : title;
        if(param.query != '') {
            title = title.replace(param.query,'<span class="orange">' + param.query + '</span>');
            // title替换成带样式的title
        }

        trArr.push(
           ' <tr>',
               ' <td class="w-30">',
                  '<input id="',obj.id,'" type="checkbox" name="chks">',
                '</td>',
                '<td>',i+1,'</td>',
                '<td title="', obj.title, '">', title, '</td>',
                '<td>￥',obj.price,'</td>',
                '<td title="',obj.details,'"><span class="txt-ellipsis w-420">',obj.details,'</span></td>',
                '<td>',obj.amount,'</td>',
                '<td>',getNameById(obj.classify,clsCache.data),'</td>',
            '</tr>'
        );
            
        cache[obj.id] = obj;
        
    });
        
        $('#goodsTable tbody').html(trArr.join(''));
    };
    var getNameById = function(id,arr) {
        var name;
        $.each(arr,function(i,obj) {
            if(obj.id == id) {
                name = obj.name;
                return false;
            }
        });
        return name;
    };
    //绑定所有的事件
    var bindEvent = function() {  
        $('#newBtn').on('click',onNewBtnClick);  //新增商品按钮
        $('#saveBtn').on('click',onSaveBtnClick);//保存按钮被点击
        $('#all').on('click',onAllClick);    
        $('#goodsTable').on('click','tbody input[type=checkbox]',onChksClick); //给未来元素绑定事件，给未来元素的父元素绑定
        $('#delBtn').on('click',onDelBtnClick);
        $('#changeBtn').on('click',onChangeBtnClick);
        $('#goodsTable').on('click','tbody input[type=checkbox]',onChkBoxClick);
        $('#findBtn').on('click',onFindBtnClick); //查询按钮
        $('#pageUl').on('click','li',onPageLiClick);//给分页的li绑定未来事件
    };

    var onPageLiClick = function() {
        var $this=$(this),
            page = $this.attr('data-page');
        if($this.hasClass('next')) {
            page = ++param.page;
            page = page > (totalPage - 1) ? totalPage - 1 :page;
        }else if($this.hasClass('prev')){
            page = --param.page;
            page = page < 0 ? 0:page;
        };

        param.page = page;
        getTableData();
    };
    
    var onFindBtnClick = function() {
        var $findIpt = $('#findIpt'),
            txt = $findIpt.val();
        param.query = txt;
        param.page = 0;
        getTableData();

    };
    $("body").keydown(function() { //点击回车进行查询
        if (event.keyCode == "13") {//keyCode=13是回车键
            //$('#find').click();
            onFindBtnClick();
        }
    });    
    var onChangeBtnClick = function() {
        var $chked = $('#goodsTable tbody input[type=checkbox]:checked');
        var id = $chked[0].id;
        //var url = '../../../api/shopping_goods_update.php';
        //console.log(id);
        //console.log(cache[id]);
        //var obj = getObj(id,cache);
        var obj = cache[id];
        renderClassify();
        //console.log(obj);
        $modal.find('#title').val(obj.title);
        $modal.find('#price').val(obj.price);
        $modal.find('#details').val(obj.details);
        $modal.find('#amount').val(obj.amount);
        $modal.find('#classify').val(obj.classify);
        $modal.find('#gid').val(id);
        $modal.find('input[name=status][value="'+obj.status+'"]').trigger('click');

        $modal.find('#myModalTitle') .text('修改商品').end().modal({
            backdrop:'static' //使模态框点击叉号才可以关闭        
        });
        //$delBtn.attr('disabled','disabled');
        
        var $changeBtn = $('#changeBtn'),
            $delBtn = $('#delBtn');
        $changeBtn.attr('disabled','disabled');
        $delBtn.attr('disabled','disabled');
        
    };
    // 方法一：通过遍历得到当前对象
    /*var getObj = function(id,arr) {
        var len = arr.length;
        if(len == 0) {
            return null;
        };
        for(var i = 0 ; i<len ; i++) {
            if(arr[i].id == id) {  //得到数组里ID为点到的那个ID一样的对象
                return arr[i];
            }
        };
        return null;
    };*/

    var onChkBoxClick = function() {
        var $chked = $('#goodsTable tbody input[type=checkbox]:checked'),
            $delBtn = $('#delBtn'),
            $changeBtn = $('#changeBtn'),
            len = $chked.length;

        if(len > 0) {
            $delBtn.removeAttr('disabled');
            $changeBtn.attr('disabled','disabled');
            if(len == 1) {
               $changeBtn.removeAttr('disabled'); 
            };
        } else {
            $delBtn.attr('disabled','disabled');
            $changeBtn.attr('disabled','disabled');
        }
    };
    var onDelBtnClick = function() {
        var $chked = $('#goodsTable tbody input[type=checkbox]:checked'),//得到被选中的商品 
            delArr = [],
            url = '../../../api/shopping_goods_del.php';
        layer.confirm('确定要删除选中列表吗？', {
          btn: ['取消','确定'], //按钮
          closeBtn:0
        }, function(){
            layer.closeAll();
        }, function(){

            layer.load('加载中',{time:0,shade:[0.2,'#000']});
            $chked.each(function() {  //遍历被选中的项，得到ID，push到数组里
                delArr.push(this.id);
            });

            $.get(url,{ids:delArr.join(',')},function(response) {
                if(response.success) {
                   layer.msg('删除商品成功',{offset:15,shift:0}); 
                   getTableData();
                   $('#delBtn').attr('disabled','disabled');
                   $('#changeBtn').attr('disabled','disabled');
                } else {

                };
            },'json');
          
        });
    };

    //保存按钮被点击
    var onSaveBtnClick = function() {
        var url = '../../../api/shopping_goods_add.php';
        var id = $('#gid').val();
        var data = {
            //id:$('#gid').val(),
            title:$('#title').val(),
            price:$('#price').val(),
            details:$('#details').val(),
            amount:$('#amount').val(),
            classify:$('#classify').val(),
            status:$('input[name=status]:checked').val(),
        };
        if(id !=0) {  //如果是新增就没有ID，修改有ID
            url = '../../../api/shopping_goods_update.php';
            data.id = $('#gid').val(); 
           
        };
        //console.log(data);
     
        //console.log(data);
        if($.trim(data.title) == '') {
            layer.tips('请输入商品名称','#title');
            return false;
        };

        if($.trim(data.price) == '') {
            layer.tips('请输入商品价格','#price');
            return false;
        };
        if($.trim(data.details) == '') {
             layer.tips('请输入商品介绍','#details');
            return false;
        };
        if($.trim(data.amount) == '') {
             layer.tips('请输入商品库存','#amount');
            return false;
        };
        if($.trim(data.classify) == 0) {
             layer.tips('请输入商品类别','#classify');
            return false;
        };
        layer.load('加载中',{time:0,shade:[0.2,'#000']});
        $.get(url,data,function(response){
            if(response.success) {
                layer.closeAll();//显示加载
                $modal.modal('hide'); //遮罩层影藏
                $('#formClose').trigger('reset');//表单内容清空
                layer.msg('成功',{offset:15,shift:0});
                getTableData(); //重新修改页面
            } else {
                layer.msg('新增商品失败',{offset:15,shift:0});
            };
        },'json');
    };


    //被点击时的事
    

    //商品添加按钮被点击时做的事情
    var onNewBtnClick = function() {
        renderClassify(); 
        $('#formClose').trigger('reset');//表单内容清空
            $modal
            .find('#gid').val(0).end()    
            .find('#myModalTitle') .text('新增商品').end().modal({
                backdrop:'static' //使模态框点击叉号才可以关闭        
            }); 
        /*getClassifyData(function() {
            $('#formClose').trigger('reset');//表单内容清空
            $modal
            .find('#gid').val(0).end()    
            .find('#myModalTitle') .text('新增商品').end().modal({
                backdrop:'static' //使模态框点击叉号才可以关闭        
            });      
        });*/
        /*$modal.modal({
            backdrop:'static' //使模态框点击叉号才可以关闭        
        }); */   
    };
    var renderClassify = function() {
        var optArr = ['<option value="0">请选择</option>'];
         $.each(clsCache.data,function(i,obj) {
                    optArr.push('<option value="',obj.id,'">',obj.name,'</option>');
                });
                $modal.find('#classify').html(optArr.join(''));    
    };
    /*var getClassifyData = function(callback) {
        var url = '../../../api/shopping_classify_list.php';
        layer.load('加载中',{time:0,shade:[0.2,'#000']});
        $.get(url,function(response) {
            var optArr = ['<option value="0">请选择</option>'];
            if(response.success) {
                $.each(response.data,function(i,obj) {
                    optArr.push('<option value="',obj.id,'">',obj.name,'</option>');
                });
                $modal.find('#classify').html(optArr.join(''));
                callback(); //数据请求成功后才显示增加商品的框
                layer.closeAll();
            }else {

            };
        },'json');
    };*/
    

    
    //jQuery实现复选框的全选
   /* var $all = $('#all'),     //变量声明在外面，不然下面还得在另个函数里再声明一遍
        len = $('input[name=chks]').length;   *///得到input标签[name=chks]的所有input的个数
    var onAllClick = function() {
        var $all = $('#all'),
            len = $('input[name=chks]').length; 
        if($all.prop('checked')) {       //如果all被点击则所有的name=chks的input被选
            $('input[name=chks]').prop('checked',true);
        }else {
            $('input[name=chks]').prop('checked',false);
        }
    };
    var onChksClick = function() {
        var $all = $('#all'),
            len = $('input[name=chks]').length; 
        var len2 =$('input[name=chks]:checked').length;  //得到被选择的个数

        if(len2 == len) {  // 如果被选择的个数等于总个数则all为被选状态
            $all.prop('checked',true);
        }else {
            $all.prop('checked',false);
        }
        //console.log(len2)
    };
   


  
         
   

   $(document).ready(init);
}(window,document,jQuery);