import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteView from '@/views/EstudianteView.vue'
import LoginView from '@/views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import NotasIngresoView from '@/views/NotasIngresoView.vue'
import RecursoProhibidoView from '@/views/RecursoProhibidoView.vue'

import {obtenerPaginasPermitidas} from '../helpers/Autorizacion'

function estaAutenticado() {
  let resul = localStorage.getItem('auth') === 'true';
  console.log(resul);
  return resul;
}

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiereAutenticacion: true,//protegiga
    }
  },
  {
    path: '/estudiante',
    name: 'estudianteView',
    component: EstudianteView,
    meta: {
      requiereAutenticacion: true,//protegiga
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requiereAutenticacion: true,//protegiga
    }
  },
  {
    path: '/notas',
    name: 'notas',
    component: NotasIngresoView,
    meta: {
      requiereAutenticacion: true,//protegiga
    }
  },
  {
    path: '/403',
    name: '403',
    component: RecursoProhibidoView,
    meta: {
      requiereAutenticacion: true,//protegiga
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//Guuardian
router.beforeEach((to, from, next) => {
  console.log('antes')
  // validando si la pagina esta autentica (requiereAutenticacion:true)// validando si la pagina esta autentica (requiereAutenticacion:true)
  if (to.meta.requiereAutenticacion) {
    console.log('Auth')
    //Si no esta autenticado
    if (!estaAutenticado()) {
      console.log('exito')
      next('/login')
    } else {
      //Autenticado
      //Aqui valido si esta autorizado
      let usuario = localStorage.getItem('usuario');
      let pagina = obtenerPaginasPermitidas(usuario);
      if(pagina.includes(to.path)){
        next();
      }else{
        next('/403');
      }
    }
  } else {
    next();
  }
})
export default router
