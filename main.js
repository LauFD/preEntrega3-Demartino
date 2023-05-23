let carrito = [];

let carrito2 = JSON.parse(localStorage.getItem("carritocloud"));

if(carrito2 === null){

}else{
    carrito = carrito2;
    for(let producto of carrito){
        document.getElementById("tablabody").innerHTML += `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
            </tr>
        `;
        let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.precio,0);
        document.getElementById("total").innerText = "Total a pagar : $"+totalCarrito;
    }
}

let contenedor = document.getElementById("misobras");

function creaProducards(){
    for(const producto of obras){
        contenedor.innerHTML += `
            <div class="card col-sm-6 col-md-4" data-aos="flip-left">
                <img class="card-img-top" src="${producto.foto}" alt="Card image">
                <div class="card-body">
                    <h4 class="card-title">${producto.nombre}</h4>
                    <p class="card-text">${producto.descripcion}</p>
                    <h5 class="card-text">$ ${producto.precio}</h5>
                    <button id="btn${producto.id}" class="btn btn-primary">Comprar</a>
                </div>
            </div>
        `;
    }
    obras.forEach((producto)=>{
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    });
}

creaProducards();

function agregarAlCarrito(productoAComprar){
    carrito.push(productoAComprar);
    let carritoJson = JSON.stringify(carrito);
    localStorage.setItem("carritocloud", carritoJson);
    alert("Entrada para "+productoAComprar.nombre+" agregada al carrito.");
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${productoAComprar.nombre}</td>
            <td>${productoAComprar.precio}</td>
        </tr>
    `;
    let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.precio,0);
    document.getElementById("total").innerText = "Total a pagar: $"+totalCarrito;
}


let resetB = document.getElementById("resetB");
resetB.onclick = () => {
    carrito=[];
    localStorage.clear();
    document.location.reload();
}
