// in src/Resources/ShotTraegers.js
import React from 'react';
import { List, Datagrid, Filter, TextField, NumberField, TextInput, ReferenceManyField,
  Show, SimpleShowLayout, SingleFieldList, ChipField, ShowButton, DateField} from 'admin-on-rest';
  import { ShotTimecodesListShort } from './ShotTimecodes';

const ShotTraegerTitelShotlistFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="traegernr" alwaysOn />
    </Filter>
);

export const ShotTraegerTitelShotlistList = (props) => (
    <List title="ShotTraegerTitelShotlists" {...props} filters={<ShotTraegerTitelShotlistFilter />}>
        <Datagrid>
            <TextField label="Nrk" source="nummernkreis" />
            <NumberField source="traegernr" />
            <TextField source="titelschluessel" />
            <TextField source="titel" />
            <ShowButton />
        </Datagrid>
    </List>
);


export const ShotTraegerTitelShotlistShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
          <TextField source="nummernkreis" />
          <NumberField source="traegernr" />
          <TextField source="titelschluessel" />
          <TextField source="titel" />
          <ReferenceManyField label="Shots" reference="ShotTimecodes" target="shotlistid">
            <!-- TODO: durch ShotTimecodesListShort ersetzen -->
            <Datagrid>
                <DateField source="tcin" showTime />
                <DateField source="tcout" showTime />
                <TextField source="inhalt" />
                <ShowButton />
            </Datagrid>
          </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);
