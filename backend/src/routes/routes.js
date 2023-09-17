
const usersController = require("../controllers/user")

const testController = require("../controllers/Test")
const foreignKeyTestController = require("../controllers/ForeignKeyTest")

let routes = [
    // {
    //     route: '',
    //     type: '',
    //     middlewares: ,
    //     controller: ,
    // }
    {
        route: '/register',
        type: 'post',
        middlewares: usersController['postBasic']['middlewares'],
        controller: usersController.postBasic.controller
    },
    {
        route: '/login',
        type: 'post',
        middlewares: usersController['login']['middlewares'],
        controller: usersController['login']['controller']
    },
    {
        route: '/login/admin',
        type: 'post',
        middlewares: usersController['loginAdmin']['middlewares'],
        controller: usersController['loginAdmin']['controller']
    },
    {
        route: '/editProfile',
        type: 'put',
        middlewares: usersController['updateProfile']['middlewares'],
        controller: usersController['updateProfile']['controller']
    },
    
            {
                route: '/test',
                type: 'post',
                middlewares: testController['post']['middlewares'],
                controller: testController['post']['controller']
            },
            {
                route: '/test',
                type: 'get',
                middlewares: testController['getList']['middlewares'],
                controller: testController['getList']['controller']
            },
            {
                route: '/test/:id',
                type: 'get',
                middlewares: testController['getDetail']['middlewares'],
                controller: testController['getDetail']['controller']
            },
            {
                route: '/test/:id',
                type: 'put',
                middlewares: testController['put']['middlewares'],
                controller: testController['put']['controller']
            },
            {
                route: '/test/:id',
                type: 'delete',
                middlewares: testController['delete']['middlewares'],
                controller: testController['delete']['controller']
            },
            {
                route: '/foreignKeyTest',
                type: 'post',
                middlewares: foreignKeyTestController['post']['middlewares'],
                controller: foreignKeyTestController['post']['controller']
            },
            {
                route: '/foreignKeyTest',
                type: 'get',
                middlewares: foreignKeyTestController['getList']['middlewares'],
                controller: foreignKeyTestController['getList']['controller']
            },
            {
                route: '/foreignKeyTest/:id',
                type: 'get',
                middlewares: foreignKeyTestController['getDetail']['middlewares'],
                controller: foreignKeyTestController['getDetail']['controller']
            },
            {
                route: '/foreignKeyTest/:id',
                type: 'put',
                middlewares: foreignKeyTestController['put']['middlewares'],
                controller: foreignKeyTestController['put']['controller']
            },
            {
                route: '/foreignKeyTest/:id',
                type: 'delete',
                middlewares: foreignKeyTestController['delete']['middlewares'],
                controller: foreignKeyTestController['delete']['controller']
            }

]

module.exports = routes
