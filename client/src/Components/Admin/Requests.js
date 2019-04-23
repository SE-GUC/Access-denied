import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanInput,
  Edit,
  DisabledInput,
  TextInput,
  SimpleForm,
  Filter
} from 'react-admin'

export const Requests = props => (
  <List filters={<RequestsFilter />} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="route" />
      <DateField source="Date" />
      <TextField source="requester" />
      <TextField source="body.name" />
      <TextField source="type" />
      <TextField source="description" />
    </Datagrid>
  </List>
)

export const RequestsFilter = props => (
  <Filter {...props}>
    <TextInput label="Name" source="name" alwaysOn />
  </Filter>
)

export const RequestsEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <DisabledInput source="route" />
      <BooleanInput source="Approve" />
      <DisabledInput source="Date" />
      <DisabledInput source="requester" />
      <DisabledInput source="body.name" />
      <DisabledInput source="type" />
      <DisabledInput source="description" />
    </SimpleForm>
  </Edit>
)
