//elements
const materias_cuatri = document.querySelectorAll(".materias_cuatri");

const cant_mat_restantes = document.querySelector(".mat_restantes");
const cant_mat_aprobadas = document.querySelector(".mat_aprobadas");
const cant_mat_regulares = document.querySelector(".mat_regulares");
const porc_avance = document.querySelector(".porc_avance");

const selector_carrera = document.getElementsByName("select_carreras")[0];

const titulo_header = document.querySelector(".carrera_header");

//variables
let regulares = [0];
let aprobadas = [0];
let materias = [];

//funciones
const getMaterias = (carrera) => {
  switch (carrera) {
    case "ii":
      titulo_header.textContent = "Ingeniería en Informática";
      materias = getPlanInformatica();
      break;
    case "iamb":
      titulo_header.textContent = "Ingeniería Ambiental";
      materias = getPlanAmbiental();
      break;
    case "irh":
      titulo_header.textContent = "Ingeniería en Recursos Hídricos";
      materias = getPlanRecursosHidricos();
      break;
    case "iag":
      titulo_header.textContent = "Ingeniería en Agrimensura";
      materias = getPlanAgrimensura();
      break;
  }
  setMaterias(materias);
};

const setMateriaItem = (materia, num) => {
  let li;
  li = document.createElement("li");
  li.appendChild(document.createTextNode(`${materia.nombre}`));
  li.id = `${materia.nro}`;
  materias_cuatri[num].appendChild(li);
};

const setMaterias = (materias) => {
  limpiarElementos();
  materias.forEach((materia, index) => {
    switch (materia.cuatrimestre) {
      case 1:
        setMateriaItem(materia, 0);
        break;
      case 2:
        setMateriaItem(materia, 1);
        break;
      case 3:
        setMateriaItem(materia, 2);
        break;
      case 4:
        setMateriaItem(materia, 3);
        break;
      case 5:
        setMateriaItem(materia, 4);
        break;
      case 6:
        setMateriaItem(materia, 5);
        break;
      case 7:
        setMateriaItem(materia, 6);
        break;
      case 8:
        setMateriaItem(materia, 7);
        break;
      case 9:
        setMateriaItem(materia, 8);
        break;
      case 10:
        setMateriaItem(materia, 9);
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
    // alert(
    //   "No podes cursar esta materia hasta no regularizar/aprobar las anteriores"
    // );
    Swal.fire({
      icon: "error",
      text:
        "No podes cursar esta materia hasta no regularizar/aprobar las anteriores",
    });
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
