import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'TransactionListing',
    component: () => import(/* webpackChunkName: "transaction-listing" */ '../views/TransactionListing.vue'),
  },
  {
    path: '/transactions/:id',
    name: 'TransactionEdit',
    component: () => import(/* webpackChunkName: "transaction-edit" */ '../views/TransactionEdit.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
