import {useEffect, useState, useRef} from "react";
import Webcam from 'react-webcam';
import { api_url } from "@/configs/api-url";
import axios from "axios";
import {
  Typography,
  Card,
  CardBody,
  Select,
  Option,
  Radio,
  Input,
  Button,
  Dialog,
  DialogBody,
  Switch,
} from "@material-tailwind/react";
import {
  CameraIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ViewfinderCircleIcon} from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function NouveauMenage() {

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const [openError, setOpenError] = useState(false);
  const handleOpenError = () => setOpenError(!open);

  const [openSuccess, setOpenSuccess] = useState(false);
  const handleOpenSuccess = () => setOpenSuccess(!open);

  const [dataRegion, setDataRegion] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataCommune, setDataCommune] = useState([]);
  const [dataFokontany, setDataFokontany] = useState([]);
  const [numero, setNumero] = useState(null);
  const [adresse, setAdresse] = useState("");

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedFokontany, setSelectedFokontany] = useState(null);

  const checkToken = () => {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
      navigate('/auth/sign-in');
    }

    try {
      const decodedtoken = jwtDecode(token);
      const now = Date.now() / 1000;
      if(now > decodedtoken.exp || decodedtoken.profil != "Intervenant sociaux") {
        sessionStorage.removeItem('authToken');
        navigate('/auth/sign-in');
      }
    } catch (error) {
      sessionStorage.removeItem('authToken');
      navigate('/auth/sign-in');
    }

  };

  const getRegion = async () => {
  
    const apiRegion = `${api_url}/api/Regions`; 
    console.log("apiRegion :", apiRegion);
    try {
      const reponseRegion = await fetch(apiRegion, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseRegion.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseRegion.json();
      setDataRegion(data);
      console.log("dataRegion après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getDistrict = async (idreg) => {
  
    const apiDistrict = `${api_url}/api/Regions/${idreg}/districts`; 
    console.log("apiDistrict :", apiDistrict);
    try {
      const reponseDistrict = await fetch(apiDistrict, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseDistrict.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseDistrict.json();
      setDataDistrict(data);
      console.log("dataDistrict après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getCommune = async (iddis) => {
  
    const apiCommune = `${api_url}/api/Districts/${iddis}/communes`; 
    console.log("apiCommune :", apiCommune);
    try {
      const reponseCommune = await fetch(apiCommune, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseCommune.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseCommune.json();
      setDataCommune(data);
      console.log("dataCommune après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getFokontany = async (idcom) => {
  
    const apiFokontany = `${api_url}/api/Communes/${idcom}/fokontany`; 
    console.log("apiFokontany :", apiFokontany);
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
      setDataFokontany(data);
      console.log("dataFokontany après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNumero = async () => {
  
    const apiNumero = `${api_url}/api/Menages/numero`; 
    console.log("apiNumero :", apiNumero);
    try {
      const reponseNumero = await fetch(apiNumero, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNumero.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNumero.json();
      setNumero(data.numero);
      console.log("dataNumero après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };


  useEffect(() => {
    checkToken();
    getRegion();
    }, [navigate]);


  const changeSelectRegion = (value) => {
    setSelectedRegion(value);
    getDistrict(value);
    console.log("selectedRegion :", selectedRegion);
  };

  const changeSelectDistrict = (value) => {
    setSelectedDistrict(value);
    getCommune(value);
    console.log("selectedDistrict :", selectedDistrict);
  };

  const changeSelectCommune = (value) => {
    setSelectedCommune(value);
    getFokontany(value);
    console.log("selectedCommune :", selectedCommune);
  };

  const changeSelectFokontany = (value) => {
    setSelectedFokontany(value);
    console.log("selectedFokontany :", selectedFokontany);
  };

  const getRegionNameById = (id) => {
    const Region = dataRegion.find(Region => Region.id === id);
    return Region ? Region.nom : '';
  };

  const getDistrictNameById = (id) => {
    const District = dataDistrict.find(District => District.id === id);
    return District ? District.nom : '';
  };

  const getCommuneNameById = (id) => {
    const Commune = dataCommune.find(Commune => Commune.id === id);
    return Commune ? Commune.nom : '';
  };

  const getFokontanyNameById = (id) => {
    const Fokontany = dataFokontany.find(Fokontany => Fokontany.id === id);
    return Fokontany ? Fokontany.nom : '';
  };

  const [rows, setRows] = useState([{ id: 1, data: {} }]);  // Initialisation avec un objet vide pour chaque ligne
  const [allDataIndividu, setAllDataIndividu] = useState("");  // Stockage de toutes les données
  const [formattedData, setFormattedData] = useState("");

  // Fonction pour ajouter une nouvelle ligne
  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1 }]);
  };

  // Fonction pour supprimer une ligne
  const handleRemoveRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? { ...row, data: { ...row.data, [field]: value } }
          : row
      )
    );
  };

  const postNouveau = async (e) => {
    e.preventDefault();

    const formattedIndividu = rows
      .map((row) =>
        Object.values(row.data).join(",")
      )
      .join(";");

      const formattedMenage = [
        numero,
        adresse,
        selectedFokontany,
      ].join(",");

      const foData = new FormData();
        foData.append('menage', formattedMenage);
        foData.append('individu', formattedIndividu);
        
    try {
        const response = await axios.post(`${api_url}/api/Menages/nouveau`, foData, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
            'Content-Type': 'application/json'
          }
        });
        if(response.data.error){
          setErrorMessage(response.data.error);
          setOpenError(true);
          await new Promise(r => setTimeout(r, 2000));
          setOpenError(false);
          return;
        }
        console.log(response.data);
        setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
        setOpenSuccess(false);
      } catch (error) {
        console.error(error);
  
      }

  };

  return (
    <div className="mt-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <CardBody>
              <div className="text-center mb-10 mt-6">
                <Typography variant="h5" color="blue-gray">
                    ménage
                </Typography>
                <Button onClick={getNumero} className="mt-10" variant="outlined" color="green" fullWidth={false}>
                    Génerer numéro ménage
                </Button>
              </div>
              <form onSubmit={postNouveau}>
                {/* Ligne pour les deux Inputs (Nom et Prénom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Input disabled={true} value={numero} type="text" color="green" size="md" outline={true} label="Numéro ménage" />
                  <Input onChange={(e) => setAdresse(e.target.value)} type="text" color="green" size="md" outline={true} label="adresse"/>
                </div>

                {/* Ligne pour les quatre Selects (Localisation) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-8">
                  <Select
                    value={selectedRegion}
                    selected={() => { return getRegionNameById(selectedRegion); }}
                    onChange={(e) => changeSelectRegion(e)}
                    label="Region"
                    name="Region"
                    size="md"
                    color="green"
                    variant="standard"
                  >
                    {dataRegion && dataRegion.map(({ id, nom }) => (
                      <Option key={id} value={id}>{nom}</Option>
                    ))}
                  </Select>
                
                  <Select
                    value={selectedDistrict}
                    selected={() => { return getDistrictNameById(selectedDistrict); }}
                    onChange={(e) => changeSelectDistrict(e)}
                    label="District"
                    name="District"
                    size="md"
                    color="green"
                    variant="standard"
                  >
                    {dataDistrict && dataDistrict.map(({ id, nom }) => (
                      <Option key={id} value={id}>{nom}</Option>
                    ))}
                  </Select>
                
                  <Select
                    value={selectedCommune}
                    selected={() => { return getCommuneNameById(selectedCommune); }}
                    onChange={(e) => changeSelectCommune(e)}
                    label="Commune"
                    name="Commune"
                    size="md"
                    color="green"
                    variant="standard"
                  >
                    {dataCommune && dataCommune.map(({ id, nom }) => (
                      <Option key={id} value={id}>{nom}</Option>
                    ))}
                  </Select>
                
                  <Select
                    value={selectedFokontany}
                    selected={() => { return getFokontanyNameById(selectedFokontany); }}
                    onChange={(e) => changeSelectFokontany(e)}
                    label="Fokontany"
                    name="IdFokontany"
                    size="md"
                    color="green"
                    variant="standard"
                  >
                    {dataFokontany && dataFokontany.map(({ id, nom }) => (
                      <Option key={id} value={id}>{nom}</Option>
                    ))}
                  </Select>
                </div>
                <hr className="mt-8"/>
                <div className="text-center mb-8 mt-6">
                    <Typography variant="h5" color="blue-gray">
                        individu(s)
                    </Typography>
                </div>
                {rows.map((row) => (
                    <div key={row.id} className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-10 mt-8 border-2 rounded">
                        <Input onChange={(e) => handleInputChange(row.id, "nom", e.target.value)} type="text" size="md" color="green" outline={true} label="Nom" />
                        <Input onChange={(e) => handleInputChange(row.id, "prenom", e.target.value)} type="text" size="md" color="green" outline={true} label="Prénom" />
                        <Input onChange={(e) => handleInputChange(row.id, "dateNaissance", e.target.value)} type="date" size="md" color="green" outline={true} label="Date de naissance" />
                        <div className="flex gap-5">
                            <Radio
                              name="StatutDepart"
                              value={1}
                              onChange={(e) => handleInputChange(row.id, "sexe", e.target.value)}
                              color="green"
                              ripple={true}
                              className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                              label={
                                <Typography
                                  color="blue-gray"
                                  className="font-normal text-blue-gray-400"
                                >
                                  Homme
                                </Typography>
                              }
                            />
                            <Radio
                              name="StatutDepart"
                              value={0}
                              onChange={(e) => handleInputChange(row.id, "sexe", e.target.value)}
                              color="green"
                              ripple={true}
                              className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                              label={
                                <Typography
                                  color="blue-gray"
                                  className="font-normal text-blue-gray-400"
                                >
                                  Femme
                                </Typography>
                              }
                            />
                        </div>
                        <Input onChange={(e) => handleInputChange(row.id, "acteNaissance", e.target.value)} type="text" size="md" color="green" outline={true} label="numéro acte de naissance" />
                        <Input onChange={(e) => handleInputChange(row.id, "cin", e.target.value)} type="text" size="md" color="green" outline={true} label="CIN" />
                        <Switch defaultValue={1} onChange={(e) => handleInputChange(row.id, "chef", e.target.checked ? "1" : "-1")} label="Chef?" color="green" defaultChecked />
                        <Button
                          variant="gradient"
                          color="red"
                          className="w-10 h-10 flex items-center justify-center"
                          type="button"
                          onClick={() => handleRemoveRow(row.id)}
                          disabled={rows.length === 1} // Empêche de supprimer la dernière ligne
                        >
                          -
                        </Button>
                    </div>
                ))}

                {/* Bouton pour ajouter une nouvelle ligne */}
                <div className="mt-8">
                  <Button variant="gradient" color="green" type="Button" onClick={handleAddRow}>
                    +
                  </Button>
                </div>
                
                {/* Bouton de soumission */}
                <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5">
                  <Button variant="gradient" color="indigo" type="submit" fullWidth={false}>
                    Enregistrer
                  </Button>
                </div>
               </form>
              </CardBody>
            </Card>
          </div>

          <Dialog open={openError} handler={handleOpenError} size="md" className="bg-transparent">
          <Card color="red" className="w-full text-center flex justify-center opacity-[75%]">
            <ExclamationCircleIcon className="h-10 w-10 m-auto mt-5" color="white"/>
            <Typography variant="h3" color="white" className="mt-5">Une erreur s&apos;est produite</Typography>
            <Typography variant="paragraph" color="white" className="mt-5 mb-5">{errorMessage}</Typography>
          </Card>
        </Dialog>

        <Dialog open={openSuccess} handler={handleOpenSuccess} size="sm" className="bg-transparent">
          <Card color="green" className="w-full text-center flex justify-center opacity-[75%]">
            <CheckCircleIcon className="h-10 w-10 m-auto mt-5 mb-5" color="white"/>
          </Card>
        </Dialog>
    </div>
  );
}

export default NouveauMenage;
