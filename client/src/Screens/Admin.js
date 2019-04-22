import React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import Dataprovider from "../Components/Admin/Dataprovider";
import { Users, UsersEdit } from "../Components/Admin/Users";
import {
  Certificates,
  CertificatesEdit
} from "../Components/Admin/Certificates";

const App = () => (
  <Admin dataProvider={Dataprovider}>
    <Resource name="user" list={Users} edit={UsersEdit} />
    <Resource
      name="certification"
      list={Certificates}
      edit={CertificatesEdit}
    />
  </Admin>
);

export default App;
