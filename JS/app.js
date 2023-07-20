const listadoEmpresas = empresas;
const resultados = document.querySelector("#F4bResultados");
const zona = document.querySelector("#f4bzona");
const servicio = document.querySelector("#f4bservicio");
const calificacion = document.querySelector("#f4bcalificacion");
const favoritos = document.querySelector("#f4bfavoritos");
const titulo = document.querySelector("#f4btitulo");

let resultadoSuma = 0;

const datosBusqueda = {
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

resultados.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "A") {
    console.log(e.target.id);
    if (empresas[e.target.id].favorito === "no") {
      empresas[e.target.id].favorito = "f4b-boton-perfil-fav";
      e.target.classList.add("f4b-boton-perfil-fav");
      cuentaFavoritos();
    } else {
      empresas[e.target.id].favorito = "no";
      e.target.classList.remove("f4b-boton-perfil-fav");
      cuentaFavoritos();
    }
  }
});
// FILTROS GENERALES

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

// presentacion de resultados

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
    const empresaHTML = ` <div class="col">
    <div class="card">
      <img
        src="${imagen}"
        class="f4b-imagen-card"
        alt="Flete de Microcentro"
      />
      <div class="card-body">
        <h2 class="card-title f4b-nombre">${nombre}</h2>

        <p class="card-text">
          ${descripcion}
        </p>
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            Status
            <span class="badge rounded-pill f4b-destacado"
              >${calificacion}</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            Zona
            <span class="badge f4b-dest-zonas rounded-pill"
              >${zona}</span
            >
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            Servicio
            <span class="badge bg-primary rounded-pill">${servicio}</span>
          </li>
        </ul>
        <div class="d-grid gap-2">
          <a
            class="btn f4b-active f4b-boton-perfil" id="${id}"
            type="button"
            
          >
          MIS <i class="bi bi-suit-heart-fill ${favorito} f4b-nuevo-titulo-like"  ></i>
          </a>
          <a class="btn f4b-active f4b-wpp" type="button">
            <i class="bi bi-whatsapp"></i> WHATSAPP
          </a>
        </div>
      </div>
    </div>
  </div>
    `;

    resultados.innerHTML += empresaHTML;
  });
}

// Limpiar html

function limpiarHTML() {
  while (resultados.firstChild) {
    resultados.removeChild(resultados.firstChild);
  }
}

// backup presentacion

// function mostrarEmpresas(empresas) {
//     limpiarHTML();

//     empresas.forEach((empresa) => {
//       const { nombre, zona, servicio, calificacion } = empresa;
//       const empresaHTML = document.createElement("p");

//       empresaHTML.textContent = `
//       ${nombre}   -   ${zona}    -    ${servicio}   -    ${calificacion}

//       `;

//       resultados.appendChild(empresaHTML);
//     });
//   }
