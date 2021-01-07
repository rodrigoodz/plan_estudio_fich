//elements
const materias_cuatri = document.querySelectorAll(".materias_cuatri");

const cant_mat_restantes = document.querySelector(".mat_restantes");
const cant_mat_aprobadas = document.querySelector(".mat_aprobadas");
const cant_mat_regulares = document.querySelector(".mat_regulares");
const porc_avance = document.querySelector(".porc_avance");

const selector_carrera = document.getElementsByName("select_carreras")[0];

//variables
let regulares = [0];
let aprobadas = [0];
let materias = [];

//funciones
const getMaterias = (carrera) => {
  switch (carrera) {
    case "ii":
      materias = getPlanInformatica();
      break;
    case "iamb":
      materias = getPlanAmbiental();
      break;
    case "irh":
      materias = getPlanRecursosHidricos();
      break;
    case "iag":
      materias = getPlanAgrimensura();
      break;
  }
  setMaterias(materias);
};

const setMaterias = (materias) => {
  limpiarElementos();
  materias.forEach((materia, index) => {
    let li;
    switch (materia.cuatrimestre) {
      case 1:
        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${materia.nombre}`));
        li.id = `${materia.nro}`;
        materias_cuatri[0].appendChild(li);
        break;
      case 2:
        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${materia.nombre}`));
        li.id = `${materia.nro}`;
        materias_cuatri[1].appendChild(li);
        break;
      case 3:
        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${materia.nombre}`));
        li.id = `${materia.nro}`;
        materias_cuatri[2].appendChild(li);
        break;
      case 4:
        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${materia.nombre}`));
        li.id = `${materia.nro}`;
        materias_cuatri[3].appendChild(li);
        break;
      case 5:
        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${materia.nombre}`));
        li.id = `${materia.nro}`;
        materias_cuatri[4].appendChild(li);
        break;
      case 6:
        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${materia.nombre}`));
        li.id = `${materia.nro}`;
        materias_cuatri[5].appendChild(li);
        break;
      case 7:
        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${materia.nombre}`));
        li.id = `${materia.nro}`;
        materias_cuatri[6].appendChild(li);
        break;
      case 8:
        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${materia.nombre}`));
        li.id = `${materia.nro}`;
        materias_cuatri[7].appendChild(li);
        break;
      case 9:
        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${materia.nombre}`));
        li.id = `${materia.nro}`;
        materias_cuatri[8].appendChild(li);
        break;
      case 10:
        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${materia.nombre}`));
        li.id = `${materia.nro}`;
        materias_cuatri[9].appendChild(li);
        break;
    }
  });
};
const limpiarElementos = () => {
  for (let i = 0; i < 10; i++) {
    while (materias_cuatri[i].firstChild) {
      materias_cuatri[i].removeChild(materias_cuatri[i].lastChild);
    }
  }
};

const cambiarEstado = (id) => {
  const esta_regular = regulares.find((materia) => materia == id);
  const esta_aprobado = aprobadas.find((materia) => materia == id);
  if (esta_regular) {
    const existente = aprobadas.find((materia) => materia == id);
    if (!existente) {
      const elemento = document.getElementById(id);
      elemento.className = "aprobada";
      aprobadas.push(Number(elemento.id));
      actualizarInfo();
      actualizarMaterias();
    }
  } else if (!esta_regular) {
    const existente = regulares.find((materia) => materia == id);
    if (!existente) {
      const elemento = document.getElementById(id);
      elemento.className = "regularizada";
      regulares.push(Number(elemento.id));
      actualizarInfo();
      actualizarMaterias();
    }
  }
  if (esta_aprobado && esta_regular) {
    const elemento = document.getElementById(id);
    elemento.removeAttribute("class");
    aprobadas = aprobadas.filter((materia) => materia != id);
    regulares = regulares.filter((materia) => materia != id);
    actualizarInfo();
    actualizarMaterias();
  }
  //console.log("regulares ", regulares);
  //console.log("aprobadas ", aprobadas);
};

const actualizarInfo = () => {
  const cant_total = materias.length;
  const cant_regulares = regulares.length - 1;
  const cant_aprobadas = aprobadas.length - 1;

  cant_mat_regulares.innerText = cant_regulares - cant_aprobadas;
  cant_mat_aprobadas.innerText = cant_aprobadas;
  cant_mat_restantes.innerText = cant_total - cant_aprobadas;
  porc_avance.innerText = (
    ((aprobadas.length - 1) * 100) /
    materias.length
  ).toFixed(2);
};

const actualizarMaterias = () => {
  materias.forEach((materia) => {
    const contiene_regulares = materia.regularizadas_para_cursar.every((i) =>
      regulares.includes(i)
    );
    const contiene_aprobadas = materia.aprobadas_para_cursar.every((i) =>
      aprobadas.includes(i)
    );

    const ya_cursada = regulares.find((reg) => reg == materia.nro);

    if (contiene_regulares && contiene_aprobadas && !ya_cursada) {
      const elemento = document.getElementById(materia.nro);
      elemento.className = "puede_cursar";
    } else if (!ya_cursada) {
      const elemento = document.getElementById(materia.nro);
      elemento.removeAttribute("class");
    }
  });
};

//click
document.addEventListener("click", function (e) {
  // console.log(e);
  if (e.target.tagName === "LI" && e.target.className != "") {
    cambiarEstado(e.target.id);
  } else if (e.target.tagName === "LI" && e.target.className == "") {
    alert(
      "No podes cursar esta materia hasta no regularizar/aprobar las anteriores"
    );
  }
});

//onChange selector carrera
selector_carrera.addEventListener("change", (e) => {
  regulares = [0];
  aprobadas = [0];
  materias = [];
  getMaterias(e.target.value);
  actualizarInfo();
  actualizarMaterias();
});

//--------------------------------------------
getMaterias("ii");
actualizarInfo();
actualizarMaterias();
