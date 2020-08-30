//elements
let materias_cuatri_1 = document.querySelector(".materias_cuatri_1");
let materias_cuatri_2 = document.querySelector(".materias_cuatri_2");
let materias_cuatri_3 = document.querySelector(".materias_cuatri_3");
let materias_cuatri_4 = document.querySelector(".materias_cuatri_4");
let materias_cuatri_5 = document.querySelector(".materias_cuatri_5");
let materias_cuatri_6 = document.querySelector(".materias_cuatri_6");
let materias_cuatri_7 = document.querySelector(".materias_cuatri_7");
let materias_cuatri_8 = document.querySelector(".materias_cuatri_8");
let materias_cuatri_9 = document.querySelector(".materias_cuatri_9");
let materias_cuatri_10 = document.querySelector(".materias_cuatri_10");

let cant_mat_restantes = document.querySelector(".mat_restantes");
let cant_mat_aprobadas = document.querySelector(".mat_aprobadas");
let cant_mat_regulares = document.querySelector(".mat_regulares");
let porc_avance = document.querySelector(".porc_avance");

//variables
let regulares = [0];
let aprobadas = [0];
let materias = [];

//funciones
const getMaterias = () => {
  materias = getPlanInformatica();
  // console.log(materias);
  setMaterias(materias);
};

const setMaterias = (materias) => {
  materias.forEach((materia, index) => {
    // if (materia.cuatrimestre === 1) {
    //   const li = document.createElement("li");
    //   li.appendChild(document.createTextNode(`${materia.nombre}`));
    //   materias_cuatri_1.appendChild(li);
    // }
    let li;
    switch (materia.cuatrimestre) {
      case 1:
        li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${materia.nro} - ${materia.nombre}`)
        );
        li.id = `${materia.nro}`;
        materias_cuatri_1.appendChild(li);
        break;
      case 2:
        li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${materia.nro} - ${materia.nombre}`)
        );
        li.id = `${materia.nro}`;
        materias_cuatri_2.appendChild(li);
        break;
      case 3:
        li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${materia.nro} - ${materia.nombre}`)
        );
        li.id = `${materia.nro}`;
        materias_cuatri_3.appendChild(li);
        break;
      case 4:
        li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${materia.nro} - ${materia.nombre}`)
        );
        li.id = `${materia.nro}`;
        materias_cuatri_4.appendChild(li);
        break;
      case 5:
        li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${materia.nro} - ${materia.nombre}`)
        );
        li.id = `${materia.nro}`;
        materias_cuatri_5.appendChild(li);
        break;
      case 6:
        li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${materia.nro} - ${materia.nombre}`)
        );
        li.id = `${materia.nro}`;
        materias_cuatri_6.appendChild(li);
        break;
      case 7:
        li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${materia.nro} - ${materia.nombre}`)
        );
        li.id = `${materia.nro}`;
        materias_cuatri_7.appendChild(li);
        break;
      case 8:
        li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${materia.nro} - ${materia.nombre}`)
        );
        li.id = `${materia.nro}`;
        materias_cuatri_8.appendChild(li);
        break;
      case 9:
        li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${materia.nro} - ${materia.nombre}`)
        );
        li.id = `${materia.nro}`;
        materias_cuatri_9.appendChild(li);
        break;
      case 10:
        li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${materia.nro} - ${materia.nombre}`)
        );
        li.id = `${materia.nro}`;
        materias_cuatri_10.appendChild(li);
        break;
    }
  });
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
    elemento.className = "";
    aprobadas = aprobadas.filter((materia) => materia != id);
    regulares = regulares.filter((materia) => materia != id);
    actualizarInfo();
    actualizarMaterias();
  }
  console.log("regulares ", regulares);
  console.log("aprobadas ", aprobadas);
};

const actualizarInfo = () => {
  //actualizar info
  cant_mat_regulares.innerText = regulares.length - 1;
  cant_mat_aprobadas.innerText = aprobadas.length - 1;
  cant_mat_restantes.innerText = materias.length - aprobadas.length - 1;
  porc_avance.innerText = (
    ((aprobadas.length - 1) * 100) /
    materias.length
  ).toFixed(2);
};

const actualizarMaterias = () => {
  materias.forEach((materia) => {
    console.log("regulares: ", regulares);
    console.log("pa cursar", aprobadas);
    const contiene_regulares = materia.regularizadas_para_cursar.every((i) =>
      regulares.includes(i)
    );
    const contiene_aprobadas = materia.aprobadas_para_cursar.every((i) =>
      aprobadas.includes(i)
    );
    console.log(materia.nombre, contiene_regulares);
    console.log(materia.nombre, contiene_aprobadas);

    const ya_cursada = regulares.find((reg) => reg == materia.nro);
    console.log(ya_cursada);
    if (contiene_regulares && contiene_aprobadas && !ya_cursada) {
      const elemento = document.getElementById(materia.nro);
      elemento.className = "puede_cursar";
    }
  });
};

//click
document.addEventListener("click", function (e) {
  // console.log(e.target.tagName);
  if (e.target.tagName === "LI") {
    cambiarEstado(e.target.id);
  }
});

//--------------------------------------------
getMaterias();
actualizarInfo();
actualizarMaterias();
