

window.addEventListener("load",iniciar);


function cargarImagenes(){

    fetch('imagenes.json')
    .then (respuesta =>{ 
        return respuesta.json();
    })
    .then (resultado =>{ 
        mostrarHTML(resultado);
    })
  }

  function mostrarImagenes(ob){
   

    var cabecera = document.querySelectorAll("#nav");
    var carusel = document.querySelectorAll("#carusel");
    var imagenes = Array();
    var imagenesC = Array();
    ob.forEach(element => {
        if(element.tipo == "cabecera"){
            imagenes.push(element);
        }else{
            imagenesC.push(element);
        }  
    });

    for(var i = 0; i < imagenes.length;i++){
        cabecera[i].setAttribute("src",imagenes[i].imagen);
    }
    for(var j = 0;j < imagenesC.length;j++){
      carusel[j].setAttribute("src",imagenesC[j].imagen);
    }
  }
function iniciar(){

    cargar();


}
