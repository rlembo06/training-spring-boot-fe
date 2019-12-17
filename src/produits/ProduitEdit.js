import React from "react";
import { Edit, TextInput, FormDataConsumer, SimpleForm } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = {};

const ProduitEdit = props => {
    return (
        <Edit title="" {...props}>
            <SimpleForm>
                <FormDataConsumer>
                    {({ formData, ...rest }) => (
                        <>
                            <TextInput source="nom" {...rest} />
                            <TextInput source="prix" {...rest} />
                            <TextInput source="prixAchat" {...rest} />
                        </>
                    )}
                </FormDataConsumer>
            </SimpleForm>
        </Edit>
    )
};

export default withStyles(styles)(ProduitEdit)

