
var jugadores = localStorage.getItem("jugadores");
jugadores = JSON.parse(jugadores);

if(jugadores == null) jugadores = [];
var tabla = "<table class='table center '>"

function table(){
    
     tabla += "<tr><th>Jugador</th><th>Tiempo</th><th>Puntaje</th></tr>";

    for( var i in jugadores){
        var jugador = JSON.parse(jugadores[i]);

        tabla+= "<tr><td>" + jugador.alias + "</td>";
        tabla+= "<td>" + jugador.tiempo + "</td>";
        tabla+= "<td>" + jugador.puntos + "</td>";
        tabla += "</tr>";
        
    }
    document.getElementById("tabla").innerHTML=tabla;
}


function guardarDatos(){
    var alias = localStorage.getItem("name");
    var puntos = localStorage.getItem("puntaje");
    var tiempo = localStorage.getItem("tiempo");
    var nom = document.getElementById("nombre");

    if (alias == nom){
        editar(jugadores[i])
    }else{

    var jugador = JSON.stringify({
        alias : alias,
        puntos : puntos,
        tiempo : tiempo
    });

        jugadores.push(jugador);
        localStorage.setItem("jugadores", JSON.stringify(jugadores));
 }
    table();

}

function editar(i){
    indice=i;
    var jugador = JSON.parse(jugadores[indice]);
    localStorage.getItem("name") = jugador.alias;
    localStorage.getItem("puntaje")= jugador.puntos;
    localStorage.getItem("tiempo")= jugador.tiempo;
}


window.onload = table;


