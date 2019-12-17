import React from "react";
import { Create, TextInput, FormDataConsumer, SimpleForm } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = {};

const ProduitCreate= props => {
    return (
        <Create {...props}>
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
        </Create>
    )
};

export default withStyles(styles)(ProduitCreate)

