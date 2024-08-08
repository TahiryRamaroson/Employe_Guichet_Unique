
var data_plainte = [{
    id: 0,
    Victime:{
      id: 4,
      nom: "RAZAFY",
      prenom: "Alice",
      Date_naissance: "12/05/1989",
      Lieu_naissance: "Mahamasina",
      Sexe: {
        id: 1,
        nom: "masculin"
      },
      CIN: "1246168",
      num_acte_naissance: "7755777",
      Menage:{
        id: 3,
        Numero_menage: "0111111",
        Fokotany: {
            id: 1,
            nom: "MIADAMANJAKA",
            Commune: {
                id: 1,
                nom: "ARIVONIMAMO I",
                District:{
                    id: 1,
                    nom: "BENENITRA",
                    Region:{
                        id: 1,
                        nom: "ATSIMO ANDREFANA"
                    }
                }
            }
        },
        Adresse: "Lot III F 14 Ankadifotsy"
    },
      is_chef: true,
    },
    description_plainte: "Coupure incésente de l'éléctricité",
    categorie_plainte: {
        id: 1,
        nom: "Délestage"
    },
    date_fait: "10/11/2024",
    intervenant: {
      id: 1,
      nom: "Faralaza",
      prenom: "Lily"
    },
    responsable: {
      id: 1,
      nom: "Jean",
      prenom: "Ba"
    },
    statut: "validé",
    statut_traitement: "En cours"
  },]

  export default data_plainte;