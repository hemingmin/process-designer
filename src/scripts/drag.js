$(function(){
    // 左侧拖拽
    $('#left ul').find('li').draggable({
        helper: "clone",
        scope:'plant'
    })

    // 中间放置
    $('#center').droppable({
        scope:'plant',
        drop:function(event,ui){
            // 工厂方式模型创建
            //console.log($(ui.draggable).attr('associated'));
            var modelType = $(ui.draggable).attr('associated');
            var resize = $(ui.draggable).attr('resize');
            var domJoin = $(ui.draggable).attr('domJoin');
            console.log(modelType)
            if($(ui.draggable).attr('associated')=='start'){
                model.start++;
            }
            model.CreateModel(ui,$(this),resize,domJoin,modelType)
        }
    })
    
})


// CreateModel依赖全局变量
//var countId = 0;//记录重复拖动的ID
//var modelId = 'PROCESS_DOM_';

// 模型对象
var model = {};

// 定义模型属性
model.countId = 0;//记录重复拖动的ID
model.modelId = 'PROCESS_DOM_';
model.createDom = '';
model.start = 0;//用于判断开始节点是否存在

// 创建model模型构造函数
model.CreateModel = function(ui,select,resize,domJoin,modelType){
    if(model.start > 1 && modelType=='start'){
        alert('已经有开始节点存在了')
        return false;
    }
    // 创建svg模型，添加定位
    var left = parseInt(ui.offset.left - $(select).offset().left);
    var top = parseInt(ui.offset.top - $(select).offset().top+20);//20是margin值
    model.countId++;
    var id = model.modelId + model.countId;
    
    
    if(modelType == 'start'){
        model.createDom = model.customModel(id,modelType);
        console.log(model.createDom)
    }
    else if(modelType == 'jslc'){
        model.createDom  = model.customModel(id,modelType);
    }
    else if(modelType == 'jsrw'){
        model.createDom  = model.customModel(id,modelType);
    }
    else if(modelType == 'zyjd'){
        model.createDom  = model.customModel(id,modelType);
    }
    else if(modelType == 'dfzjd'){
        model.createDom = model.customModel(id,modelType);
    }
    else if(modelType == 'jhjd'){
        model.createDom = model.customModel(id,modelType);
    }
    else if(modelType == 'jcjd'){
        model.createDom = model.customModel(id,modelType);
    }
    else{
        model.createDom = model.ordinaryModel(id,modelType);
    }
    
    $('#center').append(model.createDom);
    $('#'+id).css('left',left).css('top',top);

    // 设置连接点
    if(domJoin == 1){
        jsPlumb.addEndpoint(id,{ anchors: "BottomCenter"},hollowCircle);
    }
    else{
        jsPlumb.addEndpoint(id,{ anchors: "RightMiddle"},hollowCircle);
        jsPlumb.addEndpoint(id,{ anchors: "LeftMiddle"},hollowCircle);
        jsPlumb.addEndpoint(id,{ anchors: "TopCenter"},hollowCircle);
        jsPlumb.addEndpoint(id,{ anchors: "BottomCenter"},hollowCircle);
    }
    
    //模型节点拖拽
    $('#'+id).draggable({
        start: function (){
            startMove();
            jsPlumb.repaintEverything();
        },
        drag:function(event,ui){
            MoveSelectDiv(event, ui, id);
            jsPlumb.repaintEverything();
        },
        stop: function () {
            jsPlumb.repaintEverything();
        }
    });

    // 模型节点缩放配置
    if(parseInt(resize)){
        $("#"+id).resizable({
            resize: function (event,ui) {
                jsPlumb.repaint(ui.helper);
                jsPlumb.repaintEverything();
            },
            handles:'se',
            autoHide:true
        });
    }

    // 节点删除，包括连线
    $('#'+id).bind('mousedown',function(e){
        if(e.which == 3){
            if (confirm('确定删除节点吗？')) {
                jsPlumb.remove(id)
            }
        }
    })

    // 设置所有连线文字可拖拽(不知道什么原因，无效)
    jsPlumb.draggable($('._jsPlumb_overlay'))
}

// 普通模型节点生产
model.ordinaryModel = function (id,modelType){
    
    var typeStr = '';
    var title = '';//模型标题
    var text = '';//模型内容

    for(var i=0;i<modeldata.length;i++){
        if(modeldata[i].associated == modelType){
            title = modeldata[i].title;
            text = modeldata[i].text;
        } 
    }

    switch(modelType){
        case 'ptjd':
        typeStr = 'ptjd';
        break;
        case 'jzjd':
        typeStr = 'jzjd';
        break;
        case 'drbx':
        typeStr = 'drbx';
        break;
        case 'drcx':
        typeStr = 'drcx';
        break;
        case 'hqjd':
        typeStr = 'hqjd';
        break;
        case 'ywjd':
        typeStr = 'ywjd';
        break;
    }
    var createDom = '<div id="'+id+'" class="process model_process">'+
    '<div class="title">'+
            '<img src="images/center/c_'+typeStr+'.png" width="22" alt="">'+
            '<span>'+title+'</span>'+
        '</div>'+
        '<p>'+text+'</p>'+
    '</div>';
    return createDom;
}


// 定制模型节点生产
model.customModel = function(id,modelType){
    // var title = '';
    // for(var i=0;i<modeldata.length;i++){
    //     if(modeldata[i].associated == modelType){
    //         title = modeldata[i].title;
    //     }
    // }
    // console.log(title)
    var createDom = '<div id="'+id+'" class="process '+modelType+'"></div>';
    
    return createDom;
}

