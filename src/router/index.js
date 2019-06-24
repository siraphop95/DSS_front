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
import Signup from '@/components/Signup'
import LouiseTest from '@/components/LouiseTest'
import Navbar from '@/components/Navbar'
import DocumentDetail from '@/components/DocumentDetail'
import SuggestedDocuments from '@/components/SuggestedDocuments'
import Answer from '@/components/Answer'
import AnswerReview from '@/components/AnswerReview'
import uploadTest from '@/components/uploadTest'
import AnsweredView from '@/components/AnsweredView'
import AskedView from '@/components/AskedView'
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
      path: '/signup',
      name: 'Signup',
      component: Signup
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
    },
    {
      path: '/answerreview/:docId',
      name: 'AnswerReview',
      component: AnswerReview
    },
    {
      path: '/upload',
      name: 'uploadTest',
      component: uploadTest
    },
    {
      path: '/answeredview/:docId',
      name: 'AnsweredView',
      component: AnsweredView
    },
    {
      path: '/askedview/:docId',
      name: 'AskedView',
      component: AskedView
    }
  ],
  mode: 'history'
})