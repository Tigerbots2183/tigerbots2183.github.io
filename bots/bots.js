
var parallax = document.getElementById("all-contents"),
  speed = -0.07;

parallax.onscroll = function () {
    let elBackgrounPos = (parallax.scrollTop * speed) + "px";
    parallax.style.backgroundPositionY = elBackgrounPos;
};

let portrait = (window.innerWidth / window.innerHeight) < 1;
if(portrait){
    document.querySelector("#nav-ul").remove()
  document.querySelector(".hamburger").style.display = "block"
}else{
    document.querySelector(".hamburger").remove()
    document.querySelector("#nav-ul").style.display = "flex"

}