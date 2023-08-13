let marker = document.querySelector('#indicator');
let nav = document.querySelector('nav');
let item = document.querySelector('nav a');

nav.onclick = function(){
    marker.classList.toggle('change')
}
