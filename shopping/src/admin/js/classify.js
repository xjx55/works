!function(window,document,$,undefined) {

    var Classify = {
        $myc:$('#myClassify'),

        init:function() {
            Classify.List(); //把表格渲染到页面
            Classify.bindEvent(); //所有的事件
        },

        bindEvent:function() {
            $('#newBtn').on('click',this.onNewBtnClick);
            $('#saveBtn').on('click',this.onSaveBtnClick);
            this.$myc.find('#name').on('keyup',this.onNameKeyup);
            
        },



        onNameKeyup:function() {
            var txt = this.value,
                $that = $(this);
            //console.log(txt);
            if(!txt) {
                return;
            }

            Util.ajax({
                url:'../../../api/shopping_classify_check.php', 
                data:{name:txt},
                success:function(response) {
                    if(response.total == 0) {
                        $that.parent('div').removeClass('has-error').addClass('has-success');
                    }else {
                        $that.parent('div').removeClass('has-success').addClass('has-error');
                    }
                }   
            });

        },
        List:function() {

            Util.ajax({
                url:'../../../api/shopping_classify_list.php',
                success:function(response) {
                    var data = response.data,
                        trArr = [];
                    $.each(data,function(i,obj) {
                        trArr.push(
                            '<tr>',
                              '<td class="w-30"><input type="checkbox" id="all"></td>' ,   
                              '<td class="w-50">',i + 1,'</td>',
                              '<td class="w-360">',obj.name,'</td>',
                            '</tr>'  
                            );
                    });
                    $('#classifyTable tbody').html(trArr.join(''));
                },
            }); 
        },
        onSaveBtnClick:function() {

            var $name = Classify.$myc.find('#name'),
                name = $name.val();


            //表单验证
            if($.trim(name) == '') {
             layer.tips('请输入商品库存','#name');
            return false;
            }; 

            if($name.parent('div').hasClass('has-error')) {
                layer.msg('该类别已经存在',{offset:15,shift:8});
                return;
            };
            
            
            //封装好的
            Util.ajax({
                url:'../../../api/shopping_classify_add.php',
                data:{name:name},
                success:function(response) {
                    layer.msg('增加成功',{offset:0,shift:0}); 
                    Classify.$myc.modal('hide');
                    Classify.List();  
                }
            });
            //没有封装的
            /*layer.load('加载中',{time:0,shade:[0.2,'#000']});
            $.get('../../../api/shopping_classify_add.php',{name:name},function(response) {
                if(response.success) {
                    layer.msg('增加成功',{offset:15,shift:0});
                }else {
                    layer.msg('新增类别失败',{offset:15,shift:0});
                };
            },'json');*/
        },
        onNewBtnClick:function() {
            Classify.$myc.modal('show')
        }

    };
    $(document).ready(Classify.init);
}(window,document,jQuery);