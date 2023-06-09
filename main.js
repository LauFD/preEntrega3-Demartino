let carrito = [];

function obtenerCarrito() {
  return new Promise((resolve, reject) => {
    let carrito2 = JSON.parse(localStorage.getItem("carritocloud"));
    if (carrito2 === null) {
      resolve([]);
    } else {
      resolve(carrito2);
    }
  });
}

obtenerCarrito()
  .then((data) => {
    carrito = data;
    for (let producto of carrito) {
      document.getElementById("tablabody").innerHTML += `
        <tr>
          <td>${producto.nombre}</td>
          <td>${producto.precio}</td>
        </tr>
      `;
      let totalCarrito = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);
      document.getElementById("total").innerText = "Total a pagar: $" + totalCarrito;
    }
  })
  .catch((error) => {
    console.error(error);
  });

let contenedor = document.getElementById("misobras");

function creaProducards() {
  for (const producto of obras) {
    contenedor.innerHTML += `
      <div class="card col-sm-6 col-md-4" data-aos="flip-left">
        <img class="card-img-top" src="${producto.foto}" alt="Card image">
        <div class="card-body">
          <h4 class="card-title">${producto.nombre}</h4>
          <p class="card-text">${producto.descripcion}</p>
          <h5 class="card-text">$ ${producto.precio}</h5>
          <button id="btn${producto.id}" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#agregarModal" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Comprar</button>
        </div>
      </div>
    `;
  }
  obras.forEach((producto) => {
    document.getElementById(`btn${producto.id}`).addEventListener("click", function () {
      agregarAlCarrito(producto);
    });
  });
}

creaProducards();

function agregarAlCarrito(productoAComprar) {
  carrito.push(productoAComprar);
  let carritoJson = JSON.stringify(carrito);
  localStorage.setItem("carritocloud", carritoJson);
  document.getElementById("tablabody").innerHTML += `
    <tr>
      <td>${productoAComprar.nombre}</td>
      <td>${productoAComprar.precio}</td>
    </tr>
  `;
  let totalCarrito = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);
  document.getElementById("total").innerText = "Total a pagar: $" + totalCarrito;
}

let resetB = document.getElementById("resetB");
resetB.onclick = () => {
  carrito = [];
  localStorage.removeItem("carritocloud");
  document.getElementById("tablabody").innerHTML = "";
  document.getElementById("total").innerText = "Total a pagar: $0";
}

let confirmarCompra = document.getElementById("confirmarCompra");
confirmarCompra.onclick = () => {
  if (carrito.length > 0) {
    let confirmarBtn = document.getElementById("confirmarBtn");
    confirmarBtn.addEventListener("click", function () {
      let confirmarModal = new bootstrap.Modal(document.getElementById("confirmarModal"));
      confirmarModal.hide();

      carrito = [];
      localStorage.removeItem("carritocloud");
      document.getElementById("tablabody").innerHTML = "";
      document.getElementById("total").innerText = "Total a pagar: $0";
      location.reload();
    });
    let confirmarModal = new bootstrap.Modal(document.getElementById("confirmarModal"));
    confirmarModal.show();
  } else {
    let carritoVacioModal = new bootstrap.Modal(document.getElementById("carritoVacioModal"));
    carritoVacioModal.show();
  }
};

let modalObraAgregada = new bootstrap.Modal(document.getElementById("agregarModal"));
modalObraAgregada.addEventListener("show.bs.modal", function (event) {
  let button = event.relatedTarget;
  let obraNombre = button.getAttribute("data-nombre");
  document.getElementById("obraAgregada").innerText = `Se añadió al carrito: ${obraNombre}`;
});
