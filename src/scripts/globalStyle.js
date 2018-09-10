// 基本连接线样式
var connectorPaintStyle = {
    strokeStyle:'#42546c',
    fillStyle:'transparent',
    radius:5,
    lineWidth:1
}

// 鼠标悬浮在线上样式
var connectorHoverStyle = {
    lineWdith:3,
    strokeStyle:'red',
    outlineWidth:4
}

var endpointHoverStyle = {
    fillStyle:'#42546c',
    strokeStyle:'#42546c'
}

// 端点样式,（修改变量名）
var hollowCircle = {
    DragOptions: { cursor: 'pointer', zIndex: 2000 },
    endpoint: ["Dot", { radius: 7 },],  //端点的形状
    connectorStyle: connectorPaintStyle,//连接线的颜色，大小样式
    connectorHoverStyle: connectorHoverStyle,
    paintStyle: {
        fillStyle: "#42546c",
        radius: 3,
        lineWidth: 'transparent'
    },        
    //端点的颜色样式
    //anchor: "AutoDefault",
    isSource: true,    //是否可以拖动（作为连线起点）
    connector: ["Flowchart", { stub: [0, 0], gap: 0, cornerRadius: 5, alwaysRespectStubs: true }],  //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
    isTarget: true,    //是否可以放置（连线终点）
    maxConnections: -1,    // 设置连接点最多可以连接几条线
    connectorOverlays: [
        ["Arrow", { width: 10, length: 10, location: 1 }]
       // ["Label",{label:setLineText,cssClass:'line_text'}]//通过方法设置连接线文字
    ]
}

function setLineText(){
    return 'ddd'
}