import React from 'react'
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin'
import Dataprovider from '../Components/Admin/Dataprovider'
import { Users, UsersEdit } from '../Components/Admin/Users'
import {
  Certificates,
  CertificatesEdit
} from '../Components/Admin/Certificates'
import { Tasks, TasksEdit } from '../Components/Admin/Tasks'
import { Requests, RequestsEdit } from '../Components/Admin/Requests'
import Notify from '../Components/Admin/Notify'
import AuthProvider from '../Components/Admin/AuthProvider'
const App = () => (
  <Admin
    dashboard={Notify}
    authProvider={AuthProvider}
    dataProvider={Dataprovider}
  >
    <Resource name="user" list={Users} edit={UsersEdit} />
    <Resource
      name="certification"
      list={Certificates}
      edit={CertificatesEdit}
    />
    <Resource name="task" list={Tasks} edit={TasksEdit} />
    <Resource name="request" list={Requests} edit={RequestsEdit} />
  </Admin>
)

export default App
