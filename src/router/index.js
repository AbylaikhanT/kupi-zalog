import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


import Home from '@/components/Home';
import Page from '@/components/All/Page';
import PageCompact from '@/components/All/PageCompact';
import AccountPage from '@/components/Account/Page';
import AccountUserContent from '@/components/Account/User/Content';
import AccountCompanyContent from '@/components/Account/Company/Content';
import AccountUserProfile from '@/components/Account/User/Profile/Page';
import AccountUserProfileInfo from '@/components/Account/User/Profile/Content/Info';
import AccountUserProfileEdit from '@/components/Account/User/Profile/Content/Edit';
import AccountUserFavorites from '@/components/Account/User/Favorites';
import AccountUserMessages from '@/components/Account/User/Messages';
import AccountUserSettings from '@/components/Account/User/Settings';
import AccountCompanyProfile from '@/components/Account/Company/Profile/Page';
import AccountCompanyProfileInfo from '@/components/Account/Company/Profile/Content/Info';
import AccountCompanyProfileEdit from '@/components/Account/Company/Profile/Content/Edit';
import AccountCompanyListingsPage from '@/components/Account/Company/ListingsPage';
import AccountCompanyListing from '@/components/Account/Company/Listing';
import AccountCompanyListingDetail from '@/components/Account/Company/ListingDetail';
import AccountCompanyListingEdit from '@/components/Account/Company/ListingEdit';
import AccountCompanyListings from '@/components/Account/Company/Listings';
import AccountCompanyAddProduct from '@/components/Account/Company/AddProduct';
import AccountCompanyMessages from '@/components/Account/Company/Messages';
import AccountCompanyServices from '@/components/Account/Company/Services/Page';
import AccountCompanyServicesList from '@/components/Account/Company/Services/Content/List';
import AccountCompanyServicesBuy from '@/components/Account/Company/Services/Content/Buy';
import AccountCompanySettings from '@/components/Account/Company/Settings';
import AccountCompanySupport from '@/components/Account/Company/Support';
import AccountCompanyInstallment from '@/components/Account/Company/Installment';
import ItemPage from '@/components/ItemPage';
import Login from '@/components/All/Login';
import Registration from '@/components/All/Registration';
import Logout from '@/components/All/Logout';
import SearchResults from '@/components/SearchResults';
import TopPawnshops from '@/components/All/TopPawnshops';
import PawnshopListings from '@/components/All/PawnshopListings';
import InformationalPage from '@/components/InformationalPage';
import Top from "@/components/Top";
import Sale from "@/components/Sale"
import TopItems from "@/components/TopItems";
import SaleOutItems from "@/components/SaleOutItems";
import ItemsOfLombards from "@/components/ItemsOfLombards";
import ItemsOfBanks from "@/components/ItemsOfBanks";
import NotFound from "@/components/NotFound";
import VipItemList from "@/components/All/VipItemList";
import CloudPayment from "@/components/All/CloudPayment";
import Agreement from "@/components/InformationalPages/Agreement";
import politicConf from "@/components/InformationalPages/politicConf";

// import NewProfile from '@/components/NewProfile';
// import NewProfileSettings from '@/components/NewProfileSettings';
// import NewProfileCompany from '@/components/NewProfileCompany';
// import NewProfileCompanyOffices from '@/components/NewProfileCompanyOffices';
// import NewProfileCompanyProfile from '@/components/NewProfileCompanyProfile';
// import NewProfileCompanyAddProduct from '@/components/NewProfileCompanyAddProduct';
// import NewProfileCompanyProducts from '@/components/NewProfileCompanyProducts';
// import ServicesPage from '@/components/ServicesPage';
// import SupportPage from '@/components/SupportPage';

export default new Router({
    mode: 'history',
    routes: [{
        path: '/cloudpayments',
        name: 'cloudpayments',
        component: CloudPayment
    },
        {
            path: '/politicconf',
            name: 'politicConf',
            component: politicConf
        },
        {
            path: '/agreement',
            name: 'Agreement',
            component: Agreement
        },
    {
        path: '/404',
        name: 'not-found',
        component: NotFound
    },
    {
        path: '*',
        redirect: '/404',
        name: 'not-found-global',
    },
    {
        path: '/profile',
        name: 'profile',
        component: AccountPage,
        children: [{
            path: 'user',
            name: 'user',
            component: AccountUserContent,
            children: [{
                path: '',
                name: 'user-profile',
                component: AccountUserProfile,
                children: [{
                    path: '',
                    name: 'user-profile-info',
                    component: AccountUserProfileInfo
                },
                {
                    path: 'edit',
                    name: 'user-profile-edit',
                    component: AccountUserProfileEdit
                },
                ]
            },
            {
                path: 'favorites',
                name: 'user-favorites',
                component: AccountUserFavorites
            },
            {
                path: 'messages',
                name: 'user-messages',
                component: AccountUserMessages
            },
            {
                path: 'settings',
                name: 'user-settings',
                component: AccountUserSettings
            },
            ]
        },
        {
            path: 'company',
            name: 'company',
            component: AccountCompanyContent,
            children: [{
                path: '',
                name: 'company-profile',
                component: AccountCompanyProfile,
                children: [{
                    path: '',
                    name: 'company-profile-info',
                    component: AccountCompanyProfileInfo
                },
                {
                    path: 'edit',
                    name: 'company-profile-edit',
                    component: AccountCompanyProfileEdit
                },
                ]
            },
            {
                path: 'listings',
                name: 'company-listings',
                component: AccountCompanyListingsPage,
                children: [
                    {
                        path: ':id',
                        name: 'company-listings-item',
                        component: AccountCompanyListing,
                        children: [{
                            path: '',
                            name: 'company-listing-item-detail',
                            component: AccountCompanyListingDetail
                        },
                        {
                            path: 'edit',
                            name: 'company-listing-item-edit',
                            component: AccountCompanyListingEdit
                        },
                        ]
                    },
                    {
                        path: '',
                        name: 'company-listings-list',
                        component: AccountCompanyListings
                    },
                ]
            },
            {
                path: 'add-product',
                name: 'company-add-product',
                component: AccountCompanyAddProduct
            },
            {
                path: 'messages',
                name: 'company-messages',
                component: AccountCompanyMessages
            },
            {
                path: 'services',
                name: 'company-services',
                component: AccountCompanyServices,
                children: [
                    {
                        path: '',
                        name: 'company-services-list',
                        component: AccountCompanyServicesList
                    },
                    {
                        path: 'buy/:type',
                        name: 'company-services-buy',
                        component: AccountCompanyServicesBuy
                    },
                    {
                        path: 'buy/:type/:product',
                        name: 'company-services-buy-product',
                        component: AccountCompanyServicesBuy
                    },
                ]
            },
            {
                path: 'settings',
                name: 'company-settings',
                component: AccountCompanySettings
            },
            {
                path: 'support',
                name: 'company-support',
                component: AccountCompanySupport
            },
            {
                path: 'installment',
                name: 'company-installment',
                component: AccountCompanyInstallment
            }
            ]
        }
        ]
    },
    {
        path: '/login|registration|logout',
        name: 'page-compact',
        component: PageCompact,
        children: [{
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
        ]
    },
    {
        path: '/*',
        name: 'page',
        component: Page,
        children: [{
            path: '/item/:slug',
            name: 'item',
            component: ItemPage,
            props: true
        },
        {
            path: '/lombards',
            name: 'lombards',
            component: TopPawnshops
        },
        {
            path: '/vip',
            name: 'vip',
            component: VipItemList
        },
        {
            path: '/sale-out',
            name: 'sale-out',
            component: SaleOutItems
        },
        {
            path: '/top-items',
            name: 'top-items',
            component: TopItems
        },
        {
            path: '/items-of-lombards',
            name: 'items-of-lombards',
            component: ItemsOfLombards
        },
        {
            path: '/items-of-banks',
            name: 'items-of-banks',
            component: ItemsOfBanks
        },
        {
            path: '/top-lombards',
            name: 'top-lombards',
            component: Top
        },
        {
            path: '/sale',
            name: 'sale',
            component: Sale
        },
        {
            path: '/lombard/:id',
            name: 'pawnshop',
            component: PawnshopListings
        },
        {
            path: '/p/:slug',
            name: 'info',
            component: InformationalPage
        },

        {
            path: '/v-:city',
            name: 'search_in_city',
            component: SearchResults
        },
        {
            path: '/:category',
            name: 'search_in_category',
            component: SearchResults
        },
        {
            path: '/:category/:subcategory',
            name: 'search_in_subcategory',
            component: SearchResults
        },
        {
            path: '/:category/:subcategory/:subsubcategory',
            name: 'search_in_subsubcategory',
            component: SearchResults
        },
        {
            path: '/*/v-:city',
            name: 'search_in_category_by_city',
            component: SearchResults
        },
        {
            path: '/search',
            name: 'search',
            component: SearchResults
        },
        {
            path: '',
            name: 'home',
            component: Home
        },
        ]
    },
        // {
        //     path: '/new/profile',
        //     name: 'newProfile',
        //     name: 'newProfile',
        //     component: NewProfile
        // },
        // {
        //     path: '/new/profile/settings',
        //     name: 'newProfileSettings',
        //     component: NewProfileSettings
        // },
        // {
        //     path: '/new/profile/company',
        //     name: 'newProfileCompany',
        //     component: NewProfileCompany
        // },
        // {
        //     path: '/new/profile/company/offices',
        //     name: 'newProfileCompanyOffices',
        //     component: NewProfileCompanyOffices
        // },
        // {
        //     path: '/new/profile/company/profile',
        //     name: 'newProfileCompanyProfile',
        //     component: NewProfileCompanyProfile
        // },
        // {
        //     path: '/new/profile/company/add-product',
        //     name: 'newProfileCompanyAddProduct',
        //     component: NewProfileCompanyAddProduct
        // },
        // {
        //     path: '/new/profile/company/products',
        //     name: 'newProfileCompanyProducts',
        //     component: NewProfileCompanyProducts
        // },
        // {
        //     path: '/new/profile/company/services',
        //     name: 'newProfileCompanyServices',
        //     component: ServicesPage
        // },
        // {
        //     path: '/new/profile/company/support',
        //     name: 'newProfileCompanySupport',
        //     component: SupportPage
        // },
    ]
})