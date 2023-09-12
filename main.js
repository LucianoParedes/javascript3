class Producto {
  constructor(id, nombre, precio, descripcion, img, alt, cantidad = 1) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.img = img;
    this.alt = alt;
  }
  descripcionCarrito() {
    return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${this.img}" class="img-fluid rounded-start" alt="${this.alt}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${this.nombre}</h5>
                        <p class="card-text">Cantidad: ${this.cantidad}</p>
                        <p class="card-text">Precio: ${this.precio}</p>
                    </div>
                </div>
            </div>
        </div>`;
  }

  descripcionProducto() {
    return `
        <div class="card border-light" style="width: 18rem;">
            <img src="${this.img}" class="card-img-top" alt="${this.alt}">
            <div class="card-body">
                <h5 class="card-title">${this.nombre}</h5>
                <p class="card-text">${this.descripcion}</p>
                <p class="card-text">$${this.precio}</p>
                <button class="btn btn-primary" id="ap-${this.id}">Añadir al carrito</button>
            </div>
        </div>`;
  }
}

class ProductoController {
  constructor() {
    this.listaProductos = [];
  }

  agregar(producto) {
    if (producto instanceof Producto) {
      this.listaProductos.push(producto);
    }
  }

  cargarProductos() {
    this.agregar(
      new Producto(
        1,
        "shampoo",
        1200,
        "producto de limpieza para el cuerpo",
        "https://farmacityar.vteximg.com.br/arquivos/ids/241863-1000-1000/206042_Shampoo-Head-and-Shoulders-Humectacion-x-375-Ml-imagen-1.jpg?v=638188880124670000",
        "shampoo head&shoulders"
      )
    );
    this.agregar(
      new Producto(
        2,
        "jabon dove",
        430,
        "producto de limpieza para el cuerpo",
        "https://farmacityar.vteximg.com.br/arquivos/ids/238896-1000-1000/116090_jabon-dove-original-pastilla-individual-x-90-grs_imagen-1.jpg?v=638144979643730000",
        "jabon dove"
      )
    );
    this.agregar(
      new Producto(
        3,
        "esponja",
        850,
        "producto de limpieza para el cuerpo",
        "https://media.istockphoto.com/id/474926768/es/foto/esponja-amarilla-aislado-sobre-el-fondo-blanco-con-trazado-de-recorte.jpg?s=612x612&w=0&k=20&c=q6JHlSsA5i6xVpBxx55WPW8SBjVFkgXySTrlrDafHYY="
      )
    );
    this.agregar(
      new Producto(
        4,
        "peine",
        900,
        "producto de limpieza para el cuerpo",
        "https://esteticaenlinea.com.ar/cdn/shop/products/Sintitulo-1-2020-08-25T134359.871_cb283ccf-3ef5-4029-947e-a6f8ff4b6cca_700x700.png?v=1626187362"
      )
    );
    this.agregar(
      new Producto(
        5,
        "espuma de afeitar",
        1700,
        "producto de limpieza para el cuerpo",
        "https://farmacityar.vteximg.com.br/arquivos/ids/236536-1000-1000/2371_espuma-de-afeitar-piel-sensible-x-322-ml__imagen-1.jpg?v=638102739567470000"
      )
    );
    this.agregar(
      new Producto(
        6,
        "acondicionador",
        1000,
        "producto de limpieza para el cuerpo",
        "https://assets.unileversolutions.com/v1/93576210.jpg"
      )
    );
  }

  mostrarEnDOM() {
    let contenedorProductos = document.getElementById("contenedorProductos");

    this.listaProductos.forEach((producto) => {
      contenedorProductos.innerHTML += producto.descripcionProducto();
    });

    this.listaProductos.forEach((producto) => {
      const btn_ap = document.getElementById(`ap-${producto.id}`);

      btn_ap.addEventListener("click", () => {
        carrito.agregar(producto);
        carrito.guardarEnStorage();
        carrito.mostrarEnDOM();
      });
    });
  }
}

class Carrito {
  constructor() {
    this.listaCarrito = [];
  }

  agregar(producto) {
    if (producto instanceof Producto) {
      this.listaCarrito.push(producto);
    }
  }

  guardarEnStorage() {
    let listaCarritoJson = JSON.stringify(this.listaCarrito);
    localStorage.setItem("listaCarrito", listaCarritoJson);
  }

  recuperarStorage() {
    let listaCarritoJson = localStorage.getItem("listaCarrito");
    let listaCarritoJS = JSON.parse(listaCarritoJson);
    let listaAux = [];
    listaCarritoJS.forEach((producto) => {
      let nuevoProducto = new Producto(
        producto.id,
        producto.nombre,
        producto.precio,
        producto.descripcion,
        producto.img,
        producto.alt
      );
      listaAux.push(nuevoProducto);
    });
    this.listaCarrito = listaAux;
  }

  mostrarEnDOM() {
    let contenedorCarrito = document.getElementById("contenedorCarrito");
    contenedorCarrito.innerHTML = "";
    this.listaCarrito.forEach((producto) => {
      contenedorCarrito.innerHTML += producto.descripcionCarrito();
    });
  }
}

const CP = new ProductoController();
const carrito = new Carrito();
carrito.recuperarStorage();
carrito.mostrarEnDOM();

CP.cargarProductos();
CP.mostrarEnDOM();
