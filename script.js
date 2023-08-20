setTimeout(function(){
	Main();
}, 100);

let isMobile = navigator.userAgent.match(/iPhone|Android.+Mobile/);
let isWebApp = new URLSearchParams(location.search).get("webapp") || navigator.standalone;
if(isMobile && !isWebApp){
	document.getElementsByClassName("webapp_recommend")[0].style.display = "block";
}
