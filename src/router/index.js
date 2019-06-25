import Vue from 'vue'
import Router from 'vue-router'
import AddUser from '@/components/AddUser'
import Users from '@/components/Users'
import UpdateUser from '@/components/UpdateUser'
import AddDocument from '@/components/AddDocument'
import MyQuestions from '@/components/MyQuestions'
import MyAnswers from '@/components/MyAnswers'
import ReplyInbox from '@/components/ReplyInbox'
import Drugs from '@/components/Drugs'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Profile from '@/components/Profile'
import NewQuestions from '@/components/NewQuestions'
import Test from '@/components/Test'
import Signup from '@/components/Signup'
import LouiseTest from '@/components/LouiseTest'
import Navbar from '@/components/Navbar'
import DocumentDetail from '@/components/DocumentDetail'
import SuggestedDocuments from '@/components/SuggestedDocuments'
import Answer from '@/components/Answer'
import AnswerReview from '@/components/AnswerReview'
import uploadTest from '@/components/uploadTest'
import View4Tabs from '@/components/View4Tabs'
import View3Tabs from '@/components/View3Tabs'
import View2Tabs from '@/components/View2Tabs'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/newquestion',
      name: 'NewQuestions',
      component: NewQuestions
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
      path: '/replyinbox',
      name: 'ReplyInbox',
      component: ReplyInbox
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
      path: '/view4tabs/:docId',
      name: 'View4Tabs',
      component: View4Tabs
    },
    {
      path: '/view3tabs/:docId',
      name: 'View3Tabs',
      component: View3Tabs
    },
    {
      path: '/view2tabs/:docId',
      name: 'View2Tabs',
      component: View2Tabs
    },
    {
      path: '/',
      
    }
  ],
  mode: 'history'
})