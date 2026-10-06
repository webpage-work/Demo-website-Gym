const header=document.querySelector(".header"),menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav"),loader=document.querySelector(".loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),500));
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>40));
menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const reveals=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
reveals.forEach(e=>observer.observe(e));

const counters=document.querySelectorAll("[data-count]");
let counted=false;
const countObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!counted){counted=true;counters.forEach(el=>{const target=+el.dataset.count;let n=0;const step=Math.max(1,Math.ceil(target/35));const tick=()=>{n=Math.min(n+step,target);el.textContent=n;if(n<target)requestAnimationFrame(tick)};tick()});countObserver.disconnect()}},{threshold:.5});
if(counters.length)countObserver.observe(counters[0]);

const lightbox=document.getElementById("lightbox"),lightImg=lightbox.querySelector("img");
document.querySelectorAll(".gallery img").forEach(img=>img.addEventListener("click",()=>{lightImg.src=img.dataset.full;lightbox.classList.add("show")}));
lightbox.addEventListener("click",e=>{if(e.target===lightbox||e.target.tagName==="BUTTON")lightbox.classList.remove("show")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")lightbox.classList.remove("show")});

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const msg=e.currentTarget.querySelector(".form-message");
  msg.textContent="Thanks! Your free-trial request has been received. (Demo form)";
  e.currentTarget.reset();
});
