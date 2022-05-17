function cerrarSesion(){
    localStorage.removeItem("sesion");
    location.href = "inicio.html";
  }
  window.addEventListener("load",iniciar);
  function sesiones(){

    if(localStorage.getItem("sesion") != undefined){
      
      document.getElementById("sesion").innerHTML = "<img src='imagenes/iconR.png' height ='35' width='50'/>" + localStorage.getItem("sesion");
      
      document.getElementById("sesion").setAttribute("class","text-decoration-none text-white fs-5 mt-5");
    }
  }
  function cargarImagenes(){

    fetch('imagenes.json')
    .then (respuesta =>{ 
        return respuesta.json();
    })
    .then (resultado =>{ 
        mostrarImagenes(resultado);
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
  function cargar(){

    fetch('productos.json')
    .then (respuesta =>{ 
        return respuesta.json();
    })
    .then (resultado =>{ 
        mostrarHTML(resultado);
    })
  }

  function mostrarHTML(ob){
    var novedades = document.querySelectorAll("#novedad");
    var recomendados = document.querySelectorAll("#recomendado");
    var paraIntroducirNovedad = Array();
    var paraIntroducirRecomendado = Array();
    var introducido = false;
    for(var i = ob.length-1; i > ob.length-10; i--){
      if(paraIntroducirNovedad.length == 0 ){
        paraIntroducirNovedad.push(ob[i]);
      }else{
        var igual = false;
        for(var j = 0; j < paraIntroducirNovedad.length ;j++){
          if(paraIntroducirNovedad[j].imagen != ob[i].imagen){
            igual = true;
            break;
          }
        }
      }

      if(igual == true){
        paraIntroducirNovedad.push(ob[i]);
      }
    }

    for(var f = 0; f < ob.length; f++){
      if(ob[f].recomendado == "si"){
        paraIntroducirRecomendado.push(ob[f]);
      }
    }
    
    for(var a = 0; a < novedades.length;a++){
      novedades[a].getElementsByTagName("img")[0].setAttribute("src",paraIntroducirNovedad[a].imagen);
      novedades[a].getElementsByTagName("h5")[0].innerHTML = paraIntroducirNovedad[a].nom;
      novedades[a].getElementsByTagName("p")[0].innerHTML = "Precio: "+ paraIntroducirNovedad[a].precio;
      novedades[a].getElementsByTagName("button")[0].setAttribute("data-id",paraIntroducirNovedad[a].id);
    }

    for(var b = 0; b <recomendados.length;b++){
      recomendados[b].getElementsByTagName("img")[0].setAttribute("src",paraIntroducirRecomendado[b].imagen);
      recomendados[b].getElementsByTagName("h5")[0].innerHTML = paraIntroducirRecomendado[b].nom;
      recomendados[b].getElementsByTagName("p")[0].innerHTML = "Precio: "+ paraIntroducirRecomendado[b].precio;
      recomendados[b].getElementsByTagName("button")[0].setAttribute("data-id",paraIntroducirRecomendado[b].id);
    }
    

  }
  function cargarBusqueda(){
    fetch('productos.json')
    .then (respuesta =>{ 
        return respuesta.json();
    })
    .then (resultado =>{ 
        cargarCartasBuscadas(resultado);
    })
  }


  function cargarCartasBuscadas(ob){

    var valor = document.getElementById("textoBusca").value.toLocaleLowerCase();
    if(document.getElementById("carouselExampleIndicators") != null){
      document.getElementById("carouselExampleIndicators").remove();
    }
    if(document.getElementById("apartadoNov") != null){
      document.getElementById("apartadoNov").remove();
    }
    if(document.getElementById("apartadoRecom") != null){
      document.getElementById("apartadoRecom").remove();
    }
    
    var texto = '';
    if(valor != ''){
      texto = '<div class="row" id="cartas"><div class="col-12 text-center mt-4 mb-0"><h1>Resultados de la búsqueda</h1></div>';
    ob.forEach(element => {
      
      if(element.nom.toLocaleLowerCase().indexOf(valor) != -1){
        texto += '<div class="col-12 col-md-6 col-lg-4 mt-5"><div class="card h-100 text-center"><img src="'+ element.imagen+'" class="card-img-top" height ="400" width="500" alt="..."><div class="card-body"><h5 class="card-tittle">'+ element.nom +'</h5><p class="card-text">Precio: '+ element.precio +'</p><button class="btn btn-dark agregar-carrito" type="button" data-id="'+ element.id +'" ><img src="imagenes/cesta recort-PhotoRoom.png" height ="35" width="35" />Añadir</button></div></div></div>';
      }
    });

    texto += "</div>";
    document.getElementById("cuerpo").innerHTML = texto; 
    }
    
    if(texto == ''){
      document.getElementById("cuerpo").innerHTML = '<div class="row" id="cartas"><div class="col-12 text-center mt-4 mb-0"><h1>Resultados de la búsqueda</h1></div><div class="col-12 text-center mt-4 mb-0"><div class="alert alert-warning" role="alert">No se han encontrado productos</div></div>';
    }
    if(texto == '<div class="row" id="cartas"><div class="col-12 text-center mt-4 mb-0"><h1>Resultados de la búsqueda</h1></div></div>'){
      document.getElementById("cuerpo").innerHTML = '<div class="row" id="cartas"><div class="col-12 text-center mt-4 mb-0"><h1>Resultados de la búsqueda</h1></div><div class="col-12 text-center mt-4 mb-0"><div class="alert alert-warning" role="alert">No se han encontrado productos</div></div>';
    }
    
  }
  function ejecutarSpeechAPI() {
    //crear el objeto Speech Recognition
        const SpeechRecognition =  webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
    
    // comienza el reconocimiento
        recognition.start();
    
    // Detecta cuando empieza a hablar(start) y muestra Escuchando...
        recognition.onstart = function() {
           
        };
    // Detecta cuando deja de hablar (speechend) y para el reconocimiento(stop())  
        recognition.onspeechend = function() {
            
            recognition.stop();
        };
      
    //Se ejecuta cuando obtiene los resultados del reconocimiento
        recognition.onresult = function(e) {
            console.log(e.results);
            var transcript = e.results[0][0].transcript;
            var confidence = e.results[0][0].confidence;
            var fiabilidad = parseInt(confidence*100);
    
            if(fiabilidad > 50){
                document.getElementById("textoBusca").value = transcript;
            }
        };
    }

    function avisoCookies(){

      document.getElementById("aviso").remove();
      document.cookie = "aviso=acept";
    }
    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  function iniciar(){
     

    sesiones();
    cargarImagenes();
    cargar();

    if(getCookie("aviso=acept") != ""){

      document.getElementById("aviso").remove();

    }
    document.getElementById("buscar").addEventListener("click",cargarBusqueda);
    document.getElementById("micro").addEventListener('click', ejecutarSpeechAPI);
    document.getElementById("sesion").addEventListener("click",cerrarSesion);
    document.getElementById("cookies").addEventListener("click",avisoCookies);

  }