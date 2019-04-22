import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  DateInput,
  BooleanInput,
  NumberInput,
  Edit,
  DisabledInput,
  TextInput,
  SimpleForm,
  Filter
} from "react-admin";

export const Tasks = props => (
  <List filters={<TasksFilter />} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="phase" />
      <BooleanField source="isComplete" />
      <DateField source="date" />
      <TextField source="skills" />
      <TextField source="keywords" />
      <TextField source="applied_members" />
      <TextField source="description" />
      <TextField source="extraNotes" />
      <NumberField source="effortLevel" />
      <NumberField source="monetaryComp" />
      <TextField source="applications" />
      <TextField source="Tags" />
      <TextField source="paymentMethod" />
      <TextField source="assignee" />
      <TextField source="owner" />
      <NumberField source="commitmentLevel" />
      <NumberField source="timeRequired" />
    </Datagrid>
  </List>
);

export const TasksFilter = props => (
  <Filter {...props}>
    <TextInput label="Name" source="name" alwaysOn />
  </Filter>
);

export const TasksEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="phase" />
      <DateInput source="date" />
      <BooleanInput source="isComplete" />
      <TextInput source="skills" />
      <TextInput source="keywords" />
      <TextInput source="applied_members" />
      <TextInput source="description" />
      <TextInput source="extraNotes" />
      <NumberInput source="effortLevel" />
      <NumberInput source="monetaryComp" />
      <TextInput source="applications" />
      <TextInput source="Tags" />
    </SimpleForm>
  </Edit>
);
