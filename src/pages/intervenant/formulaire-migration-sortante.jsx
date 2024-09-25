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
} from "@material-tailwind/react";
import {
  CameraIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ViewfinderCircleIcon} from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function FormMigrationSortante() {

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const [openError, setOpenError] = useState(false);
  const handleOpenError = () => setOpenError(!open);

  const [openSuccess, setOpenSuccess] = useState(false);
  const handleOpenSuccess = () => setOpenSuccess(!open);

  const storedMenage = JSON.parse(sessionStorage.getItem('menage'));
  const token = sessionStorage.getItem('authToken');
  const decodedtoken = jwtDecode(token);

  const [dataIndividu, setDataIndividu] = useState([]);
  const [dataMotifMigration, setDataMotifMigration] = useState([]);
  const [dataRegion, setDataRegion] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataCommune, setDataCommune] = useState([]);
  const [dataFokontany, setDataFokontany] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);

  const [formData, setFormData] = useState({
    DateDepart: '',
    Destination: -10,
    StatutDepart: 10,
    DureeAbsence: null,
    NouveauMenage: 10,
    Adresse: '',
    PieceJustificative: '',
    Statut: 0,
    IdMotifMigration: null,
    IdIndividu: null,
    IdFokontanyDestination: null,
    IdIntervenant: +decodedtoken.idutilisateur,
  });

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

  const getIndividu = async () => {
  
    const apiIndividu = `${api_url}/api/MigrationSortantes/individu/${storedMenage.id}`; 
    console.log("apiIndividu :", apiIndividu);
    try {
      const reponseIndividu = await fetch(apiIndividu, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseIndividu.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseIndividu.json();
      setDataIndividu(data);
      console.log("dataIndividu après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getMotifMigration = async () => {
  
    const apiMotifMigration = `${api_url}/api/MotifMigrations`; 
    console.log("apiMotifMigration :", apiMotifMigration);
    try {
      const reponseMotifMigration = await fetch(apiMotifMigration, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseMotifMigration.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseMotifMigration.json();
      setDataMotifMigration(data);
      console.log("dataMotifMigration après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.StatutDepart == null || formData.DateDepart == '' || 
      formData.IdMotifMigration == null || formData.IdIndividu == null || formData.PieceJustificative == ''
    ) {
      setErrorMessage('Veuillez remplir les champs obligatoires.');
      setOpenError(true);
      await new Promise(r => setTimeout(r, 2000));
      setOpenError(false);
    }

    const foData = new FormData();
    foData.append('DateDepart', formData.DateDepart);
    foData.append('Destination', formData.Destination);
    foData.append('StatutDepart', formData.StatutDepart);
    if(formData.DureeAbsence != null) foData.append('DureeAbsence', formData.DureeAbsence);
    foData.append('NouveauMenage', formData.NouveauMenage);
    if(formData.Adresse != '') foData.append('Adresse', formData.Adresse);
    foData.append('PieceJustificative', formData.PieceJustificative);
    foData.append('Statut', formData.Statut);
    foData.append('IdMotifMigration', formData.IdMotifMigration);
    foData.append('IdIndividu', formData.IdIndividu);
    if(formData.IdFokontanyDestination != null) foData.append('IdFokontanyDestination', formData.IdFokontanyDestination);
    foData.append('IdIntervenant', formData.IdIntervenant);

    try {
      const response = await axios.post(`${api_url}/api/MigrationSortantes`, foData, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          'Content-Type': 'multipart/form-data'
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

  useEffect(() => {
    checkToken();
    getIndividu();
    getMotifMigration();
    getRegion();
    }, [navigate]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const webcamRef = useRef(null);

  const handleOpen = () => setOpen(!open);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedImage(imageSrc);

    // Convert the base64 image to a file
    const byteString = atob(imageSrc.split(',')[1]);
    const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.]/g, '');
    const filename = `migration-sortante-pj-photo-${timestamp}.jpg`;
    const file = new File([blob], filename, { type: mimeString });
    formData.PieceJustificative = file;

    // Create a new DataTransfer to add the file to the input
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    document.getElementById('fileInput').files = dataTransfer.files;
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    formData.PieceJustificative = event.target.files[0];
  };

  const [isNouveauMenageDisabled, setIsNouveauMenageDisabled] = useState(false);
  const [isAdresseDisabled, setIsAdresseDisabled] = useState(false);
  const [isLieuDestinationDisabled, setIsLieuDestinationDisabled] = useState(false);
  const [isDureeAbsenceDisabled, setIsDureeAbsenceDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    console.log(name, value);
  
    if (name === "StatutDepart") {
      if (value == -10) {
        setFormData((prevState) => ({
          ...prevState,
          NouveauMenage: -10,
          Adresse: '',
        }));
        setIsNouveauMenageDisabled(true);
        setIsAdresseDisabled(true);
        setIsDureeAbsenceDisabled(false);
      } else if (value == 10) {
        if (formData.Destination == -10) {
          setIsNouveauMenageDisabled(false);
          setIsAdresseDisabled(false);
        }
        setFormData((prevState) => ({
          ...prevState,
          DureeAbsence: null,
        }));
        setIsDureeAbsenceDisabled(true);
      }
    } else if (name === "NouveauMenage") {
      if (value == -10) {
        setFormData((prevState) => ({
          ...prevState,
          Adresse: '',
        }));
        setIsAdresseDisabled(true);
      } else if (value == 10) {
        setIsAdresseDisabled(false);
      }
    } else if (name === "Destination") {
      if (value == 10) {
        setFormData((prevState) => ({
          ...prevState,
          NouveauMenage: -10,
          IdFokontanyDestination: null,
          Adresse: '',
        }));
        setDataFokontany([]);
        setSelectedCommune(null);
        setDataCommune([]);
        setSelectedDistrict(null);
        setDataDistrict([]);
        setSelectedRegion(null);
        setIsLieuDestinationDisabled(true);
        setIsNouveauMenageDisabled(true);
        setIsAdresseDisabled(true);
      } else if (value == -10) {
        setIsLieuDestinationDisabled(false);
        if(formData.StatutDepart == 10) setIsNouveauMenageDisabled(false);
        if(formData.NouveauMenage == 10) setIsAdresseDisabled(false);
      }
    }
  };

  const changeSelectIndividu = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      IdIndividu: value,
    }));
  };

  const changeSelectMotifMigration = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      IdMotifMigration: value,
    }));
  };

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      IdFokontanyDestination: value,
    }));
  };

  const getIndividuNameById = (id) => {
    const Individu = dataIndividu.find(Individu => Individu.id === id);
    return Individu ? Individu.nom + " " + Individu.prenom : '';
  };

  const getMotifMigrationNameById = (id) => {
    const MotifMigration = dataMotifMigration.find(MotifMigration => MotifMigration.id === id);
    return MotifMigration ? MotifMigration.nom : '';
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

  return (
    <div className="mt-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Migration Sortante
                </Typography>
              </div>
              <CardBody>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10" encType="multipart/form-data">
                  <div className="flex flex-col gap-12">
                    <Select value={formData.IdIndividu} selected={() =>{return getIndividuNameById(formData.IdIndividu)}} onChange={(e) => changeSelectIndividu(e)} label="Individu" name="IdIndividu" size="lg" color="green" variant="standard">
                                {dataIndividu && dataIndividu.map(({id, nom, prenom}) => (
                                  <Option key={id} value={id}>{nom} {prenom}</Option>
                                ))};
                    </Select>
                    <Select value={formData.IdMotifMigration} selected={() =>{return getMotifMigrationNameById(formData.IdMotifMigration)}} onChange={(e) => changeSelectMotifMigration(e)} label="Motif de la migration" name="IdMotifMigration" size="lg" color="green" variant="standard">
                                {dataMotifMigration && dataMotifMigration.map(({id, nom}) => (
                                  <Option key={id} value={id}>{nom}</Option>
                                ))};
                    </Select>
                    <div className="flex gap-10">
                      <Typography
                        color="blue-gray"
                        className="font-normal text-blue-gray-400 mt-2"
                      >
                        Statut de départ
                      </Typography>
                      <Radio
                        name="StatutDepart"
                        value={-10}
                        onChange={handleChange}
                        color="green"
                        ripple={true}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                          <Typography
                            color="blue-gray"
                            className="font-normal text-blue-gray-400"
                          >
                            Temporaire
                          </Typography>
                        }
                      />
                      <Radio
                        name="StatutDepart"
                        value={10}
                        onChange={handleChange}
                        defaultChecked
                        color="green"
                        ripple={true}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                          <Typography
                            color="blue-gray"
                            className="font-normal text-blue-gray-400"
                          >
                            Permanent
                          </Typography>
                        }
                      />
                    </div>
                    <div className="flex gap-10">
                      <Typography
                        color="blue-gray"
                        className="font-normal text-blue-gray-400 mt-2"
                      >
                        Nouveau ménage?
                      </Typography>
                      <Radio
                        name="NouveauMenage"
                        value={10}
                        onChange={handleChange}
                        checked={formData.NouveauMenage == 10}
                        defaultChecked
                        disabled={isNouveauMenageDisabled}
                        color="green"
                        ripple={true}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                          <Typography
                            color="blue-gray"
                            className="font-normal text-blue-gray-400"
                          >
                            Oui
                          </Typography>
                        }
                      />
                      <Radio
                        name="NouveauMenage"
                        value={-10}
                        onChange={handleChange}
                        disabled={isNouveauMenageDisabled}
                        checked={formData.NouveauMenage == -10}
                        color="green"
                        ripple={true}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                          <Typography
                            color="blue-gray"
                            className="font-normal text-blue-gray-400"
                          >
                            Non
                          </Typography>
                        }
                      />
                    </div>
                    <Input disabled={isAdresseDisabled} value={formData.Adresse} onChange={handleChange} size="lg" label="Adresse" name="Adresse" color="green" variant="standard"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Input value={formData.DateDepart} onChange={handleChange} size="lg" label="Date de départ" name="DateDepart" color="green" variant="standard" type="date"/>
                    <div className="flex gap-10">
                      <Typography
                        color="blue-gray"
                        className="font-normal text-blue-gray-400 mt-2"
                      >
                        Destination
                      </Typography>
                      <Radio
                        name="Destination"
                        value={-10}
                        onChange={handleChange}
                        defaultChecked
                        color="green"
                        ripple={true}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                          <Typography
                            color="blue-gray"
                            className="font-normal text-blue-gray-400"
                          >
                            national
                          </Typography>
                        }
                      />
                      <Radio
                        name="Destination"
                        value={10}
                        onChange={handleChange}
                        color="green"
                        ripple={true}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                          <Typography
                            color="blue-gray"
                            className="font-normal text-blue-gray-400"
                          >
                            international
                          </Typography>
                        }
                      />
                    </div>
                    
                    <div className="flex gap-8">
                      <Select value={selectedRegion} selected={() =>{return getRegionNameById(selectedRegion)}} onChange={(e) => changeSelectRegion(e)} disabled={isLieuDestinationDisabled} label="Region de destination" name="RegionDestination" size="lg" color="green" variant="standard">
                                {dataRegion && dataRegion.map(({id, nom}) => (
                                  <Option key={id} value={id}>{nom}</Option>
                                ))};
                      </Select>
                      <Select value={selectedDistrict} selected={() =>{return getDistrictNameById(selectedDistrict)}} onChange={(e) => changeSelectDistrict(e)} disabled={isLieuDestinationDisabled} label="District de destination" name="DistrictDestination" size="lg" color="green" variant="standard">
                                {dataDistrict && dataDistrict.map(({id, nom}) => (
                                  <Option key={id} value={id}>{nom}</Option>
                                ))};
                      </Select>
                    </div>
                    <div className="flex gap-8">
                      <Select value={selectedCommune} selected={() =>{return getCommuneNameById(selectedCommune)}} onChange={(e) => changeSelectCommune(e)} disabled={isLieuDestinationDisabled} label="Commune de destination" name="CommuneDestination" size="lg" color="green" variant="standard">
                                {dataCommune && dataCommune.map(({id, nom}) => (
                                  <Option key={id} value={id}>{nom}</Option>
                                ))};
                      </Select>
                      <Select value={formData.IdFokontanyDestination} selected={() =>{return getFokontanyNameById(formData.IdFokontanyDestination)}} onChange={(e) => changeSelectFokontany(e)} disabled={isLieuDestinationDisabled} label="Fokontany de destination" name="IdFokontanyDestination" size="lg" color="green" variant="standard">
                                {dataFokontany && dataFokontany.map(({id, nom}) => (
                                  <Option key={id} value={id}>{nom}</Option>
                                ))};
                      </Select>
                    </div>
                    
                    <div className="flex gap-8">
                        <Input disabled={isDureeAbsenceDisabled} value={formData.DureeAbsence} onChange={handleChange} size="lg" label="Durée de l'absence (mois)" name="DureeAbsence" type="number" color="green" variant="standard"/>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5">
                    <Button onClick={handleOpen} variant="gradient" className="mr-5">
                      <CameraIcon className="h-5 w-5"/>
                    </Button>
                    <Dialog open={open} handler={handleOpen} className="bg-green">
                      <DialogBody>
                        {open && <Webcam ref={webcamRef} className="rounded"/>}
                        <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5">
                        <Button onClick={capture} variant="gradient" className="rounded-full" color="green">
                          <ViewfinderCircleIcon className="h-5 w-5"/>
                        </Button>
                        </div>
                      </DialogBody>
                    </Dialog>
                    <Input onChange={handleImageChange} size="lg" label="Pièce justificative" name="PieceJustificative" color="green" type="file" variant="standard" accept="image/*" capture="user" id="fileInput"/>
                  </div>
                  {selectedImage && <img src={selectedImage} alt="Selected" className="rounded"/>}
                  <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5">
                    <Button variant="gradient" color="indigo" type="submit" fullWidth={false}>
                      Enregistrer
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
          <div className="flex justify-start mt-5 mb-5">
            <Link to="/intervenant/module">
              <Button className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="ml-2">Précédent</span>
              </Button>
            </Link>
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

export default FormMigrationSortante;
