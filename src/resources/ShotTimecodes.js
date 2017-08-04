// in src/Resources/ShotTraegers.js
import React from 'react';
import { List, Datagrid, TextField, NumberField,
    ShowButton, SimpleShowLayout, Show,
    DateField  } from 'admin-on-rest';

export const ShotTimecodesList = (props) => (
    <List title="ShotTimecodes" {...props} >
        <Datagrid>
            <TextField source="id" />
            <DateField source="tcin" showTime />
            <DateField source="tcout" showTime />
            <TextField source="inhalt" />
            <TextField source="sachinhalt" />
            <NumberField source="traegernr" />
            <TextField source="shotlistid" />
            <ShowButton />
        </Datagrid>
    </List>
);

export const ShotTimecodesListShort = (props) => (
    <List title="ShotTimecodesListShort" {...props} >
        <Datagrid>
            <DateField source="tcin" showTime />
            <TextField source="inhalt" />
            <ShowButton />
        </Datagrid>
    </List>
);

export const ShotTimecodesShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
          <TextField source="id" />
          <DateField source="tcin" showTime />
          <DateField source="tcout" showTime />
          <TextField source="inhalt" />
          <TextField source="sachinhalt" />
          <NumberField source="traegernr" />
          <TextField source="shotlistid" />
        </SimpleShowLayout>
    </Show>
);
