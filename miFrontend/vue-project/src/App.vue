<script setup>
import { ref, onMounted } from 'vue';

const employees = ref([]);

// Función para obtener los empleados desde el backend
async function getEmployees() {
  try {
    const response = await fetch('http://localhost:3002/employees/'); // Reemplaza '/ruta-del-backend' con la URL real del endpoint del backend donde obtienes los empleados
    const data = await response.json();
    employees.value = data.data;
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
  }
}

// Llama a la función para obtener los empleados cuando el componente se monte
onMounted(() => {
  getEmployees();
});
</script>

<template>
  <div class="text">
    <h1>Nuestro Staff</h1>
  </div>
  <div class="card-container">
    <!-- Iterar sobre la lista de empleados y mostrar su información -->
    <div v-for="employee in employees" :key="employee.id" class="card">
      <div class="card-content">
        <img class="card-image"
          src="https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg" />
        <h2 class="card-title">{{ employee.NomEmp }}</h2>
        <p class="card-description">{{ employee.PaiEmp }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.text {
  font-family: Proxima Nova;
  text-align: start;
  background-color: rgb(32, 147, 255);
  color: aliceblue;
}

.text h1{
  margin-left: 9%;
}

/* Estilos para el contenedor de las tarjetas (cards) */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 9%;
  padding-right: 9%;
}

/* Estilos para cada tarjeta (card) */
.card {
  width: auto;
  /* Ajustar el tamaño de las tarjetas para mostrar 4 en una fila */
  border: 1px solid #ccc;
  margin-bottom: 30px;
  padding: 1px;
  box-sizing: border-box;
  /* Incluir el padding en el ancho de la tarjeta */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
}

/* Estilos para la imagen */
.card-image {
  width: 100%;
  height: 300px;
  /* Ajustar la altura de la imagen */
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

/* Estilos para el título */
.card-title {
  font-family: Proxima Nova;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
}

/* Estilos para la descripción */
.card-description {
  font-family: Proxima Nova;
  font-size: 16px;
  margin-bottom: 10px;
  color: #555;
}
</style>


