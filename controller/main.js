// Mostrar formulario para agregar empleado
function crearEmpleado() {
  document.getElementById('divAgregarEmpleado').style.display = 'block';
}

function agregarEmpleado() {
  alert("Entró a agregar empleado");

  document.addEventListener("DOMContentLoaded", mostrarEmpleados);

  document.getElementById('formEmpleado').addEventListener('submit', function (e) {
    e.preventDefault();

    const sueldoBase = parseFloat(document.getElementById('sueldoBase').value);
    const tipoBonificacion = document.getElementById('tipoBonificacion').value;

    const totalSueldo = calcularTotalSueldo(sueldoBase, tipoBonificacion);

    const empleado = new Empleado(
      document.getElementById('cc').value,
      document.getElementById('nombresyApellidos').value,
      document.getElementById('direccion').value,
      document.getElementById('email').value,
      document.getElementById('telefono').value,
      sueldoBase,
      document.getElementById('tipoEmpleado').value,
      tipoBonificacion,
      totalSueldo // nuevo campo
    );

    let empleados = JSON.parse(localStorage.getItem('empleados')) || [];

    empleados.push(empleado);

    localStorage.setItem('empleados', JSON.stringify(empleados));

    mostrarEmpleados();

    e.target.reset();
  });

  function mostrarEmpleados() {
    const tbody = document.querySelector('#tablaEmpleados tbody');
    tbody.innerHTML = '';

    const empleados = JSON.parse(localStorage.getItem('empleados')) || [];

    empleados.forEach((emp, index) => {
      const fila = `<tr>
        <td>${index + 1}</td>
        <td>${emp.cc}</td>
        <td>${emp.nombresyApellidos}</td>
        <td>${emp.direccion}</td>
        <td>${emp.email}</td>
        <td>${emp.telefono}</td>
        <td>${emp.sueldoBase}</td>
        <td>${emp.tipoEmpleado}</td>
        <td>${emp.tipoBonificacion}</td>
        <td>${emp.totalSueldo || calcularTotalSueldo(emp.sueldoBase, emp.tipoBonificacion)}</td>
      </tr>`;
      tbody.innerHTML += fila;
    });
  }
}

function calcularTotalSueldo(sueldoBase, tipoBonificacion) {
  let bonificacion = 0;

  switch (tipoBonificacion.toUpperCase()) {
    case 'A':
      bonificacion = 200000;
      break;
    case 'B':
      bonificacion = 180000;
      break;
    case 'C':
      bonificacion = 100000;
      break;
    case 'D':
      bonificacion = 50000;
      break;
    default:
      bonificacion = 0;
  }

  return sueldoBase + bonificacion;
}
