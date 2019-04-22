import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Edit,
  DisabledInput,
  TextInput,
  SimpleForm,
  Filter
} from 'react-admin'

export const Users = props => (
  <List filters={<UsersFilter />} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <EmailField source="email" />
      <TextField source="type" />
      <TextField source="profile" />
    </Datagrid>
  </List>
)

export const UsersFilter = props => (
  <Filter {...props}>
    <TextInput label="Email" source="email" alwaysOn />
  </Filter>
)

export const UsersEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="email" />
      <DisabledInput source="type" />
      <DisabledInput source="profile" />
    </SimpleForm>
  </Edit>
)
