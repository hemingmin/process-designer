$(function(){

    ecinc_process.init();

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