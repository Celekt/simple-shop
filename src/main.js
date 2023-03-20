import { createApp } from "vue";
import {createWebHistory, createRouter} from "vue-router";
import App from "./App.vue";
import Home from "./components/Home.vue"
import Cart from "./components/Cart.vue"
import Shop from "./components/Shop.vue"
import ShopItem from "./components/ShopItem.vue"


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/shop',
        component: Shop
    },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App);
app.use(router);
app.component('ShopItem', ShopItem);
app.mount("#app");

