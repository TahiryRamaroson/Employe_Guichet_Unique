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

export function FormMigrationEntrante() {

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
  const [dataOrigine, setDataOrigine] = useState(null);

  const [selectedInfo, setSelectedInfo] = useState(null);

  const [formData, setFormData] = useState({
    DateArrivee: '',
    StatutResidence: null,
    DateRentree: '',
    PieceJustificative: '',
    Statut: 0,
    IdIndividu: null,
    IdAncienMenage: null,
    IdNouveauMenage: storedMenage.id,
    IdMotifMigration: null,
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
  
    const apiIndividu = `${api_url}/api/MigrationEntrantes/individu/${storedMenage.id}`; 
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

      if (data.error) {
        setErrorMessage(data.error);
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        navigate('/intervenant/module');
      }

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.DateArrivee == '') {
      setErrorMessage('Veuillez remplir les champs obligatoires.');
      setOpenError(true);
      await new Promise(r => setTimeout(r, 2000));
      setOpenError(false);
      return;
    }

    const foData = new FormData();
    foData.append('DateArrivee', formData.DateArrivee);
    foData.append('StatutResidence', formData.StatutResidence);
    foData.append('DateRentree', formData.DateRentree);
    foData.append('PieceJustificative', formData.PieceJustificative);
    foData.append('Statut', formData.Statut);
    foData.append('IdIndividu', formData.IdIndividu);
    foData.append('IdAncienMenage', formData.IdAncienMenage);
    foData.append('IdNouveauMenage', formData.IdNouveauMenage);
    foData.append('IdMotifMigration', formData.IdMotifMigration);
    foData.append('IdIntervenant', formData.IdIntervenant);

    try {
      const response = await axios.post(`${api_url}/api/MigrationEntrantes`, foData, {
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
    const filename = `migration-entrante-pj-photo-${timestamp}.jpg`;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(name, value);
    console.log("formData après le changement de l'individu :", formData);
  };

  const [isMotifMigrationDisabled, setIsMotifMigrationDisabled] = useState(false);
  const [isStatutResidenceDisabled, setIsStatutResidenceDisabled] = useState(false);
  const [isDateRentreeDisabled, setIsDateRentreeDisabled] = useState(false);
  const [isLieuOrigineDisabled, setIsLieuOrigineDisabled] = useState(false);

  const changeSelectIndividu = (value) => {
    let info = getInfoByIdIndividu(value);
    let individu = getIndividuByIdIndividu(value);
    setDataOrigine(individu.menage.fokontany);
    if(info.statutDepart == -10) {
      let dateDepart = new Date(info.dateDepart);
      let dateR = new Date(dateDepart.setMonth(dateDepart.getMonth() + info.dureeAbsence));
      setFormData((prevFormData) => ({
        ...prevFormData,
        DateRentree: dateR.toISOString().split('T')[0],
      }));
    }
    setSelectedInfo(info);
    setFormData((prevFormData) => ({
      ...prevFormData,
      IdIndividu: value,
      IdMotifMigration: info ? info.idMotifMigration : null,
      StatutResidence: info ? info.statutDepart : null,
      IdAncienMenage: individu ? individu.menage.id : null,
    }));
    setIsMotifMigrationDisabled(true);
    setIsStatutResidenceDisabled(true);
    setIsDateRentreeDisabled(true);
    setIsLieuOrigineDisabled(true);
  };

  const getIndividuNameById = (id) => {
    const Info = dataIndividu.find(info => info.individu.id === id);
    return Info ? `${Info.individu.nom} ${Info.individu.prenom}` : '';
  };

  const getInfoByIdIndividu = (id) => {
    const Info = dataIndividu.find(info => info.individu.id === id);
    return Info ? Info.migrationSortante : '';
  };

  const getIndividuByIdIndividu = (id) => {
    const Info = dataIndividu.find(info => info.individu.id === id);
    return Info ? Info.individu : '';
  };

  const getMotifMigrationNameById = (id) => {
    const MotifMigration = dataMotifMigration.find(MotifMigration => MotifMigration.id === id);
    return MotifMigration ? MotifMigration.nom : '';
  };

  return (
    <div className="mt-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Migration Entrante
                </Typography>
              </div>
              <CardBody>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10" encType="multipart/form-data">
                  <div className="flex flex-col gap-12">
                    <Select value={formData.IdIndividu} selected={() =>{return getIndividuNameById(formData.IdIndividu)}} onChange={(e) => changeSelectIndividu(e)} label="Individu" name="IdIndividu" size="lg" color="green" variant="standard">
                      {dataIndividu && dataIndividu.map(({ individu }) => (
                        <Option key={individu.id} value={individu.id}>{individu.nom} {individu.prenom}</Option>
                      ))}
                    </Select>
                    <Select disabled={isMotifMigrationDisabled} value={formData.IdMotifMigration} selected={() =>{return getMotifMigrationNameById(formData.IdMotifMigration)}} label="Motif de la migration" name="MotifMigration" size="lg" color="green" variant="standard">
                                {dataMotifMigration && dataMotifMigration.map(({id, nom}) => (
                                  <Option key={id} value={id}>{nom}</Option>
                                ))};
                    </Select>
                    <div className="flex gap-10">
                      <Typography
                        color="blue-gray"
                        className="font-normal text-blue-gray-400 mt-2"
                      >
                        Statut de résidence
                      </Typography>
                      <Radio
                        name="StatutResidence"
                        value={-10}
                        checked={formData.StatutResidence == -10}
                        disabled={isStatutResidenceDisabled}
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
                        name="StatutResidence"
                        value={10}
                        checked={formData.StatutResidence == 10}
                        disabled={isStatutResidenceDisabled}
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
                  </div>
                  <div className="flex flex-col gap-12">
                    <Input value={formData.DateArrivee} onChange={handleChange} size="lg" label="Date d'arrivée" name="DateArrivee" color="green" variant="standard" type="date"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-12">
                        <Select disabled={isLieuOrigineDisabled} selected={dataOrigine?.commune?.district?.region?.nom || ''} value={dataOrigine?.commune?.district?.region?.nom || null} label="Region d'origine" name="RegionOrigine" size="lg" color="green" variant="standard">
                            <Option value={dataOrigine?.commune?.district?.region?.nom || ''}>{dataOrigine?.commune?.district?.region?.nom || ''}</Option>
                        </Select>
                        <Select disabled={isLieuOrigineDisabled} selected={dataOrigine?.commune?.nom || ''} value={dataOrigine?.commune?.nom || null} label="Commune d'origine" name="CommuneOrigine" size="lg" color="green" variant="standard">
                            <Option value={dataOrigine?.commune?.nom || ''}>{dataOrigine?.commune?.nom || ''}</Option>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-12">
                        <Select disabled={isLieuOrigineDisabled} selected={dataOrigine?.commune?.district?.nom || ''} value={dataOrigine?.commune?.district?.nom || null} label="District d'origine" name="DistrictOrigine" size="lg" color="green" variant="standard">
                            <Option value={dataOrigine?.commune?.district?.nom || ''}>{dataOrigine?.commune?.district?.nom || ''}</Option>
                        </Select>
                        <Select disabled={isLieuOrigineDisabled} selected={dataOrigine?.nom || ''} value={dataOrigine?.nom || null} label="Fokotany d'origine" name="FokontanyOrigine" size="lg" color="green" variant="standard">
                            <Option value={dataOrigine?.nom || ''}>{dataOrigine?.nom || ''}</Option>
                        </Select>
                      </div>
                    </div>
                    <Input disabled={isDateRentreeDisabled} value={formData.DateRentree} size="lg" label="Date prévue de rentrée" name="DateRentree" color="green" variant="standard" type="date"/>
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
                    <Input onChange={handleImageChange} size="lg" label="Pièce justificative" color="green" type="file" variant="standard" accept="image/*" capture="user" id="fileInput"/>
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

export default FormMigrationEntrante;
