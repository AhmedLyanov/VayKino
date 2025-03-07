import './assets/base.css';
import { createApp } from 'vue';
import App from './App.vue';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import Main from './Pages/Main.vue';
import MoviePage from './Pages/MoviePage.vue';
import Login from './Pages/Login.vue';
import Registration from './Pages/Registration.vue';
import PersonPage from './Pages/PersonPage.vue';
import Movies from './Pages/Movies.vue';
import store from './store';
import Profile from './Pages/Profile.vue';
import Premiere from './Pages/Premiere.vue';
import Posts from './Pages/Posts.vue';
import Lists from './Pages/Lists.vue';
import List from './Pages/List.vue';
import Media from './Pages/Media.vue';
import Chat from './Pages/Chat.vue';
import Actors from './Pages/Actors.vue';
import Posters from './Pages/Posters.vue';
import Awards from './Pages/Awards.vue';
import Stills from './Pages/Stills.vue';
import Favourites from './Pages/Favourites.vue';
import Series from './Pages/Series.vue';
import Cartoons from './Pages/Cartoons.vue';
import CartoonSeries from './Pages/CartoonSeries.vue';
import Anime from './Pages/Anime.vue';


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
            path: "/series",
            name: "Series",
            component: Series,
        },
        {
            path: "/cartoons",
            name: "Cartoons",
            component: Cartoons,
        },
        {
            path: "/cartoon-series",
            name: "CartoonSeries",
            component: CartoonSeries,
        },
        {
            path: "/animes",
            name: "Anime",
            component: Anime,
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
            path: "/media",
            name: "Media",
            component: Media,
        },
        {
            path: "/favourites",
            name: "Favourites",
            component: Favourites,
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
            path: "/cast/:movieId",
            name: "Cast",
            component: Actors,
            props: true
        },
        {
            path: "/posters/:movieId",
            name: "Posters",
            component: Posters,
            props: true
        },
        {
            path: "/awards/:movieId",
            name: "Awards",
            component: Awards,
            props: true
        },
        {
            path: "/stills/:movieId",
            name: "Stills",
            component: Stills,
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
        },
        {
            path: "/Chat",
            name: "Chat",
            component: Chat,
        },
    ],
    history: createWebHistory(),
});



const app = createApp(App);
app.use(router);
app.use(store);
app.use(ToastPlugin);
app.mount('#app')

store.dispatch('updateBlackList');