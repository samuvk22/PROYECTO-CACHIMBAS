
         
          window.addEventListener("load",iniciar);


          function iniciar(){

            function sesiones(){

              if(localStorage.getItem("sesion") != undefined){
                
                document.getElementById("sesion").innerHTML = "<img src='imagenes/iconR.png' height ='35' width='50'/>" + localStorage.getItem("sesion");
                
                document.getElementById("sesion").setAttribute("class","text-decoration-none text-white fs-5 mt-5");
              }
            }

            function cargarJson(){
              fetch('productos.json')
                .then (respuesta =>{return respuesta.json();})
                .then (resultado=>{cargarCartas(resultado);})
            }

            function cargarCartas(ob){
              var texto = '';
              ob.forEach(element => {
                if(element.tipo == "boquillas"){
                  texto += '<div class="col-12 col-md-6 col-lg-4 mt-5"><div class="card h-100 text-center"><img src="'+ element.imagen+'" class="card-img-top" height ="400" width="500" alt="..."><div class="card-body"><h5 class="card-tittle">'+ element.nom +'</h5><p class="card-text">Precio: '+ element.precio +'</p><button class="btn btn-dark agregar-carrito" type="button" data-id="'+ element.id +'" ><img src="imagenes/cesta recort-PhotoRoom.png" height ="35" width="35" />Añadir</button></div></div></div>';
                } 
                
              });

              document.getElementById("cartas").innerHTML += texto;
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
                
                var imagenes = Array();
                
                ob.forEach(element => {
                    if(element.tipo == "cabecera"){
                        imagenes.push(element);
                    }
                });
            
                for(var i = 0; i < imagenes.length;i++){
                    cabecera[i].setAttribute("src",imagenes[i].imagen);
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
                if(document.getElementById("cartas") != null){
                  document.getElementById("cartas").remove();
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

            sesiones();
            cargarJson();
            cargarImagenes();
            document.getElementById("buscar").addEventListener("click",cargarBusqueda);

          }

        