import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  NumberInput,
  Edit,
  DisabledInput,
  TextInput,
  SimpleForm,
  Filter
} from 'react-admin'

export const Certificates = props => (
  <List filters={<CertificatesFilter />} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="skills" />
      <TextField source="keywords" />
      <NumberField source="Fees" />
      <TextField source="Method_of_payment" />
      <TextField source="Tags" />
      <TextField source="membersapplied" />
      <TextField source="membersaccepted" />
    </Datagrid>
  </List>
)

export const CertificatesFilter = props => (
  <Filter {...props}>
    <TextInput label="Name" source="name" alwaysOn />
  </Filter>
)

export const CertificatesEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="skills" />
      <TextInput source="keywords" />
      <NumberInput source="Fees" />
      <TextInput source="Method_of_payment" />
      <TextInput source="Tags" />
      <TextInput source="membersapplied" />
      <TextInput source="membersaccepted" />
    </SimpleForm>
  </Edit>
)
