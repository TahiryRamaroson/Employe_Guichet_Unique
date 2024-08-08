
var data_migration_sortante = [
  {
    id: 0,
    Individu:{
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
    fokotany_destination: {
        id: 1,
        nom: "ADRIAFOTSY",
        Commune: {
            id: 1,
            nom: "ARIVONIMAMO II",
            District:{
                id: 1,
                nom: "ZAMA",
                Region:{
                    id: 1,
                    nom: "ATSIMO ANDREFANA"
                }
            }
        }
    },
    date_depart: "10/01/2024",
    motif: {
        id: 1,
        description: "étude"
    },
    destination: "national",
    statut_depart: "permanent",
    duree_absence: "",
    nouveau_menage: "non",
    adresse: "",
    piece_justificative: "-----------",
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
    statut: "validé"
  },]
  

  export default data_migration_sortante;