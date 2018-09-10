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
     
    

    $('.line_text').draggable();
})


// CreateModel依赖全局变量
var countId = 0;//记录重复拖动的ID
var modelId = 'PROCESS_DOM_';

// 创建model模型构造函数
function CreateModel(ui,select){
    // 创建svg模型，添加定位
    var left = parseInt(ui.offset.left - $(select).offset().left);
    var top = parseInt(ui.offset.top - $(select).offset().top+20);//20是margin值
    countId++;
    var id = modelId+countId;
    var createDom = '<div id="'+id+'" class="process">'+$(ui.draggable).html()+'</div>'
    
    $('#center').append(createDom);
    $('#'+id).css('left',left).css('top',top);

    // 设置连接点
    jsPlumb.addEndpoint(id,{ anchors: "RightMiddle"},hollowCircle);
    jsPlumb.addEndpoint(id,{ anchors: "LeftMiddle"},hollowCircle);
    jsPlumb.addEndpoint(id,{ anchors: "TopCenter"},hollowCircle);
    jsPlumb.addEndpoint(id,{ anchors: "BottomCenter"},hollowCircle);
    //jsPlumb.draggable(id);

    $('#'+id).draggable({
        start: function (){
            jsPlumb.repaintEverything();
        },
        drag:function(){
            jsPlumb.repaintEverything();
        },
        stop: function () {
            jsPlumb.repaintEverything();
        }
    });
    
    $('.text-ling').click(function(){alert($(this).html())});

    // 模型节点缩放配置
    console.log()
    $("#"+id).resizable({
        resize: function (event,ui) {
            jsPlumb.repaint(ui.helper);
            jsPlumb.repaintEverything();
        },
        handles:'se',
        autoHide:true
    });
   
}