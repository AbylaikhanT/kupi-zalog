import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
window._ = require('lodash');

window.axios = require('axios');
window.axios.defaults.baseURL = 'https://api.kupizalog.kz/';

window.moment = require('moment');


Vue.use(BootstrapVue)
