import './assets/base.css'
import Profile from './Pages/Profile.vue'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Main from './Pages/Main.vue'
import MoviePage from './Pages/MoviePage.vue'
import Login from './Pages/Login.vue'
import Registration from './Pages/Registration.vue'

const router = createRouter({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Main,
        },
        // {
        //     path: "/moviePage",
        //     name: "MoviePage",
        //     component: MoviePage,
        // },
        {
            path: "/movie/:id",
            name: "MoviePage",
            component: MoviePage,
            props: true
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
        },
        {
            path: "/registration",
            name: "Registration",
            component: Registration,
        }
    ],
    history: createWebHistory(),
})



const app = createApp(App)
app.use(router)
app.mount('#app')
