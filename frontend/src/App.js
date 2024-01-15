import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import RegistrationForm from './components/RegistrationForm';
import Upload from './components/Upload';
/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';
import Download from './components/Download';
import SemesterSubjectSelection from './components/SemesterSubjectSelection';
import SelectSem from './components/Selectsem';
/** root routes */
import Sem1 from './components/Sem1';
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '/validate',
        element : <RegistrationForm></RegistrationForm>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
    {
        path : '/upload',
        element : <Upload></Upload>
    },
    {
        path : '/download',
        element : <Download></Download>
    },
    {
        path : '/select',
        element : <SemesterSubjectSelection></SemesterSubjectSelection>
    },
    {
        path : '/selectsem',
        element : <SelectSem></SelectSem>
    },
    {
        path : '/sem1',
        element : <Sem1></Sem1>
    },
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
