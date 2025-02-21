import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '@/views/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Login', 
  },
  {
    path: "/Inicio",
    name: "Inicio",
    component: () => import("@/views/Inicio.vue"),
  },
  {
    path: '/', 
    component: Tabs, 
    children: [
      {
        path: '', 
        redirect: 'Inicio', 
      },
      {
        path: "/Inicio",
        name: "Inicio",
        component: () => import("@/views/Inicio.vue"),
      },
      {
        path: 'Busqueda', 
        name: 'Busqueda',
        component: () => import('@/views/Busqueda.vue'),
      },
      {
        path: 'Perfil', 
        name: 'Perfil',
        component: () => import('@/views/Perfil.vue'),
      },
      {
        path: 'CrearReserva', 
        name: 'CrearReserva',
        component: () => import('@/views/CrearReserva.vue'),
      },
      {
        path: 'Reservas', 
        name: 'Reservas',
        component: () => import('@/views/Reservas.vue'),
      },
      {
        path: 'details/:id',
        name: 'Details',
        component: () => import('@/views/Feed/Details.vue'),
        props: true
      },
    ],
  },
  {
    path: '/Login', 
    name: 'Login',
    component: () => import('@/views/Login.vue'), 
  },
  {
    path: '/Login/Sesion', 
    name: 'IniciaS',
    component: () => import('@/views/LoginLogica/IniciaS.vue'),
  },
  {
    path: '/Login/Contrasena', 
    name: 'OlvidarC',
    component: () => import('@/views/LoginLogica/OlvidarC.vue'),
  },
  {
    path: '/Login/Registro', 
    name: 'Registro',
    component: () => import('@/views/LoginLogica/Registro.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("Navigating to:", to.path);
  next();
});

export default router;