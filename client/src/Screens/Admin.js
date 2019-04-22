import React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import Dataprovider from "../Components/Admin/Dataprovider";
import { Users, UsersEdit } from "../Components/Admin/Users";

const App = () => (
  <Admin dataProvider={Dataprovider}>
    <Resource name="user" list={Users} edit={UsersEdit} />
  </Admin>
);

export default App;
