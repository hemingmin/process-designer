// 自定义右键菜单
$(document).bind('contextmenu',function(){return false})
jsPlumb.bind('contextmenu', function (conn, originalEvent) {
        
   
    //console.log($('#centextMenu'))
    if($('#centextMenu').length>0){
        $('#centextMenu').remove();
        
    }
    var centextMenu = '<div id="centextMenu" style="top:'+originalEvent.pageY+'px;left:'+originalEvent.pageX+'px;">'+
    '<a class="delete_line" href="javascript:;">删除连接线</a>'+
    '<a class="update_line" href="javascript:;">折线连接线</a></div>'

    $('body').append(centextMenu);

    $('.delete_line').bind('click',function(){
        if (confirm('确定删除所点击的链接吗？')) {
            jsPlumb.detach(conn)
        }
    })

    $('.update_line').bind('click',function(){
        // 改变线类型（直线，折线，曲线）
        // conn.connector.type = 'Straight';
        // console.log(conn.connector);
    })
    
})

// 处理自定义菜单兼容
$(document).bind('click',function(){
    try{
        $('#centextMenu').remove();
    }catch(e){
        console.log(e)
    }
})