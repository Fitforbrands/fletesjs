const listadoEmpresas = empresas;
const resultados = document.querySelector("#F4bResultados");
const zona = document.querySelector("#f4bzona");
const servicio = document.querySelector("#f4bservicio");
const calificacion = document.querySelector("#f4bcalificacion");

const datosBusqueda = {
  nombre: "",
  imagen: "",
  descripcion: "",
  calificacion: "",
  zona: "",
  servicio: "",
};

// listeners generales

document.addEventListener("DOMContentLoaded", () => {
  mostrarEmpresas(empresas);
});

zona.addEventListener("click", (e) => {
  datosBusqueda.zona = e.target.textContent;
  if (datosBusqueda.zona != "Todas las zonas") {
    filtrarEmpresas();
  } else {
    borraFiltroZona();
  }
});

servicio.addEventListener("click", (e) => {
  datosBusqueda.servicio = e.target.textContent;
  if (datosBusqueda.servicio != "Ver Todos") {
    filtrarEmpresas();
  } else {
    borraFiltroServicio();
  }
});

calificacion.addEventListener("click", (e) => {
  datosBusqueda.calificacion = e.target.textContent;
  if (datosBusqueda.calificacion != "Ver Todas") {
    filtrarEmpresas();
  } else {
    borraFiltroCalificacion();
  }
});

// FILTROS GENERALES

function filtrarEmpresas() {
  const resultadoZona = empresas
    .filter(filtraZona)
    .filter(filtraServicio)
    .filter(filtraCalificacion);
  console.log(`${resultadoZona.length} empresas encontradas con los criterios: 
  Zona: ${datosBusqueda.zona}
  Servicio: ${datosBusqueda.servicio}
  Calificacion: ${datosBusqueda.calificacion}
  `);
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

// BORRADO GENERALES

function borraFiltroZona() {
  datosBusqueda.zona = "";
  filtrarEmpresas();
}

function borraFiltroServicio() {
  datosBusqueda.servicio = "";
  filtrarEmpresas();
}

function borraFiltroCalificacion() {
  datosBusqueda.calificacion = "";
  filtrarEmpresas();
}

// presentacion de resultados

function mostrarEmpresas(empresas) {
  limpiarHTML();

  empresas.forEach((empresa) => {
    const { nombre, zona, servicio, calificacion, descripcion, imagen } =
      empresa;
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
            class="btn f4b-active f4b-boton-perfil"
            type="button"
            href="../paginas/empresa.html"
          >
            <i class="bi bi-fire"></i>VER EMPRESA
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
