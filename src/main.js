import './assets/base.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Main from './Pages/Main.vue'
import MoviePage from './Pages/MoviePage.vue'
import Login from './Pages/Login.vue'
import Registration from './Pages/Registration.vue'
import PersonPage from './Pages/PersonPage.vue'
import Movies from './Pages/Movies.vue'
import store from './store'
import Profile from './Pages/Profile.vue'
import Premiere from './Pages/Premiere.vue'
import Posts from './Pages/Posts.vue'
import Lists from './Pages/Lists.vue'
import List from './Pages/List.vue'

const router = createRouter({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Main,
        },
        {
            path: "/movies",
            name: "Movies",
            component: Movies,
        },
        {
            path: "/premiere",
            name: "Premiere",
            component: Premiere,
        },
        {
            path: "/posts",
            name: "Posts",
            component: Posts,
        },
        {
            path: "/lists",
            name: "Lists",
            component: Lists,
        },
        {
            path: "/movie/:id",
            name: "MoviePage",
            component: MoviePage,
            props: true
        },
        { 
            path: '/list/:list',
            name: 'List',
            component: List,
        },
        {
            path: "/person/:id",
            name: "PersonPage",
            component: PersonPage,
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
app.use(store)
app.mount('#app')

store.dispatch('updateBlackList');