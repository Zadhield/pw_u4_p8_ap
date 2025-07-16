<template>
  <div>
    <button v-on:click="consultarPorId()">Consultar Estudiante por Id</button>
    <button v-on:click="consultarTodos()">Consultar Todos</button>
    <button v-on:click="guardar()">Guardar</button>
    <button v-on:click="actualizar()">Actualizar</button>
    <button v-on:click="ActualizarParcial()">ActualizarParcial</button>
    <button v-on:click="borrar()">Borrar</button>
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
      estudiantes: [],
    };
  },

  methods: {
    async guardar() {
      //private Integer id;
      // private String nombre;
      //private String apellido;
      //private LocalDate fechaNacimiento;
      //private String genero;
      let fecha = "2000-10-02";
      const estudianteToBody = {
        nombre: "Angelo",
        apellido: "Pujota",
        fechaNacimiento: "2000-10-02T00:00:00",
        genero: "M",
      };
      await guardarFachada(estudianteToBody);
      console.log("Estudiante guardado:", estudianteToBody);
    },

    async actualizar() {
      let fecha = "2000-07-02";
      const estudianteToBody = {
        nombre: "Fabricio",
        apellido: "Pujota",
        fechaNacimiento: "2000-07-02T00:00:00",
        genero: "M",
      };
      await actualizarFachada(estudianteToBody, 1);
      console.log("Estudiante actualizado (completo):", estudianteToBody);
    },

    async ActualizarParcial() {
      const estudianteToBody = {
        apellido: "Pineda",
      };
      await actualizarParcialFachada(estudianteToBody, 1);
      console.log("Estudiante actualizado parcialmente:", estudianteToBody);
    },

    async borrar() {
      await borrarPorIdFachada(1);
      console.log("Estudiante eliminado");
    },

    async consultarPorId() {
      const estudiante = await consultarEstudianteFachada(1);
      console.log("Estudiante consultado:", estudiante);
    },

    async consultarTodos() {
      this.estudiantes = await consultarTodosEstudiantesFachada();
      console.log("Lista de estudiantes:", this.estudiantes);
    },
  },
};
</script>

<style>
</style>