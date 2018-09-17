// 自定义右键菜单
$(document).bind('contextmenu',function(){return false})
jsPlumb.bind('contextmenu', function (conn, originalEvent) {
        
    //conn.connector = ["Straight", { stub: [0, 0], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }];
   console.log(conn)
   //hollowCircle
    //console.log($('#centextMenu'))
    if($('#centextMenu').length>0){
        $('#centextMenu').remove();
        
    }
    var centextMenu = '<div id="centextMenu" style="top:'+originalEvent.pageY+'px;left:'+originalEvent.pageX+'px;">'+
    '<a class="delete_line" href="javascript:;">删除连接线</a></div>'

    $('body').append(centextMenu);

    $('.delete_line').bind('click',function(){
        if (confirm('确定删除所点击的链接吗？')) {
            jsPlumb.detach(conn)
        }
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

$(function(){
    $('#conn_type').change(function(){
        var strlinetype = "";
        var strlinecolor = "";
        if($(this).val()==1){
            strlinetype = "Flowchart";
            strlinecolor = "#42546c";
            hollowCircle.connector = ["Flowchart", { stub: [0, 0], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }];
        }
        else if($(this).val()==2){
            strlinetype = "Straight";
            strlinecolor = "#59aa59";
            hollowCircle.connector = ["Straight", { stub: [0, 0], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }];
        }
        else if($(this).val()==3){
            strlinetype = "Bezier";
            strlinecolor = "#1ab394";
            hollowCircle.connector = ["Bezier", { stub: [0, 0], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }];
        }

        var arrnode = $("#center").find(".process");
        for (var i = 0; i < arrnode.length; i++) {
            var arrendpoints = jsPlumb.getEndpoints($(arrnode[i]).attr("id"));
            if (arrendpoints == undefined || arrendpoints == null) {
                return;
            }
            var oconnector = arrendpoints[0].connector;
            if (oconnector == null || oconnector == undefined) {
                return;
            }
            oconnector[0] = strlinetype;
            var oconnectstyle = arrendpoints[0].connectorStyle;
            if (oconnectstyle == null || oconnectstyle == undefined) {
                return;
            }
            oconnectstyle.strokeStyle = strlinecolor;
        }
    })

    var oRegionSelect = new RegionSelect({
        region: '#center div.process',
        selectedClass: 'seled',
        parentId: "center"
    });
    oRegionSelect.select();
    
    $('#topAlign').click(function(){
        SelectAlignTop();
    })
    $('#leftAlign').click(function(){
        SelectAlignLeft();
    })
    $('#verticalAlign').click(function(){
        SelectAlignCenter();
    })
    $('#verticalMean').click(function(){
        SelectAlignMean();
    })
    $('#levelAlign').click(function(){
        //SelectAlignCenter();
        SelectAlignMiddle();
    })
    $('#levelMean').click(function(){
        //SelectAlignCenter();
        SelectMeanCenter();
    })

})