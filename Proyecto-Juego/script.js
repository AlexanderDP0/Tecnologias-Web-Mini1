var imgalt= "",aciertos=0,pantalla=1,puntaje=0,a,b,c,d,f,g;
var seg=0;
var arrastrando;
var cronometro;
let usedindx=[],usedpos=[];
var audio = new Audio("sounds/fondo.mp3");
var con = 0;
function init(){
 lvlstart();
 addlisteners();
}

function addlisteners(){
  var textos = document.getElementsByClassName('texto');
  var animales = document.getElementsByClassName('animal');

for(i=0;i<6;i++){
   
  var texto= textos[i];
  texto.addEventListener('dragstart',draginit,false);
  texto.addEventListener('dragend',dragend,false);

  var animal= animales[i];
  animal.addEventListener('dragover',dragover,false);
  animal.addEventListener('dragleave',dragleave,false);
  animal.addEventListener('drop',dropthebase,false);
}
}
function lvlstart(){
  var next= document.getElementById("siglvl");
  next.classList.add("hidden");

  var textos = document.getElementsByClassName('texto');
  var animales = document.getElementsByClassName('animal');
  var nombres = document.getElementsByClassName('nombre');
  var nombrestext= document.getElementsByClassName('nombretext');
  if(pantalla==1){
  for(i=0;i<6 ;i++){

   var j= getRan(0,7);

  while(usedindx.indexOf(j)>=0){

      j=getRan(0,7);

  }
    usedindx[i]=j;
  var x= getRan(0,6);

    while(usedpos.indexOf(x)>=0){
      x=getRan(0,6);

  }
    usedpos[i]=x;
 }
}else{
   a=usedindx[0];
   b=usedindx[1];
   c=usedindx[2];
   d=usedindx[3];
   f=usedindx[4];
   g=usedindx[5];
   for(i=0;i<6 ;i++){

   var j= getRanNoRep(0,8);

  while(usedindx.indexOf(j)>=0){

      j=getRanNoRep(0,7);

  }
    usedindx[i]=j;
  var x= getRan(0,6);

    while(usedpos.indexOf(x)>=0){
      x=getRan(0,6);

  }
    usedpos[i]=x;
 }
}
 for(i=0;i<6;i++){
  var texto= textos[i];
  texto.style.backgroundImage= "url(images/textos/"+(usedindx[i])+".png)";
  texto.setAttribute("id",usedindx[i]);
  texto.classList.remove("hidden");
  var animal= animales[usedpos[i]];
  animal.style.backgroundImage= "url(images/animales/"+(usedindx[i])+".png)";
  animal.setAttribute("id",usedindx[i]);
  var nombre= nombres[usedpos[i]];
  nombre.setAttribute("id","n"+usedindx[i]);
  var nombretext= nombrestext[usedpos[i]];
  nombretext.setAttribute("id","nt"+usedindx[i]);
 }
}

function getRan(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRanNoRep(min, max,a,b,c,d,f,g) {
  var res= Math.floor(Math.random() * (max - min)) + min;
  if(res==a || res==b || res==c){
    getRanNoRep(min,max,a,b,c,d,f,g);
  }else{
    return(res);
  }
}

function  nextlvl(){

      lvlstart();
}

function dropthebase(e){
  e.preventDefault();
  var datos= e.dataTransfer.getData('text');
  var aux= document.getElementById("puntosAcum");
  this.classList.remove("over");
  if(e.target.id==imgalt){
  arrastrando.classList.add("hidden");
  var audio = new Audio('sounds/'+e.target.id+'.mp3');
  var nom = document.getElementById("n"+e.target.id);
  var nomtext = document.getElementById("nt"+e.target.id);
  nomtext.innerHTML=getNombre(imgalt);
  nom.classList.add("nombre_visible");
  aciertos+=1;
  puntaje+=100;
  aux.innerHTML = puntaje;
  audio.play(audio);
  this.style.backgroundImage="url(images/good/"+e.target.id+".png)";
  if(aciertos==6){
      setTimeout(	function() { localStorage.setItem("tiempo",seg);
      clearInterval(cronometro);},0);
      setTimeout( function() { window.location.href = "congrat.html"; }, 6000 );
      var audio = new Audio('sounds/victory.mp3');
      audio.play();
      localStorage.setItem("puntaje",puntaje);
  }
 }else{
  var audio = new Audio('sounds/wrong.mp3');
  audio.play();
  if(puntaje<=0){
    puntaje=0;
  }else{
    puntaje-=100;
  }
  aux.innerHTML = puntaje;
 }
}

function dragover(e){
  e.preventDefault();
  this.classList.add("over");
  return false;
}

function dragleave(e){
  this.classList.remove("over");
}

function draginit(e){
  arrastrando= this;
  var padre= document.createElement("div");
  var clone= this.cloneNode(true);
  padre.appendChild(clone);
  e.dataTransfer.setData('text',padre.innerHTML);
  imgalt= e.target.id;
}

function dragend(e){
   this.classList.remove("over");
}

function getNombre(id){
  switch(id){
    case "0" :
      return "Tucan";
    break
      case "1" :
      return "Cebra";
    break
      case "2" :
      return "Elefante";
    break
      case "3" :
      return "Gorila";
    break
      case "4" :
      return "Guacamaya";
    break
      case "5" :
      return "Leon";
    break
      case "6" :
      return "Serpiente";
    break
      case "7" :
      return "Simio";
    break
    default: "";

  }
} 

function musica(){
  if(con == 1){
    audio.pause(audio)
    var h1= document.getElementById("musica");
    h1.innerHTML = "Musica";
    con = 0;
  }else{
    audio.play(audio);
    var h1= document.getElementById("musica");
    h1.innerHTML = "Detener Musica";
    con = 1;
  }
}
	function carga()
	{
		contador_s =0;
		s = document.getElementById("segundos");

		cronometro = setInterval(
			function(){
        seg = contador_s;
				s.innerHTML = contador_s;
				contador_s++;
			}
			,1000);
	}
    window.addEventListener("load",init,false);