export default payload => ({
    id: payload && payload.id,
    nom: payload && payload.nom,
    prix: payload && payload.prix,
    prixAchat: payload && payload.prixAchat,
});
