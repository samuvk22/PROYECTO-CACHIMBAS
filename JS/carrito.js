
class Carrito{


    comprarProducto(e){

        e.preventDefault();

        if(e.target.classList.contains("agregar-carrito")){
            if(localStorage.getItem("sesion") == undefined){
                window.location.href = "inicio.html";
              }else{
                const producto = e.target.parentElement.parentElement;
                this.leerDatosProducto(producto);

                
              }
        }
    }

    leerDatosProducto(producto){

      const infoProducto = {
        imagen : producto.querySelector("img").src,
        titulo : producto.querySelector("h5").textContent,
        precio : producto.querySelector("p").textContent,
        id : producto.querySelector("button").getAttribute("data-id"),
        cantidad : 1
      }

      let productosLS;

      productosLS = this.obtenerProductosLocalStorage();
      productosLS.forEach(function(productoLS){
        if(productoLS.id === infoProducto.id){
          productosLS = productoLS.id;
        }
      });

      if(productosLS === infoProducto.id){
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'El producto ya esta agregado',
          timer: 1000,
          showConfirmButton: false
        })
      }else{
        this.insertarCarrito(infoProducto);
      }
      
    }



    insertarCarrito(producto){


      const row = document.createElement("tr");

      
      row.innerHTML = '<td><img src="'+ producto.imagen+'" width="100"></td><td>'+ producto.titulo +'</td><td>'+ producto.precio +'</td><td><button  class="borrar-producto btn btn-sm btn-primary" data-id="'+ producto.id +'">X</button></td>';
      
      document.querySelector("#lista-carrito tbody").appendChild(row);
      
      this.guardarProductosLocalStorage(producto);
    }


    eliminarProducto(e){

      e.preventDefault();

      let producto, productoID;

      if(e.target.classList.contains("borrar-producto")){

        e.target.parentElement.parentElement.remove();

        producto = e.target.parentElement.parentElement;
        productoID = producto.querySelector("button").getAttribute("data-id");

      }

      this.eliminarProductoLocalStorage(productoID);
      this.calcularTotal();
    }


    vaciarCarrito(e){
      e.preventDefault();

      while(document.querySelector("#lista-carrito tbody").firstChild){
        document.querySelector("#lista-carrito tbody").removeChild(document.querySelector("#lista-carrito tbody").firstChild);

      }
      this.vaciarLocalStorage();
      return false
    }


    guardarProductosLocalStorage(producto){

      let productos;
      productos = this.obtenerProductosLocalStorage();
      productos.push(producto);
      localStorage.setItem('productos',JSON.stringify(productos));
    }

    obtenerProductosLocalStorage(){
      let productoLS;

      if(localStorage.getItem('productos') === null){
        productoLS = [];
      }else{
        productoLS = JSON.parse(localStorage.getItem('productos'));
      }

      return productoLS;
    }

    eliminarProductoLocalStorage(productoID){
      let productosLS = [];

      productosLS = this.obtenerProductosLocalStorage();

      productosLS.forEach(function(productoLS, index){

        if(productoLS.id === productoID){
          productosLS.splice(index);
        }
      })
      localStorage.setItem('productos',JSON.stringify(productosLS));

    }


    leerLocalStorage(){

      let productosLS;

      productosLS = this.obtenerProductosLocalStorage();

      productosLS.forEach(function(producto){
        const row = document.createElement("tr");

      
      row.innerHTML = '<td><img src="'+ producto.imagen+'" width="100"></td><td>'+ producto.titulo +'</td><td>'+ producto.precio +'</td><td><button  class="borrar-producto btn btn-sm btn-primary" data-id="'+ producto.id +'">X</button></td>';
      
      document.querySelector("#lista-carrito tbody").appendChild(row);
      });

    }

    leerLocalStorageCompra(){

      let productosLS;

      productosLS = this.obtenerProductosLocalStorage();

      productosLS.forEach(function(producto){
        const row = document.createElement("tr");

      
        row.innerHTML = '<td><img src="'+ producto.imagen+'" width="100"></td><td>'+ producto.titulo +'</td><td>'+ producto.precio +'</td><td><input type="number" class="form-control cantidad" min="1" value='+ producto.cantidad +'></td><td>'+ producto.precio +'</td><td><button  class="borrar-producto btn btn-sm btn-primary" data-id="'+ producto.id +'">X</button></td>';
      
      document.querySelector("#lista-compra tbody").appendChild(row);
      });

    }

    vaciarLocalStorage(){
      localStorage.removeItem("productos");
    }

    procesarPedido(e){

      e.preventDefault();
      if(this.obtenerProductosLocalStorage().length === 0){
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'El carrito esta vacio',
          timer: 2000,
          showConfirmButton : false
        })
      }else{
        location.href = "compra.html";
      }
      
    }

    calcularTotal(){
      let productoLS;
      let total = 0,subtotal = 0,igv = 0;
      productoLS = this.obtenerProductosLocalStorage();

      for(let i = 0; i < productoLS.length;i++){
        let element = Number( parseFloat(productoLS[i].precio.substr(8,4)) * productoLS[i].cantidad);
        total = total + element;
      }

      igv = (total*0.18);
      subtotal = (total-igv);

      document.getElementById("subtotal").innerHTML = "S/."+subtotal;
      document.getElementById("igv").innerHTML = "S/."+igv.toFixed(2);
      document.getElementById("total").innerHTML = "S/."+total.toFixed(2);
    }
}