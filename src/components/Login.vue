<template>
  <div class="login-container">
    <div class="login-caja">
      <h2>Iniciar Sesion</h2>
      <input v-model="username" type="text" placeholder="Usuario" />
      <input v-model="password" type="text" placeholder="Contraseña" />
      <button @click="login">Ingresar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      
      if (this.username === "admin" || this.username === "estudiante" && this.password === "123") {
        localStorage.setItem('usuario',this.username);
        localStorage.setItem('auth','true'); //bandera que me indique al sistema que se autentico
        //redireccionar a la Pagina de bienvenida
        this.$router.push('/home');
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f8;
  height: 100vh;
  width: 100vw;
}
.login-caja {
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}
</style>