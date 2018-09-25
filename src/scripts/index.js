$(function(){

    ecinc_process.init();
    ecinc_attr_panel.init();
    
    // 处理兼容点击连线状态
    $('#center').click(function(){
        var aConn = jsPlumb.getConnections();//获取容器所有的连接线
        for(var i=0;i<aConn.length;i++){
            aConn[i].setPaintStyle({
                strokeStyle: "#42546c", fillStyle: "transparent", radius: 5, lineWidth: 1
              })
        }
    })



})

// 流程类，挂载全局
var ecinc_process = {};

ecinc_process.init = function(){
    ecinc_process.configLeft();
}
ecinc_process.configLeft = function(){
    var aLi = $('#left .domList').find('li');
    aLi.each(function(i,elem){
        aLi.eq(i).attr('associated',modeldata[i].associated);
        aLi.eq(i).attr('resize',modeldata[i].resize);
        aLi.eq(i).attr('domJoin',modeldata[i].domJoin);
    })
}

var ecinc_attr_panel = {}

ecinc_attr_panel.init = function(){
    ecinc_attr_panel.setDrag();
}

ecinc_attr_panel.setDrag = function(){
    $('#right').draggable();
}