<template>
  <div class="container">
    <div class="tab-header">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="
activeTab = tab;
          mensaje = '';
        "
      >
        {{ tab }}
      </button>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'Crear'">
        <h2>Crear Estudiante</h2>
        <form @submit.prevent="guardar">
          <input v-model="estudiante.nombre" placeholder="Nombre" required />
          <input
            v-model="estudiante.apellido"
            placeholder="Apellido"
            required
          />
          <input v-model="estudiante.fechaNacimiento" type="date" required />
          <select v-model="estudiante.genero" required>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          <button type="submit">Guardar</button>
        </form>
      </div>

      <div v-if="activeTab === 'Actualizar'">
        <h2>Actualizar Estudiante (PUT)</h2>
        <input
          v-model.number="idSeleccionado"
          type="number"
          min="1"
          placeholder="ID del estudiante"
        />

        <input v-model="estudiante.nombre" placeholder="Nombre" />
        <input v-model="estudiante.apellido" placeholder="Apellido" />
        <input v-model="estudiante.fechaNacimiento" type="date" />
        <select v-model="estudiante.genero">
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        <button @click="actualizar">Actualizar</button>
      </div>

      <div v-if="activeTab === 'Parcial'">
        <h2>Actualizar Parcialmente (PATCH)</h2>
        <input
          v-model.number="idSeleccionado"
          type="number"
          min="1"
          placeholder="ID del estudiante"
        />

        <input v-model="estudiante.nombre" placeholder="Nombre (opcional)" />
        <input
          v-model="estudiante.apellido"
          placeholder="Apellido (opcional)"
        />
        <input v-model="estudiante.fechaNacimiento" type="date" />
        <select v-model="estudiante.genero">
          <option value="">-- Seleccione --</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        <button @click="actualizarParcial">Actualizar Parcial</button>
      </div>

      <div v-if="activeTab === 'Eliminar'">
        <h2>Eliminar Estudiante</h2>
        <input
          v-model.number="idSeleccionado"
          type="number"
          min="1"
          placeholder="ID del estudiante"
        />
        <button @click="borrar">Eliminar</button>
      </div>

      <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script>
import { guardarFachada } from "../clients/EstudianteClient";
import { actualizarFachada } from "../clients/EstudianteClient";
import { actualizarParcialFachada } from "../clients/EstudianteClient";
import { borrarPorIdFachada } from "../clients/EstudianteClient";
import { consultarEstudianteFachada } from "../clients/EstudianteClient";
import { consultarTodosEstudiantesFachada } from "../clients/EstudianteClient";

export default {
  data() {
    return {
      tabs: ["Crear", "Actualizar", "Parcial", "Eliminar"],
      activeTab: "Crear",
      estudiante: {
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        genero: "M",
      },
      idSeleccionado: 1,
      mensaje: "",
    };
  },
  methods: {
    async guardar() {
      //private Integer id;
      // private String nombre;
      //private String apellido;
      //private LocalDate fechaNacimiento;
      //private String genero;
      const estudianteToBody = {
        nombre: this.estudiante.nombre || "Angelo",
        apellido: this.estudiante.apellido || "Pujota",
        fechaNacimiento:
          (this.estudiante.fechaNacimiento || "2000-10-02") + "T00:00:00",
        genero: this.estudiante.genero || "M",
      };
      await guardarFachada(estudianteToBody);
      console.log("Estudiante guardado:", estudianteToBody);
      this.mensaje = "Estudiante guardado correctamente.";
    },

    async actualizar() {
      // Ejemplo con valores fijos para mostrar estructura
      const estudianteToBody = {
        nombre: this.estudiante.nombre || "Fabricio",
        apellido: this.estudiante.apellido || "Pujota",
        fechaNacimiento:
          (this.estudiante.fechaNacimiento || "2000-07-02") + "T00:00:00",
        genero: this.estudiante.genero || "M",
      };
      const id = this.idSeleccionado || 1;
      await actualizarFachada(estudianteToBody, id);
      console.log("Estudiante actualizado (completo):", estudianteToBody);
      this.mensaje = "Estudiante actualizado completamente.";
    },

    async actualizarParcial() {
      // Sólo actualiza campos que tengan valor
      const estudianteToBody = {};
      if (this.estudiante.nombre)
        estudianteToBody.nombre = this.estudiante.nombre;
      if (this.estudiante.apellido)
        estudianteToBody.apellido = this.estudiante.apellido;
      if (this.estudiante.fechaNacimiento)
        estudianteToBody.fechaNacimiento =
          this.estudiante.fechaNacimiento + "T00:00:00";
      if (this.estudiante.genero)
        estudianteToBody.genero = this.estudiante.genero;

      const id = this.idSeleccionado || 1;

      await actualizarParcialFachada(estudianteToBody, id);
      console.log("Estudiante actualizado parcialmente:", estudianteToBody);
      this.mensaje = "Estudiante actualizado parcialmente.";
    },

    async borrar() {
      const id = this.idSeleccionado || 1;
      await borrarPorIdFachada(id);
      console.log("Estudiante eliminado");
      this.mensaje = "Estudiante eliminado.";
    },

    async consultarPorId() {
      const id = this.idSeleccionado || 1;
      const estudiante = await consultarEstudianteFachada(id);
      console.log("Estudiante consultado:", estudiante);
    },

    async consultarTodos() {
      this.estudiantes = await consultarTodosEstudiantesFachada();
      console.log("Lista de estudiantes:", this.estudiantes);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 700px;
  margin: auto;
}

.tab-header {
  display: flex;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.tab-header button {
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-weight: bold;
  transition: border-bottom 0.3s;
}

.tab-header button:hover {
  background-color: #f5f5f5;
}

.tab-header .active {
  border-bottom: 2px solid #007bff;
  color: #007bff;
}

.tab-content input,
.tab-content select,
.tab-content button {
  display: block;
  width: 100%;
  margin: 6px 0;
  padding: 8px;
  box-sizing: border-box;
}

.mensaje {
  margin-top: 15px;
  background-color: #e7f5ff;
  color: #007bff;
  padding: 10px;
  border-radius: 5px;
}
</style>
