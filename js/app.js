const carrito = document.querySelector("#carrito"),
    contenedorCarrito = document.querySelector("#lista-carrito tbody"),
    vaciarCarritoBtn = document.querySelector("#vaciar-carrito"),
    listaCurso = document.querySelector("#lista-cursos");

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {

    listaCurso.addEventListener("click", agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener("click",eliminarCurso);

    //vaciar carrito

    vaciarCarritoBtn.addEventListener("click",()=>{
        articulosCarrito=[];

        limpiarHTML();
    });
}



function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const cursoId=e.target.dataset.id;

        //eliminar del carrito por el id
        articulosCarrito=articulosCarrito.filter(curso=>curso.id!==cursoId);

        carritoHTML();
    }
}


function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        cantidad: 1,
        id: curso.querySelector("a").dataset.id
        //    id:curso.querySelector("a").getAttribute("data-id")
    }

    //revisa si un elemento ya existe en el carrito
       const existe=articulosCarrito.some(curso=>curso.id=== infoCurso.id);
       if(existe){
           //actualizamos la cantidad
           const cursos=articulosCarrito.map(curso=>{
                if(curso.id=== infoCurso.id){
                    curso.cantidad++;
                    return curso; //retorna el objeto actualizado
                }else{
                    return curso; //retorna los objetos que no son duplicados
                }
           });

           articulosCarrito=[...cursos];
       }else{
           //agregamos el producto al carrito
           articulosCarrito=[...articulosCarrito,infoCurso];
       }

    carritoHTML();

}

//muestra el carrito de compras en el HTML
function carritoHTML() {
    //limpiar el html
    limpiarHTML();

    //recorre el carrito
    articulosCarrito.forEach(curso => {
        const {
            imagen,
            titulo,
            precio,
            cantidad,
            id
        } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${imagen}" height="70px"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;

        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML="";

    //forma rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


