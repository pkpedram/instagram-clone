
const usersController = require("../controllers/user")

const testController = require("../controllers/Test")
const foreignKeyTestController = require("../controllers/ForeignKeyTest")
const postController = require("../controllers/Post")

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
        route: '/user/:username',
        type: 'get',
        middlewares: usersController['getByUserName']['middlewares'],
        controller: usersController['getByUserName']['controller']

    },
    
    {
        route: '/post',
        type: 'post',
        middlewares: postController['addPost']['middlewares'],
        controller: postController['addPost']['controller']
    },
    {
        route: '/post/image',
        type: 'post',
        middlewares: postController['addPostImage']['middlewares'],
        controller: postController['addPostImage']['controller']
    },
    {
        route: '/post/video',
        type: 'post',
        middlewares: postController['addPostVideo']['middlewares'],
        controller: postController['addPostVideo']['controller']
    },
    {
        route: '/posts/:username',
        type: 'get',
        middlewares: postController['getPersonPostList']['middlewares'],
        controller: postController['getPersonPostList']['controller']
    },

    {
        route: '/post/:id',
        type: 'get',
        middlewares: postController['getById']['middlewares'],
        controller: postController['getById']['controller']
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
