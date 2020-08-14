var bodyContextCheck = document.body.oncontextmenu.toString().slice(document.body.oncontextmenu.toString().indexOf("return"),document.body.oncontextmenu.toString().indexOf("}",document.body.oncontextmenu.toString().indexOf("turn")));
bodyContextCheck = bodyContextCheck.slice("\n");
var styles = document.createElement("style");
styles.innerHTML = decodeURI(":root%20%7B%0A%20%20--container-dark:%20#171717;%0A%0A%20%20--text-dark:%20#aaaaaa;%0A%20%20--text-info:%20#777777;%0A%20%20--text-light:%20#ffffff;%0A%0A%20%20--button-medium-hover:%20#4a4a4a;%0A%7D%0A.ctxMenu%20%7B%0A%20%20width:%20120px;%0A%20%20height:%20120px;%0A%20%20background:%20var(--container-dark);%0A%20%20position:fixed;%0A%20%20top:0;%20left:0;%0A%20%20z-index:%204;%0A%20%20transition:%200.3s%20ease%20all;%0A%20%20color:%20var(--text-dark);%0A%20%20cursor:pointer;%0A%20%20border-radius:%205px;%0A%20%20transform:%20scale(0);%0A%7D%0A.ctxMenu%20span%20%7B%0A%20%20float:%20right;%0A%20%20color:%20var(--text-info);%0A%20%20font-size:%2010px;%0A%20%20line-height:20px;%0A%7D%0A.ctxMenu%20div%20%7B%0A%20%20position:relative;%0A%20%20height:40px;%0A%20%20width:100%25;%0A%20%20padding:5px;%0A%20%20border-radius:%205px;%0A%7D%0A.ctxMenu%20div:hover%20%7B%0A%20%20transition:%200.2s%20ease%20all;%0A%20%20background:%20var(--button-medium-hover);%0A%20%20color:%20var(--text-light);%0A%7D");
document.head.appendChild(styles);
document.body.innerHTML += decodeURI("%3Cdiv%20class=%22ctxMenu%22%3E%0A%3Cdiv%20onmousedown=%22copy();%22%20id=%22copy%22%3ECopy%3Cspan%3ECtrl+C%3C/span%3E%3C/div%3E%0A%3Cdiv%20onmousedown=%22paste();%22%20id=%22paste%22%3EPaste%3Cspan%3ECtrl+V%3C/span%3E%3C/div%3E%0A%3Cdiv%20onmousedown=%22cut();%22%20id=%22cut%22%3ECut%3Cspan%3ECtrl+X%3C/span%3E%3C/div%3E%0A%3C/div%3E");
var ctx = document.querySelector(".ctxMenu"),ctxStyle = ctx.style,previous = document.activeElement;
oncontextmenu = function(e){
  previous = document.activeElement;
  var w = window.innerWidth,
      h = window.innerHeight,
      wh = 120,
      x = e.x + "px",
      y = e.y + "px";
  ctx.style.transform = "scale(1)";
  ctxStyle.top = y;
  ctxStyle.left = x;
  if (e.x + wh > w){
    ctxStyle.left = ((parseInt(ctxStyle.left) - (parseInt(ctxStyle.left) - window.innerWidth)) - wh) + "px";
  }
  if (e.y + wh > h){
    ctxStyle.top = ((parseInt(ctxStyle.top) - (parseInt(ctxStyle.top) - window.innerHeight)) - wh) + "px";
  }
}
if (bodyContextCheck != "return false\n"){
  oncontextmenu = function(){
    alert("Your body tag must include: \n oncontextmenu = 'return false; '");
    return false;
  }
}
onclick = function(e){
  if (ctxStyle.transform == "scale(1)"){
    ctxStyle.transform = "scale(0)";
    ctxStyle.top = e.y;
    ctxStyle.left = e.x;
  }
}
window.onmousemove = function(e){
  if (ctxStyle.transform == "scale(0)"){
    ctxStyle.top = e.y;
    ctxStyle.left = e.x;
  }
}
function copy(){
  previous.focus();
  var text = window.getSelection().toString();
  document.execCommand('copy');
}
function paste(){
  previous.focus();
  navigator.clipboard.readText().then(text => {
    text = text.toString();
    var start = previous.selectionStart,
        first = previous.value.substring(0, start) + text,
        second = previous.value.substring(start, previous.length);
    previous.value = first + second;
    previous.selectionStart = start + text.length;
    previous.selectionEnd = start + text.length;
  });
}
function cut(){
  previous.focus();
  var text = window.getSelection().toString();
  document.execCommand('copy');
  previous.value = previous.value.split(text).join("");
}