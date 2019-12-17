import React from "react";
import { Link } from 'react-admin';

export default ({record}) => {
    return (
        <Link to={`/Produits/${record.id}`}>
            {record.nom}
        </Link>
    )
};
