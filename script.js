let paginaActual = 0;
const paginas = document.querySelectorAll('.page');
const datos = {
  persona: {},
  familiares: [],
  condiciones: [],
  internamientos: []
};

function cambiarPagina(direccion) {
  paginas[paginaActual].classList.remove('active');
  paginaActual += direccion;
  if (paginaActual < 0) paginaActual = 0;
  if (paginaActual >= paginas.length) paginaActual = paginas.length - 1;
  paginas[paginaActual].classList.add('active');
  if (paginaActual === 4) mostrarResumen();
}

function agregarFamiliar() {
  const nombre = document.getElementById('fam_nombre').value;
  const parentesco = document.getElementById('fam_parentesco').value;
  const edad = document.getElementById('fam_edad').value;
  if (nombre && parentesco && edad) {
    datos.familiares.push({ nombre, parentesco, edad });
    document.getElementById('familiares').innerHTML += `${nombre}/${parentesco}/${edad}<br>`;
  }
}

function agregarCondicion() {
  const enfermedad = document.getElementById('cond_enfermedad').value;
  const tiempo = document.getElementById('cond_tiempo').value;
  if (enfermedad && tiempo) {
    datos.condiciones.push({ enfermedad, tiempo });
    document.getElementById('condiciones').innerHTML += `${enfermedad} (${tiempo})<br>`;
  }
}

function agregarInternamiento() {
  const fecha = document.getElementById('int_fecha').value;
  const centro = document.getElementById('int_centro').value;
  const diagnostico = document.getElementById('int_diagnostico').value;
  if (fecha && centro && diagnostico) {
    datos.internamientos.push({ fecha, centro, diagnostico });
    document.getElementById('internamientos').innerHTML += `${fecha} - ${centro} - ${diagnostico}<br>`;
  }
}

function grabarDatos() {
  datos.persona = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    edad: document.getElementById('edad').value
  };
  alert("Datos grabados en memoria temporal (JSON). Se descargará el archivo...");
  descargarJSON("datos_formulario.json", datos);
}

function mostrarResumen() {
  document.getElementById('resumen').textContent = JSON.stringify(datos, null, 2);
}

function descargarJSON(nombreArchivo, contenido) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(contenido, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', nombreArchivo);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
