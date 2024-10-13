import { useState, useEffect } from 'react';
import { api_url } from '@/configs/api-url';
import PropTypes from "prop-types";

const FokontanyName = ({ fokontanyId }) => {
  const [fokontanyName, setFokontanyName] = useState('');

  // Fonction pour récupérer le nom du fokontany
  const getFokontany = async (idf) => {
    const apiFokontany = `${api_url}/api/Fokontany/menage/${idf}`;

    try {
      const reponseFokontany = await fetch(apiFokontany, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseFokontany.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseFokontany.json();
      return data.nom;
    } catch (error) {
      console.error('Error: ' + error.message);
    }
  };

  // Utilisez useEffect pour charger le nom du fokontany lorsque l'id change
  useEffect(() => {
    const fetchFokontany = async () => {
      const nom = await getFokontany(fokontanyId);
      setFokontanyName(nom || 'Fokontany inconnu');
    };

    fetchFokontany();
  }, [fokontanyId]); // dépend de l'ID du fokontany

  return (
    <>
      {fokontanyName ? fokontanyName : 'Chargement...'}
    </>
  );
};

FokontanyName.propTypes = {
    fokontanyId: PropTypes.string,
};

export default FokontanyName;
