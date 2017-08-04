// in src/Resources/ShotTraegers.js
import React from 'react';
import { List, Datagrid, Filter, TextField, NumberField, TextInput } from 'admin-on-rest';

const ShotTraegerFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="traegernr" alwaysOn />
    </Filter>
);

export const ShotTraegerList = (props) => (
    <List title="ShotTraegerList" {...props} filters={<ShotTraegerFilter />}>
        <Datagrid>
            <TextField source="nummernkreis" />
            <NumberField source="traegernr" />
        </Datagrid>
    </List>
);
