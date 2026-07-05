const wrapper=document.querySelector(".sd-wrapper");
const slides=document.querySelectorAll(".sd-slide");
const dots=document.querySelector(".sd-dots");

let index=0;
let start=0;
let current=0;

slides.forEach((s,i)=>{
let dot=document.createElement("span");
if(i===0) dot.classList.add("active");
dot.onclick=()=>goSlide(i);
dots.appendChild(dot);
});

function update(){

if(window.innerWidth<=767){
wrapper.style.transform=`translateY(-${index*100}vh)`;
}else{
wrapper.style.transform=`translateX(-${index*100}vw)`;
}

document.querySelectorAll(".sd-dots span").forEach((d,i)=>{
d.classList.toggle("active",i===index);
});

}

function goSlide(i){
index=i;
update();
}

function next(){
index=(index+1)%slides.length;
update();
}

let auto=setInterval(next,5000);

function restart(){
clearInterval(auto);
auto=setInterval(next,5000);
}

wrapper.addEventListener("touchstart",e=>{
start=window.innerWidth<=767?e.touches[0].clientY:e.touches[0].clientX;
});

wrapper.addEventListener("touchend",e=>{

current=window.innerWidth<=767?e.changedTouches[0].clientY:e.changedTouches[0].clientX;

let diff=start-current;

if(diff>60){
index=(index+1)%slides.length;
}

if(diff<-60){
index=(index-1+slides.length)%slides.length;
}

update();
restart();

});

window.addEventListener("resize",update);

update();
