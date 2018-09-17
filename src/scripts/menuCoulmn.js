


// 说明：添加、移除、检测 className
// 整理：CodeBit.cn ( http://www.codebit.cn )  
function hasClass(element, className) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    return element.className.match(reg);
}
function addClass(element, className) {
    if (!this.hasClass(element, className)) { element.className += " " + className; }
}
function removeClass(element, className) {
    if (hasClass(element, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)'); element.className = element.className.replace(reg, ' ');
    }
}






/*--------------------------------- 以下4个方法 摘自网络 ----------------------------------------*/
Array.prototype.remove = function (item) {
    for (var i = 0; i < this.length; i++) {
        if (item == this[i])
            break;
    }
    if (i == this.length)
        return;
    for (var j = i; j < this.length - 1; j++) {
        this[j] = this[j + 1];
    }
    this.length--;
}

String.prototype.replaceAll = function (AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return this.replace(raRegExp, ARepText);
}

function getAllChildren(e) {
    return e.all ? e.all : e.getElementsByTagName('*');
}

document.getElementsBySelector = function (selector) {

    if (!document.getElementsByTagName) {
        return new Array();
    }

    var tokens = selector.split(' ');
    var currentContext = new Array(document);
    for (var i = 0; i < tokens.length; i++) {
        token = tokens[i].replace(/^\s+/, '').replace(/\s+$/, '');;
        if (token.indexOf('#') > -1) {

            var bits = token.split('#');
            var tagName = bits[0];
            var id = bits[1];
            var element = document.getElementById(id);
            if (tagName && element.nodeName.toLowerCase() != tagName) {

                return new Array();
            }
            currentContext = new Array(element);
            continue;
        }
        if (token.indexOf('.') > -1) {

            var bits = token.split('.');
            var tagName = bits[0];
            var className = bits[1];
            if (!tagName) {
                tagName = '*';
            }

            var found = new Array;
            var foundCount = 0;
            for (var h = 0; h < currentContext.length; h++) {
                var elements;
                if (tagName == '*') {
                    elements = getAllChildren(currentContext[h]);
                } else {
                    elements = currentContext[h].getElementsByTagName(tagName);
                }
                for (var j = 0; j < elements.length; j++) {
                    found[foundCount++] = elements[j];
                }
            }
            currentContext = new Array;
            var currentContextIndex = 0;
            for (var k = 0; k < found.length; k++) {
                if (found[k].className && found[k].className.match(new RegExp('\\b' + className + '\\b'))) {
                    currentContext[currentContextIndex++] = found[k];
                }
            }
            continue;
        }

        if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
            var tagName = RegExp.$1;
            var attrName = RegExp.$2;
            var attrOperator = RegExp.$3;
            var attrValue = RegExp.$4;
            if (!tagName) {
                tagName = '*';
            }
            var found = new Array;
            var foundCount = 0;
            for (var h = 0; h < currentContext.length; h++) {
                var elements;
                if (tagName == '*') {
                    elements = getAllChildren(currentContext[h]);
                } else {
                    elements = currentContext[h].getElementsByTagName(tagName);
                }
                for (var j = 0; j < elements.length; j++) {
                    found[foundCount++] = elements[j];
                }
            }
            currentContext = new Array;
            var currentContextIndex = 0;
            var checkFunction;
            switch (attrOperator) {
                case '=':
                    checkFunction = function (e) { return (e.getAttribute(attrName) == attrValue); };
                    break;
                case '~':
                    checkFunction = function (e) { return (e.getAttribute(attrName).match(new RegExp('\\b' + attrValue + '\\b'))); };
                    break;
                case '|':
                    checkFunction = function (e) { return (e.getAttribute(attrName).match(new RegExp('^' + attrValue + '-?'))); };
                    break;
                case '^':
                    checkFunction = function (e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0); };
                    break;
                case '$':
                    checkFunction = function (e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length); };
                    break;
                case '*':
                    checkFunction = function (e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1); };
                    break;
                default:
                    checkFunction = function (e) { return e.getAttribute(attrName); };
            }
            currentContext = new Array;
            var currentContextIndex = 0;
            for (var k = 0; k < found.length; k++) {
                if (checkFunction(found[k])) {
                    currentContext[currentContextIndex++] = found[k];
                }
            }
            continue;
        }
        tagName = token;
        var found = new Array;
        var foundCount = 0;
        for (var h = 0; h < currentContext.length; h++) {
            var elements = currentContext[h].getElementsByTagName(tagName);
            for (var j = 0; j < elements.length; j++) {
                found[foundCount++] = elements[j];
            }
        }
        currentContext = found;
    }
    return currentContext;
}
//禁止鼠标右键菜单
document.oncontextmenu = function (e) {
    return false;
}


function addEvent(eventType, eventFunc, eventObj) {
    eventObj = eventObj || document;
    if (window.attachEvent) eventObj.attachEvent("on" + eventType, eventFunc);
    if (window.addEventListener) eventObj.addEventListener(eventType, eventFunc, false);
}

function clearEventBubble(evt) {
    evt = evt || window.event;
    if (evt.stopPropagation) evt.stopPropagation();
    else evt.cancelBubble = true;
    if (evt.preventDefault) evt.preventDefault();
    else evt.returnValue = false;
}

function posXY(event, sDivId) {
    event = event || window.event;
    //var posX = (event.x || event.offsetX);
    //var posY = (event.y || event.offsetY);
    var oDiv = document.getElementById(sDivId);
    var divX = GetDivToBodyOffsetX(oDiv, oDiv.offsetLeft);
    var divY = GetDivToBodyOffsetY(oDiv, oDiv.offsetTop);

    var posX = event.pageX || (event.clientX +
    (document.documentElement.scrollLeft || document.body.scrollLeft));
    var posY = event.pageY || (event.clientY +
    (document.documentElement.scrollTop || document.body.scrollTop));
    return { x: posX - divX, y: posY - divY };
}

function GetDivToBodyOffsetX(obj,intX) {
    if (obj.parentElement) {
        intX += obj.parentElement.offsetLeft;
        intX = GetDivToBodyOffsetX(obj.parentElement, intX);
    }

    return intX;
}

function GetDivToBodyOffsetY(obj, intY) {
    if (obj.parentElement) {
        intY += obj.parentElement.offsetTop;
        intY = GetDivToBodyOffsetY(obj.parentElement, intY);
    }

    return intY;

}

//----------- 区域选择关键方法 -----------------------
var _selectedRegions = [];
//var selProp;

function RegionSelect(selRegionProp) {
    //selProp = selRegionProp;
    this.regions = [];
    this.selProp = selRegionProp;
    this.InitRegions(selRegionProp);
    this.selectedClass = selRegionProp["selectedClass"];
    this.selectedRegion = [];
    this.selectDiv = null;
    this.startX = null;
    this.startY = null;
    this.parentId = selRegionProp["parentId"];
}

RegionSelect.prototype.InitRegions = function () {
    var _self = this;
    _self.regions = [];
    var _regions = document.getElementsBySelector(_self.selProp["region"]);//$("#divCenter > .node");//

    var bSelect = true;
    if (_regions && _regions.length > 0) {
        for (var i = 0; i < _regions.length; i++) {
            _regions[i].onmousedown = function () {
                bSelect = false;
                var evt = window.event || arguments[0];
                if (!evt.shiftKey && !evt.ctrlKey) {
                    if ($.inArray(this, _selectedRegions) === -1) {
                        // 清空所有select样式
                        _self.clearSelections(_regions);
                        this.className += " " + _self.selectedClass;
                        // 清空selected数组，并加入当前select中的元素
                        _selectedRegions = [];
                        _selectedRegions.push(this);
                    }
                } else {
                    if (this.className.indexOf(_self.selectedClass) == -1) {
                        this.className += " " + _self.selectedClass;
                        _selectedRegions.push(this);
                    } else {
                        this.className = this.className.replaceAll(_self.selectedClass, "");
                        _selectedRegions.remove(this);
                    }
                }
                clearEventBubble(evt);
            }
            this.regions.push(_regions[i]);
        }
    }

    if (bSelect) {
        // 清空所有select样式
        _self.clearSelections(_regions);
        // 清空selected数组，并加入当前select中的元素
        _selectedRegions = [];
    }
}

RegionSelect.prototype.select = function () {
    var _self = this;
    var sDivId = _self.parentId;
    var intMousePosition = [0, 0];
    var intOriginalPosition = [0, 0];
    var parentWidth = parseInt(document.getElementById(sDivId).parentElement.offsetWidth);
    var parentHeight = parseInt(document.getElementById(sDivId).parentElement.offsetHeight);
    addEvent("mousedown", function () {
        var evt = window.event || arguments[0];
        var buttonType = evt.buttons || evt.button;
        if (evt.target != undefined) {
            if (evt.target.id !== sDivId) return;
        }
        if (evt.srcElement != undefined) {
            if (evt.srcElement.id !== sDivId) return;
        }
        if (evt.buttons == undefined && buttonType == 0){
            _self.onBeforeSelect(evt, sDivId);
        }
        if (buttonType === 1) {
            _self.onBeforeSelect(evt, sDivId);
        }
        if (buttonType === 2) {
            intMousePosition = [evt.clientX, evt.clientY];
            var movX = parseInt(GetStyle(document.getElementById(sDivId), "left"));
            var movY = parseInt(GetStyle(document.getElementById(sDivId), "top"));
            intOriginalPosition = [movX, movY];
            document.getElementById(sDivId).style.cursor = "move";
        }
        clearEventBubble(evt);
    }, document);

    addEvent("mousemove", function () {
        var evt = window.event || arguments[0];
        //if (evt.target.id !== sDivId) return;
        var buttonType = evt.buttons || evt.button;
        if (evt.buttons == undefined && buttonType == 0) {
            _self.onSelect(evt, sDivId);
        }
        if (buttonType === 1) {
            _self.onSelect(evt, sDivId);
        }
        if (buttonType === 2) {
            var newX = intOriginalPosition[0] + evt.clientX - intMousePosition[0];
            var newY = intOriginalPosition[1] + evt.clientY - intMousePosition[1];
            if (newX >= 0) {
                newX = 0;
            }
            if (newY >= 0) {
                newY = 0;
            }
            $("#" + sDivId).css("left", newX + "px");
            $("#" + sDivId).css("top", newY + "px");
            $("#" + sDivId).css("width", (parentWidth-newX) + "px");
            $("#" + sDivId).css("height", (parentHeight-newY) + "px");

        }
        clearEventBubble(evt);
    }, document);

    addEvent("mouseup", function () {
        var evt = window.event || arguments[0];
        var buttonType = evt.buttons || evt.button;
        if (evt.buttons == undefined && buttonType == 0) {
        }
        if (buttonType === 1) {
        }
            document.getElementById(sDivId).style.cursor = "default";
            _self.onEnd();
    }, document);
}

RegionSelect.prototype.onBeforeSelect = function (evt, sDivId) {
    // 创建模拟 选择框
    var _self = this;
    _self.InitRegions(_self.selProp);
    if (!document.getElementById("selContainer")) {
        this.selectDiv = document.createElement("div");
        this.selectDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;";
        this.selectDiv.id = "selContainer";
        document.getElementById(sDivId).appendChild(this.selectDiv);
    } else {
        this.selectDiv = document.getElementById("selContainer");
    }

    this.startX = posXY(evt, sDivId).x;
    this.startY = posXY(evt, sDivId).y;
    this.isSelect = true;

}

RegionSelect.prototype.onSelect = function (evt, sDivId) {
    var self = this;
    if (self.isSelect) {
        if (self.selectDiv.style.display == "none") self.selectDiv.style.display = "";

        var posX = posXY(evt, sDivId).x;
        var poxY = posXY(evt, sDivId).y;
        self.selectDiv.style.left = Math.min(posX, this.startX) + "px";
        self.selectDiv.style.top = Math.min(poxY, this.startY) + "px";
        self.selectDiv.style.width = Math.abs(posX - this.startX) + "px";
        self.selectDiv.style.height = Math.abs(poxY - this.startY) + "px";

        var regionList = self.regions;
        for (var i = 0; i < regionList.length; i++) {
            if (self.selectDiv.parentNode.id !== regionList[i].parentNode.id) continue;
            var r = regionList[i], sr = self.innerRegion(self.selectDiv, r);
            if (sr && r.className.indexOf(self.selectedClass) == -1) {
                r.className = r.className + " " + self.selectedClass;
                _selectedRegions.push(r);
            } else if (!sr && r.className.indexOf(self.selectedClass) != -1) {
                r.className = r.className.replaceAll(self.selectedClass, "");
                _selectedRegions.remove(r);
            }

        }
    }
}

RegionSelect.prototype.onEnd = function () {
    var self = this;
    if (self.selectDiv) {
        self.selectDiv.style.display = "none";
    }
    this.isSelect = false;
    //_selectedRegions = this.selectedRegion;
}

// 判断一个区域是否在选择区内
RegionSelect.prototype.innerRegion = function (selDiv, region) {
    var s_top = parseInt(selDiv.style.top);
    var s_left = parseInt(selDiv.style.left);
    var s_right = s_left + parseInt(selDiv.offsetWidth);
    var s_bottom = s_top + parseInt(selDiv.offsetHeight);

    var r_top = parseInt(region.offsetTop);
    var r_left = parseInt(region.offsetLeft);
    var r_right = r_left + parseInt(region.offsetWidth);
    var r_bottom = r_top + parseInt(region.offsetHeight);

    var t = Math.max(s_top, r_top);
    var r = Math.min(s_right, r_right);
    var b = Math.min(s_bottom, r_bottom);
    var l = Math.max(s_left, r_left);

    if (b > t + 5 && r > l + 5) {
        return region;
    } else {
        return null;
    }

}

RegionSelect.prototype.clearSelections = function (regions) {
    for (var i = 0; i < regions.length; i++) {
        regions[i].className = regions[i].className.replaceAll(this.selectedClass, "");
    }
}

function getSelectedRegions() {
    return _selectedRegions;
}

/*-------------------------------------- 区域选择方法结束 --------------------------------------------*/

function showSelDiv() {
    var selInfo = "";
    var arr = getSelectedRegions();
    for (var i = 0; i < arr.length; i++) {
        selInfo += arr[i].innerHTML + "\n";
    }

    alert("共选择 " + arr.length + " 个文件，分别是：\n" + selInfo);

}

function MoveSelectDiv(event, ui,id) {
    var arr = getSelectedRegions();
    var iMoveLeft = ui.position.left - ui.originalPosition.left;
    var iMoveTop = ui.position.top - ui.originalPosition.top;

    for (var i = 0; i < arr.length; i++) {
        //if (arr[i].id === id) continue;

        if (arr[i].parentNode.id !== document.getElementById(id).parentNode.id) continue;
        var iLeft = parseInt($(arr[i]).attr("bLeft"));
        var iTop = parseInt($(arr[i]).attr("bTop"));
        $(arr[i]).css("left", (iLeft + iMoveLeft) + "px");
        $(arr[i]).css("top", (iTop + iMoveTop) + "px");
    }
}

function startMove() {
    var arr = getSelectedRegions();
    for (var i = 0; i < arr.length; i++) {
        $(arr[i]).attr("bLeft", $(arr[i]).position().left);
        $(arr[i]).attr("bTop", $(arr[i]).position().top);
    }
}

//左对齐
function SelectAlignLeft() {
    var arr = getSelectedRegions();
    var iLeft = 0;
    var id = "";

    for (var i = 0; i < arr.length; i++) {
        if (id === "") id = arr[i].parentNode.id;
        if (id !== arr[i].parentNode.id) continue;
        if ($(arr[i]).position().left<iLeft||iLeft===0) {
            iLeft = $(arr[i]).position().left;
        }
    }

    for (var j = 0; j < arr.length; j++) {
        if (id !== arr[j].parentNode.id) continue;
        $(arr[j]).css("left", iLeft + "px");
    }

    jsPlumb.repaintEverything();
}

//居中对齐
function SelectAlignCenter() {
    var arr = getSelectedRegions();
    var iLeft = 0;
    var id = "";
    console.log(arr)
    for (var i = 0; i < arr.length; i++) {
        if (id === "") id = arr[i].parentNode.id;
        if (id !== arr[i].parentNode.id) continue;
        if ($(arr[i]).position().left < iLeft || iLeft === 0) {
            iLeft = $(arr[i]).position().left + parseInt(GetStyle(arr[i],"width")) / 2;
        }
    }

    for (var j = 0; j < arr.length; j++) {
        if (id !== arr[j].parentNode.id) continue;
        $(arr[j]).css("left", (iLeft - parseInt(GetStyle(arr[j],"width")) / 2) + "px");
    }

    jsPlumb.repaintEverything();
}

// 垂直平局分布
function SelectAlignMean(){
    var arr = getSelectedRegions();

    if(arr.length<=2){
        alert('请选择至少三个个模型节点')
    }
    else{
        var minTop = arr[0].offsetTop;
        var maxTop = arr[0].offsetTop;
        var firstHeight = arr[0].offsetHeight;
        var lastHeight = arr[0].offsetHeight;

        var iH = 0;
        var ic = 0;
        for(var i=0;i<arr.length;i++){
            //console.log(arr[i].offsetTop)
            if(arr[i].offsetTop<minTop){
                minTop = arr[i].offsetTop;
                firstHeight = arr[i].offsetHeight;
            }
            if(arr[i].offsetTop>maxTop){
                maxTop = arr[i].offsetTop;
                lastHeight = arr[i].offsetHeight;
            }
    
        }
        
        var mHeight = maxTop-(minTop+firstHeight)//中间高度
        
        for(var q=0;q<arr.length;q++){
            if(arr[q].offsetTop != minTop && arr[q].offsetTop != maxTop){
                iH += arr[q].offsetHeight;
            }
        }
        for(var j=0;j<arr.length;j++){
            if(arr[j].offsetTop != minTop && arr[j].offsetTop != maxTop){
                
                console.log(ic*arr[j].offsetHeight)
                console.log((mHeight-iH)/(arr.length-1))
                var a = (mHeight-iH)/(arr.length-1);
                var s = a + firstHeight+minTop+(ic*arr[j].offsetHeight)+(ic*a);
                $(arr[j]).css("top",s);
                ic++;
            }
            
        }
        jsPlumb.repaintEverything();
    }
}

// 水平平局分布
function SelectMeanCenter(){
    var arr = getSelectedRegions();

    if(arr.length<=2){
        alert('请选择至少三个模型节点')
    }
    else{
        var minLeft = arr[0].offsetLeft;
        var maxLeft = arr[0].offsetLeft;
        var firstWidth = arr[0].offsetWidth;
        var lastWidth = arr[0].offsetWidth;

        var iH = 0;
        var ic = 0;
        for(var i=0;i<arr.length;i++){
            //console.log(arr[i].offsetTop)
            if(arr[i].offsetLeft<minLeft){
                minLeft = arr[i].offsetTop;
                firstWidth = arr[i].offsetWidth;
            }
            if(arr[i].offsetLeft>maxLeft){
                maxLeft = arr[i].offsetLeft;
                lastWidth = arr[i].offsetWidth;
            }
    
        }
        
        var mWidth = maxLeft-(minLeft+firstWidth)//中间高度
        for(var q=0;q<arr.length;q++){
            if(arr[q].offsetLeft != minLeft && arr[q].offsetLeft != maxLeft){
                iH += arr[q].offsetWidth;
            }
        }
        for(var j=0;j<arr.length;j++){
            if(arr[j].offsetLeft != minLeft && arr[j].offsetLeft != maxLeft){
                
                var a = (mWidth-iH)/(arr.length-1);
                var s = a + firstWidth+minLeft+(ic*arr[j].offsetWidth)+(ic*a);
                $(arr[j]).css("left",s);
                ic++;
            }
            
        }
        jsPlumb.repaintEverything();
    }
}

//右对齐
function SelectAlignRight() {
    var arr = getSelectedRegions();
    var iLeft = 0;
    var id = "";

    for (var i = 0; i < arr.length; i++) {
        if (id === "") id = arr[i].parentNode.id;
        if (id !== arr[i].parentNode.id) continue;
        if ($(arr[i]).position().left + parseInt(GetStyle(arr[i], "width")) > iLeft || iLeft === 0) {
            iLeft = $(arr[i]).position().left + parseInt(GetStyle(arr[i], "width"));
        }
    }

    for (var j = 0; j < arr.length; j++) {
        if (id !== arr[j].parentNode.id) continue;
        $(arr[j]).css("left", (iLeft - parseInt(GetStyle(arr[j], "width"))) + "px");
    }

    jsPlumb.repaintEverything();
}

//上对齐
function SelectAlignTop() {
    var arr = getSelectedRegions();
    var iTop = 0;
    var id = "";

    for (var i = 0; i < arr.length; i++) {
        if (id === "") id = arr[i].parentNode.id;
        if (id !== arr[i].parentNode.id) continue;
        if ($(arr[i]).position().top < iTop || iTop === 0) {
            iTop = $(arr[i]).position().top;
        }
    }

    for (var j = 0; j < arr.length; j++) {
        if (id !== arr[j].parentNode.id) continue;
        $(arr[j]).css("top", iTop + "px");
    }

    jsPlumb.repaintEverything();
}

//垂直居中
function SelectAlignMiddle() {
    var arr = getSelectedRegions();
    var iTop = 0;
    var id = "";

    for (var i = 0; i < arr.length; i++) {
        if (id === "") id = arr[i].parentNode.id;
        if (id !== arr[i].parentNode.id) continue;
        if ($(arr[i]).position().top + parseInt(GetStyle(arr[i], "height")) / 2 < iTop || iTop === 0) {
            iTop = $(arr[i]).position().top + parseInt(GetStyle(arr[i], "height")) / 2;
        }
    }

    for (var j = 0; j < arr.length; j++) {
        if (id !== arr[j].parentNode.id) continue;
        $(arr[j]).css("top", (iTop - parseInt(GetStyle(arr[j], "height")) / 2) + "px");
    }

    jsPlumb.repaintEverything();
}

//下对齐
function SelectAlignBottom() {
    var arr = getSelectedRegions();
    var iTop = 0;
    var id = "";

    for (var i = 0; i < arr.length; i++) {
        if (id === "") id = arr[i].parentNode.id;
        if (id !== arr[i].parentNode.id) continue;
        if ($(arr[i]).position().top + parseInt(GetStyle(arr[i], "height")) > iTop || iTop === 0) {
            iTop = $(arr[i]).position().top + parseInt(GetStyle(arr[i], "height"));
        }
    }

    for (var j = 0; j < arr.length; j++) {
        if (id !== arr[j].parentNode.id) continue;
        $(arr[j]).css("top", (iTop - parseInt(GetStyle(arr[j], "height"))) + "px");
    }

    jsPlumb.repaintEverything();
}


//删除选中
function DeleteSelect() {
    var arr = getSelectedRegions();
    for (var i = 0; i < arr.length; i++) {
        jsPlumb.remove(arr[i],true);
        //var points = jsPlumb.getEndpoints(arr[i]);
        //for (var j = 0; j < points.length; j++) {
        //    jsPlumb.deleteEndpoint(points[j]);
        //}
        //arr[i].parentNode.removeChild(arr[i]);
        }

    jsPlumb.repaintEverything();

}

function GetStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];  //只适用于IE
    }
    else {
        return getComputedStyle(obj, false)[attr];   //只适用于FF,Chrome,Safa
    }
    return obj.style[attr]; //在IE和FF下没有用,chrome有用
}



/** Event handler for mouse wheel event. 
         *鼠标滚动事件 
         */
var wheel = function (event) {

    var delta = 0;

    if (!event) /* For IE. */
        event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
        delta = event.wheelDelta / 120;
    } else if (event.detail) {
        /** Mozilla case. */
        /** In Mozilla, sign of delta is different than in IE. 
         * Also, delta is multiple of 3. 
         */
        delta = -event.detail / 3;
    }
    /** If delta is nonzero, handle it. 
     * Basically, delta is now positive if wheel was scrolled up, 
     * and negative, if wheel was scrolled down. 
     */
    if (!event.target.id) return;
    if (delta)
        handle(delta, event.target);
    /** Prevent default actions caused by mouse wheel. 
     * That might be ugly, but we handle scrolls somehow 
     * anyway, so don't bother here.. 
     */
    if (event.preventDefault)
        event.preventDefault();
    event.returnValue = false;
}

var setZoom = function (obj) {
    
/** Initialization code.  
 * If you use your own event management code, change it as required. 
 */
    if (obj.addEventListener) {
    /** DOMMouseScroll is for mozilla. */
        obj.addEventListener('DOMMouseScroll', wheel, false);
}
/** IE/Opera. */
    obj.onmousewheel = document.onmousewheel = wheel;

/** This is high-level function. 
 * It must react to delta being more/less than zero. 
 */

}

var zoom = 1;
var handle = function (delta,obj) {
    var random_num = Math.floor((Math.random() * 100) + 50);
    zoom += delta / 10;
    if (zoom >= 1) {
        Transform.showTransform(zoom, obj);
    } else {
        zoom = 1;
    }
    if (delta < 0) {
        //alert("鼠标滑轮向下滚动：" + delta + "次！"); // 1  
        // $("btn_next_pic").onclick(random_num);
        return;
    } else {
        //alert("鼠标滑轮向上滚动：" + delta + "次！"); // -1  
        // $("btn_last_pic").onclick(random_num);
        return;
    }
}

var Transform = {
    //hasBoxShadow: function () {
    //    if ($("#demo-box-shadow")[0].checked == true) {
    //        $("#demo").addClass("has-shadow");
    //    } else {
    //        $("#demo").removeClass("has-shadow");
    //    }
    //},
    showTransform: function (iDelta,obj) {
        //var originX = $("#originX").val() + $("#originX-units").val();
        //var originY = $("#originY").val() + $("#originY-units").val();
        //var transformOriginString = originX + " " + originY;
        var M11 = iDelta;
        var M12 = 0.0;
        var M21 = 0.0;
        var M22 = iDelta;
        var M13 = 0.0;
        var M23 = 0.0;


        $(obj).css({
            "-moz-transform": "scale(" + M11 + "," + M22 + ")",
            //"-moz-transform-origin": transformOriginString,
            "-webkit-transform": "scale(" + M11 + "," + M22 + ")",
            //"-webkit-transform-origin": transformOriginString,
            "-o-transform": "scale(" + M11 + "," + M22 + ")",
            "transform": "scale(" + M11 + "," + M22 + ")"
            //"-o-transform-origin": transformOriginString,
            //"filter": "progid:DXImageTransform.Microsoft.Matrix(M11=" + M11 + ",M12=" + M12 + ",M21=" + M21 + ",M22=" + M22 + ", sizingMethod='auto expand')"
        });
        //$("#code").html("-moz-transform:matrix(" + M11 + "," + M12 + "," + M21 + "," + M22 + "," + M13 + "px," + M23 + "px);-moz-transform-origin:" + transformOriginString + ";-webkit-transform:matrix(" + M11 + "," + M12 + "," + M21 + "," + M22 + "," + M13 + "," + M23 + ");-moz-transform-origin:" + transformOriginString + ";-o-transform:matrix(" + M11 + "," + M12 + "," + M21 + "," + M22 + "," + M13 + "," + M23 + ");-o-transform-origin:" + transformOriginString + ")");
    }
};