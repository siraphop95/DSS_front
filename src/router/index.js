import Vue from 'vue'
import Router from 'vue-router'
import AddUser from '@/components/AddUser'
import Users from '@/components/Users'
import UpdateUser from '@/components/UpdateUser'
import AddDocument from '@/components/AddDocument'
import MyQuestions from '@/components/MyQuestions'
import MyAnswers from '@/components/MyAnswers'
import Drugs from '@/components/Drugs'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Profile from '@/components/Profile'
import Home from '@/components/Home'
import Test from '@/components/Test'
import Louise from '@/components/Louise'
import LouiseTest from '@/components/LouiseTest'
import Navbar from '@/components/Navbar'
import DocumentDetail from '@/components/documentDetail'
import SuggestedDocuments from '@/components/suggestedDocuments'
import Answer from '@/components/Answer'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/addUser',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/user',
      name: 'Users',
      component: Users
    },
    {
      path: '/updateUser/:userId',
      name: 'UpdateUser',
      component: UpdateUser
    },
    {
      path: '/addDocument',
      name: 'AddDocument',
      component: AddDocument
    },
    {
      path: '/myQuestions',
      name: 'MyQuestions',
      component: MyQuestions
    },
    {
      path: '/myAnswers',
      name: 'MyAnswers',
      component: MyAnswers
    },
    {
      path: '/drugs',
      name: 'Drugs',
      component: Drugs
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/louise',
      name: 'Louise',
      component: Louise
    },
    {
      path: '/louisetest',
      name: 'LouiseTest',
      component: LouiseTest
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/navbar',
      name: 'Navbar',
      component: Navbar,
      meta: { hideNavigation: true }
    },
    {
      path: '/documentDetail/:docId',
      name: 'DocumentDetail',
      component: DocumentDetail
    },
    {
      path: '/suggestedDocuments/:docId',
      name: 'SuggestedDocuments',
      component: SuggestedDocuments
    },
    {
      path: '/answer/:docId',
      name: 'Answer',
      component: Answer
    }
  ],
  mode: 'history'
})