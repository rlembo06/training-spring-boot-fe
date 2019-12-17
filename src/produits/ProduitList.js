import React from "react";
import { List, Filter, SearchInput, Datagrid, TextField, EditButton, ShowButton } from 'react-admin';
import ProduitListSelect from './ProduitListSelect'

const ProduitFilter = props => (
    <Filter {...props}>
        <SearchInput source="nom" alwaysOn />
    </Filter>
);

export default ({hasDelete = false, ...props}) => {
    return (
        <List filters={<ProduitFilter />} {...props }>
            <Datagrid>
                <ProduitListSelect />
                <TextField source="id"/>
                <TextField source="nom"/>
                <TextField source="prix"/>
                <TextField source="prixAchat"/>
                <EditButton />
                <ShowButton />
            </Datagrid>
        </List>
    )
};
