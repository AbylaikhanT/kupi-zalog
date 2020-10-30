import Vue from 'vue';
import Vuex from 'vuex';
import App from './App'
import Routes from './router'
import Notifications from 'vue-notification';
import { VueMaskDirective } from 'v-mask';
import VueMeta from 'vue-meta';
import VModal from 'vue-js-modal';
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './plugins/bootstrap'
import vuetify from './plugins/vuetify';

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'https://api.kupizalog.kz/';

Vue.config.productionTip = false
Vue.use(VueMeta);
Vue.use(Vuex);
Vue.use(Notifications);
Vue.use(VModal, { componentName: 'vmodal' });
Vue.directive('mask', VueMaskDirective);

const store = new Vuex.Store({
    state: {
        modal: '',
        content: '',
        token: '',
        refreshToken: '',
        tokenLastUpdated: false,
        info: false,
        company: false,
        balance: 0,
        city: false,
        listing: false,
        listingSuccess: false,
        loginSuccess: false,
        forgotPassword: '',
        newPassword: false
    },
    mutations: {
        setModal(state, modal) {
            state.modal = modal;
        },
        setToken(state, token) {
            state.token = token;
            window.localStorage.setItem('token', JSON.stringify(token));
        },
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
            window.localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
        },
        setTokenLastUpdated(state, tokenLastUpdated) {
            state.tokenLastUpdated = tokenLastUpdated;
            window.localStorage.setItem('tokenLastUpdated', tokenLastUpdated.toString());
        },
        setInfo(state, info) {
            state.info = info;
            window.localStorage.setItem('info', JSON.stringify(info));
        },
        setCompany(state, company) {
            state.company = company;
            window.localStorage.setItem('company', JSON.stringify(company));
        },
        setBalance(state, balance) {
            state.balance = balance;
        },
        setCity(state, city) {
            state.city = city;
            window.localStorage.setItem('city', JSON.stringify(city));
        },
        setListing(state, listing) {
            state.listing = listing;
        },
        setListingSuccess(state, success) {
            state.listingSuccess = success;
        },
        setLoginSuccess(state, success) {
            state.loginSuccess = success;
            window.localStorage.setItem('loginSuccess', JSON.stringify(success));
        },
        setForgotPassword(state, forgot) {
            state.forgotPassword = forgot;
            window.localStorage.setItem('forgotPassword', JSON.stringify(forgot));
        },
        setNewPassword(state, password) {
            state.newPassword = password;
            window.localStorage.setItem('newPassword', JSON.stringify(password));
        }
    },
    getters: {
        loggedIn(state) {
            return !!state.token;
        },
        hasCompany(state) {
            return !!state.company;
        },
        cityPicked(state) {
            return !!state.city;
        },
        listingSet(state) {
            return !!state.listing;
        },
        listingSucceded(state) {
            return !!state.listingSuccess;
        },
        didForgotPassword(state) {
            return !!state.forgotPassword;
        }
    },
    actions: {
        openModal(store, modal) {
            store.commit('setModal', modal);
        },
        closeModal(store) {
            store.commit('setModal', '');
        },
        setUserInfo(store) {
            axios.get('user/get_info/', {
                headers: {
                    'Authorization': store.state.token
                }
            }).then((response) => {
                store.commit('setInfo', response.data);
            });
        },
        setUserCompany(store) {
            return new Promise((resolve, reject) => {
                axios.get('user/has_company/', {
                    headers: {
                        'Authorization': store.state.token
                    }
                }).then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        setCompany(store) {
            return new Promise((resolve, reject) => {
                axios.get('companies/profile', {
                    headers: {
                        'Authorization': store.state.token
                    }
                }).then((response) => {
                    store.commit('setCompany', response.data);
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        setBalance(store) {
            axios.post('account/balance', {}, {
                headers: {
                    Authorization: store.state.token
                }
            }).then((response) => {
                store.commit('setBalance', response.data.detail);
            });
        },
        signIn(store, params) {
            return new Promise((resolve, reject) => {
                axios.post('user/token/', {
                    phone: params.phone,
                    password: params.password,
                }).then((response) => {
                    if (response.data.access) {
                        store.commit('setModal', '');
                        store.commit('setToken', `Bearer ${response.data.access}`);
                        store.commit('setRefreshToken', response.data.refresh);
                        const date = new Date();
                        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
                        store.commit('setTokenLastUpdated', date);
                        store.dispatch('setUserInfo');
                        store.dispatch('setUserCompany').then((company) => {
                            if (company.status) {
                                store.dispatch('setCompany').then(function () {
                                    resolve();
                                }.bind(this));
                            } else {
                                resolve();
                            }
                        });
                    } else {
                        reject();
                    }
                }).catch(() => {
                    reject();
                });
            });
        },
        refreshToken(store) {
            return new Promise((resolve, reject) => {
                axios.post('user/refresh/', {
                    refresh: store.state.refreshToken
                }).then((response) => {
                    if (response.data.access) {
                        store.commit('setToken', `Bearer ${response.data.access}`);
                        const date = new Date();
                        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
                        store.commit('setTokenLastUpdated', date);
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(() => {
                    reject();
                });
            });
        },
        signOut(store) {
            store.commit('setModal', '');
            store.commit('setToken', '');
            store.commit('setRefreshToken', '');
            store.commit('setTokenLastUpdated', false);
            store.commit('setInfo', false);
            store.commit('setCompany', false);
            store.commit('setLoginSuccess', false);
            store.commit('setForgotPassword', '');
            store.commit('setNewPassword', '');
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('info');
            window.localStorage.removeItem('company');
            window.localStorage.removeItem('loginSuccess');
            window.localStorage.removeItem('forgotPassword');
            window.localStorage.removeItem('newPassword');
            window.location = '/';
        }
    }
});

axios.interceptors.request.use(function (config) {
    if (this && this.getters.loggedIn) {
        config.headers.Authorization = this.state.token;
    }

    return config;
}.bind(store));

Vue.mixin({
    methods: {
        redirect(route, params, query, reload) {
            this.$router.push({
                name: route,
                params: params,
                query: query
            });
            if (reload) {
                this.$router.go();
            }
        }
    }
});

new Vue({
    router: Routes,
    store,
    render: h => h(App),
    vuetify,

    created() {
        if (window.localStorage.getItem('token')) {
            if (window.localStorage.getItem('token') === 'undefined') {
                this.$store.commit('setToken', JSON.stringify(this.$store.state.token));
            }
            this.$store.commit('setToken', JSON.parse(window.localStorage.getItem('token')));
        }

        if (window.localStorage.getItem('refreshToken')) {
            if (window.localStorage.getItem('refreshToken') === 'undefined') {
                this.$store.commit('setRefreshToken', JSON.stringify(this.$store.state.refreshToken));
            }
            this.$store.commit('setRefreshToken', JSON.parse(window.localStorage.getItem('refreshToken')));
        }

        if (window.localStorage.getItem('tokenLastUpdated')) {
            if (window.localStorage.getItem('tokenLastUpdated') === 'undefined') {
                this.$store.commit('setTokenLastUpdated', JSON.stringify(this.$store.state.tokenLastUpdated));
            } else {
                this.$store.commit('setTokenLastUpdated', new Date(window.localStorage.getItem('tokenLastUpdated')));
                if (this.$store.state.token && this.$store.state.tokenLastUpdated) {
                    if (this.$store.state.tokenLastUpdated < (new Date())) {
                        this.$store.dispatch('refreshToken');
                    }
                }
            }
        }

        if (window.localStorage.getItem('info')) {
            if (window.localStorage.getItem('info') === 'undefined') {
                this.$store.commit('setInfo', JSON.stringify(this.$store.state.info));
            }
            this.$store.commit('setInfo', JSON.parse(window.localStorage.getItem('info')));
        }

        if (window.localStorage.getItem('company')) {
            if (window.localStorage.getItem('company') === 'undefined') {
                this.$store.commit('setCompany', JSON.stringify(this.$store.state.company));
            }
            this.$store.commit('setCompany', JSON.parse(window.localStorage.getItem('company')));
        }

        if (window.localStorage.getItem('loginSuccess')) {
            if (window.localStorage.getItem('loginSuccess') === 'undefined') {
                this.$store.commit('setLoginSuccess', JSON.stringify(this.$store.state.loginSuccess));
            }
            this.$store.commit('setLoginSuccess', JSON.parse(window.localStorage.getItem('loginSuccess')));
        }

        if (window.localStorage.getItem('city')) {
            if (window.localStorage.getItem('city') === 'undefined') {
                this.$store.commit('setCity', JSON.stringify(this.$store.state.city));
            }
            this.$store.commit('setCity', JSON.parse(window.localStorage.getItem('city')));
        }

        if (window.localStorage.getItem('forgotPassword')) {
            if (window.localStorage.getItem('forgotPassword') === 'undefined') {
                this.$store.commit('setForgotPassword', JSON.stringify(this.$store.state.forgotPassword));
            }
            this.$store.commit('setForgotPassword', JSON.parse(window.localStorage.getItem('forgotPassword')));
        }

        if (window.localStorage.getItem('newPassword')) {
            if (window.localStorage.getItem('newPassword') === 'undefined') {
                this.$store.commit('setNewPassword', JSON.stringify(this.$store.state.newPassword));
            }
            this.$store.commit('setNewPassword', JSON.parse(window.localStorage.getItem('newPassword')));
        }
    }
}).$mount('#app')
