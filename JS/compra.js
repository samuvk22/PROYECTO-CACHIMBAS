window.addEventListener("load",iniciar);



function iniciar(){

        const compra = new Carrito();
        const listaCompra = document.querySelector("#lista-compra tbody");
        const carrito = document.getElementById("carrito");
        const procesarCompraBtn = document.getElementById("procesar-compra");
        cargarEventos();

        function cargarEventos(){
            document.addEventListener("DOMContentLoaded", compra.leerLocalStorageCompra());

            carrito.addEventListener("click",(e) => {compra.eliminarProducto(e)});

            

            compra.calcularTotal();

            procesarCompraBtn.addEventListener("click",procesarCompra);
        }

        function procesarCompra(e){
            e.preventDefault();
            if(compra.obtenerProductosLocalStorage().length === 0){
                alert("El carrito esta vacio");
                window.location = "WEBCACHIMBAS.html";
            }
        }
}
