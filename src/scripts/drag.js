$(function(){
    // 左侧拖拽
    $('#left').find('.btn').draggable({
        helper: "clone",
        scope:'plant'
    })

    // 中间放置
    $('#center').droppable({
        scope:'plant',
        drop:function(event,ui){
            // 工厂方式模型创建
            CreateModel(ui,$(this))
        }
    })
})


var countId = 0;//记录重复拖动的ID
var modelId = 'PROCESS_DOM_';

// 创建model模型构造函数
function CreateModel(ui,select){
    // 创建模型，添加定位
    var left = parseInt(ui.offset.left - $(select).offset().left);
    var top = parseInt(ui.offset.top - $(select).offset().top+20);//20是margin值
    countId++;
    var id = modelId+countId;
    var createDom = '<div id="'+id+'" class="process">'+$(ui.draggable).html()+'</div>'
    console.log($(ui.helper).attr("dbtype"))
    $('#center').append(createDom);
    $('#'+id).css('left',left).css('top',top);

    // 
    console.log(modelId)
    jsPlumb.addEndpoint(id,{ anchors: "TopCenter"},hollowCircle);
    jsPlumb.addEndpoint(id,{ anchors: "LeftMiddle"},hollowCircle);
    jsPlumb.addEndpoint(id,{ anchors: "TopCenter"},hollowCircle);
    jsPlumb.addEndpoint(id,{ anchors: "BottomCenter"},hollowCircle);
    jsPlumb.draggable(id);
}