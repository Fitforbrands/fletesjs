const resultados = document.querySelector("#F4bResultados"); // se utiloiza para los botones de agregar a favoritos
const zona = document.querySelector("#f4bzona"); // menu Zona del header
const servicio = document.querySelector("#f4bservicio"); // menu servicio del header
const calificacion = document.querySelector("#f4bcalificacion"); // menu calificacion del header
const favoritos = document.querySelector("#f4bfavoritos"); // boton favoritos del header
const titulo = document.querySelector("#f4btitulo"); // cambia el h1 de cada busqueda.

let resultadoSuma = 0;

// Se creo este objeto auxiliar para crear el listado de busquedas
const datosBusqueda = {
  id: "",
  nombre: "",
  imagen: "",
  descripcion: "",
  calificacion: "",
  favorito: "",
  zona: "",
  servicio: "",
};

// listeners generales

document.addEventListener("DOMContentLoaded", () => {
  cargaFavoritos();
  cuentaFavoritos();
  mostrarEmpresas(empresas);
});

zona.addEventListener("click", (e) => {
  datosBusqueda.zona = e.target.textContent;
  titulo.innerHTML = e.target.textContent.toUpperCase();
  if (datosBusqueda.zona != "Todas las zonas") {
    filtrarEmpresasZona();
  } else {
    borraFiltroZona();
  }
});

servicio.addEventListener("click", (e) => {
  datosBusqueda.servicio = e.target.textContent;
  titulo.innerHTML = e.target.textContent.toUpperCase();
  if (datosBusqueda.servicio != "Ver Todos") {
    filtrarEmpresasServ();
  } else {
    borraFiltroServicio();
  }
});

calificacion.addEventListener("click", (e) => {
  datosBusqueda.calificacion = e.target.textContent;
  titulo.innerHTML = e.target.textContent.toUpperCase();
  if (datosBusqueda.calificacion != "Ver Todas") {
    filtrarEmpresasCal();
  } else {
    borraFiltroCalificacion();
  }
});

favoritos.addEventListener("click", (e) => {
  datosBusqueda.favorito = "f4b-boton-perfil-fav";
  titulo.innerHTML = "TUS 🤍🤍🤍";
  if (datosBusqueda.favorito != "Ver Todos") {
    console.log("filtrafavoritos");
    filtrarEmpresasFav();
  } else {
    borraFiltroFavorito();
  }
});

// Agrega y saca de favoritos

resultados.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "A") {
    console.log(e.target.id);
    if (empresas[e.target.id].favorito === "no") {
      empresas[e.target.id].favorito = "f4b-boton-perfil-fav";
      e.target.classList.add("f4b-boton-perfil-fav");
      guardaFavoritos();
      Toastify({
        text: "Agregado a favoritos",
        gravity: "bottom",
        position: "center",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        offset: {
          y: 300,
        },
      }).showToast();
      cuentaFavoritos();
    } else {
      empresas[e.target.id].favorito = "no";
      e.target.classList.remove("f4b-boton-perfil-fav");
      guardaFavoritos();
      Toastify({
        text: "Retirado de favoritos",
        gravity: "bottom",
        position: "center",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, palevioletred, red)",
        },
        offset: {
          y: 300,
        },
      }).showToast();
      cuentaFavoritos();
    }
  }
});

// Actualiza favoritos desde LocalStorage

function cargaFavoritos() {
  let favo = JSON.parse(localStorage.getItem("favoritos"));
  empresas = favo;
}

function guardaFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(empresas));
}

// FILTROS GENERALES OPCION FILTROS SUMADOS

// function filtrarEmpresas() {
//   const resultadoZona = empresas
//     .filter(filtraZona)
//     .filter(filtraServicio)
//     .filter(filtraCalificacion);
//   console.log(`${resultadoZona.length} empresas encontradas con los criterios:
//   Zona: ${datosBusqueda.zona}
//   Servicio: ${datosBusqueda.servicio}
//   Calificacion: ${datosBusqueda.calificacion}
//   `);
//   mostrarEmpresas(resultadoZona);
// }

// Funciones para filtros

function filtrarEmpresasFav() {
  const resultadoZona = empresas.filter(filtrafavoritos);

  mostrarEmpresas(resultadoZona);
}

function filtrarEmpresasZona() {
  const resultadoZona = empresas.filter(filtraZona);

  mostrarEmpresas(resultadoZona);
}

function filtrarEmpresasServ() {
  const resultadoZona = empresas.filter(filtraServicio);

  mostrarEmpresas(resultadoZona);
}

function filtrarEmpresasCal() {
  const resultadoZona = empresas.filter(filtraCalificacion);

  mostrarEmpresas(resultadoZona);
}

function filtraZona(empresa) {
  if (datosBusqueda.zona) {
    const menuZona = document.getElementById("f4bzona"); // resaltar item de dropdown
    menuZona.children[1].classList.add("f4b-navitem-estoyaca"); // resaltar item de dropdown
    return empresa.zona === datosBusqueda.zona;
  } else {
    return empresa;
  }
}

function filtraServicio(empresa) {
  if (datosBusqueda.servicio) {
    return empresa.servicio === datosBusqueda.servicio;
  } else {
    return empresa;
  }
}

function filtraCalificacion(empresa) {
  if (datosBusqueda.calificacion) {
    return empresa.calificacion === datosBusqueda.calificacion;
  } else {
    return empresa;
  }
}

function filtrafavoritos(empresa) {
  if (datosBusqueda.favorito) {
    return empresa.favorito === datosBusqueda.favorito;
  } else {
    return empresa;
  }
}

function cuentaFavoritos() {
  for (i = 0; i < empresas.length; i++) {
    if (empresas[i].favorito === "f4b-boton-perfil-fav") {
      resultadoSuma = resultadoSuma + 1;
    }
  }
  console.log(resultadoSuma);
  favoritos.innerHTML = `${resultadoSuma} 🖤`;
  resultadoSuma = 0;
}

// BORRADO GENERALES

function borraFiltroZona() {
  datosBusqueda.zona = "";
  filtrarEmpresasZona();
}

function borraFiltroServicio() {
  datosBusqueda.servicio = "";
  filtrarEmpresasServ();
}

function borraFiltroCalificacion() {
  datosBusqueda.calificacion = "";
  filtrarEmpresasCal();
}

// Limpiar html

function limpiarHTML() {
  while (resultados.firstChild) {
    resultados.removeChild(resultados.firstChild);
  }
}

// presentacion de resultados y generacion de HTML de cada card

function mostrarEmpresas(empresas) {
  limpiarHTML();

  empresas.forEach((empresa) => {
    const {
      id,
      nombre,
      zona,
      servicio,
      favorito,
      calificacion,
      descripcion,
      imagen,
    } = empresa;
    const empresaHTML = ` 
      <div class="col">
        <div class="card">
          <img src="${imagen}" class="f4b-imagen-card" alt="Flete de ${zona}"/>
          <div class="card-body">
            <h2 class="card-title f4b-nombre">${nombre}</h2>
            <p class="card-text">${descripcion}</p>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Status
                <span class="badge rounded-pill f4b-destacado">${calificacion}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Zona
                <span class="badge f4b-dest-zonas rounded-pill">${zona}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Servicio
                <span class="badge bg-primary rounded-pill">${servicio}</span>
              </li>
            </ul>
            <div class="d-grid gap-2">
              <a class="btn f4b-active f4b-boton-perfil ${favorito}" id="${id}" type="button">
                MIS 
                <i class="bi bi-suit-heart-fill f4b-nuevo-titulo-like"></i>
              </a>
              <a class="btn f4b-active f4b-wpp" type="button">
                <i class="bi bi-whatsapp"></i> 
                WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </div>`;

    resultados.innerHTML += empresaHTML;
  });
}
