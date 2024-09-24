import {useEffect, useState, useRef} from "react";
import { api_url } from "@/configs/api-url";
import axios from "axios";
import Webcam from 'react-webcam';
import {
  Typography,
  Card,
  CardBody,
  Select,
  Option,
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

export function FormDeces() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const [openError, setOpenError] = useState(false);
  const handleOpenError = () => setOpenError(!open);

  const [openSuccess, setOpenSuccess] = useState(false);
  const handleOpenSuccess = () => setOpenSuccess(!open);

  const storedMenage = JSON.parse(sessionStorage.getItem('menage'));
  const token = sessionStorage.getItem('authToken');
  const decodedtoken = jwtDecode(token);

  const [dataDefunt, setDataDefunt] = useState([]);
  const [dataCauseDeces, setDataCauseDeces] = useState([]);
  const [formData, setFormData] = useState({
    AgeDefunt: null,
    DateDeces: '',
    PieceJustificative: '',
    Statut: 0,
    IdCauseDeces: null,
    IdDefunt: null,
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

  const getDefunt = async () => {
  
    const apiDefunt = `${api_url}/api/Deces/defunt/${storedMenage.id}`; 
    console.log("apiDefunt :", apiDefunt);
    try {
      const reponseDefunt = await fetch(apiDefunt, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseDefunt.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseDefunt.json();
      setDataDefunt(data);
      console.log("dataDefunt après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getCauseDeces = async () => {
  
    const apiCauseDeces = `${api_url}/api/CauseDeces`; 
    console.log("apiCauseDeces :", apiCauseDeces);
    try {
      const reponseCauseDeces = await fetch(apiCauseDeces, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseCauseDeces.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseCauseDeces.json();
      setDataCauseDeces(data);
      console.log("dataCauseDeces après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.AgeDefunt == null || formData.DateDeces == '' || 
      formData.IdCauseDeces == null || formData.IdDefunt == null || formData.PieceJustificative == ''
    ) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setOpenError(true);
      await new Promise(r => setTimeout(r, 2000));
      setOpenError(false);
    }

    const foData = new FormData();
    foData.append('AgeDefunt', formData.AgeDefunt);
    foData.append('DateDeces', formData.DateDeces);
    foData.append('PieceJustificative', formData.PieceJustificative);
    foData.append('Statut', formData.Statut);
    foData.append('IdCauseDeces', formData.IdCauseDeces);
    foData.append('IdDefunt', formData.IdDefunt);
    foData.append('IdIntervenant', formData.IdIntervenant);

    try {
      const response = await axios.post(`${api_url}/api/Deces`, formData, {
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
    getDefunt();
    getCauseDeces();
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
    const filename = `deces-pj-photo-${timestamp}.jpg`;
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

  const [isAgeDisabled, setIsAgeDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("formData après la mise à jour d'état :", formData);
    if (name === 'DateDeces') {
      calculateAge(value, getDateNaissanceById(formData.IdDefunt));
      setIsAgeDisabled(value !== '');
    }
  };

  const changeSelectDefunt = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      IdDefunt: value,
    }));
  };

  const changeSelectCauseDeces = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      IdCauseDeces: value,
    }));
  };

  const getDefuntNameById = (id) => {
    const Defunt = dataDefunt.find(Defunt => Defunt.id === id);
    return Defunt ? Defunt.nom + " " + Defunt.prenom : '';
  };

  const getCauseDecesNameById = (id) => {
    const CauseDeces = dataCauseDeces.find(CauseDeces => CauseDeces.id === id);
    return CauseDeces ? CauseDeces.nom : '';
  };

  const getDateNaissanceById = (id) => {
    const defunt = dataDefunt.find(Defunt => Defunt.id === id);
    return defunt ? defunt.dateNaissance : '';
  };

  const calculateAge = (dateDeces, dateNaissance) => {
    if (dateDeces && dateNaissance) {
      const birthDate = new Date(dateNaissance);
      const deathDate = new Date(dateDeces);
      let age = deathDate.getFullYear() - birthDate.getFullYear();
      const monthDifference = deathDate.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && deathDate.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData((prevState) => ({
        ...prevState,
        AgeDefunt: age,
      }));
    }
  };

  return (
    <div className="mt-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Décès
                </Typography>
              </div>
              <CardBody>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" encType="multipart/form-data">
                  <div className="flex flex-col gap-12">
                    <Select value={formData.IdDefunt} selected={() =>{return getDefuntNameById(formData.IdDefunt)}} onChange={(e) => changeSelectDefunt(e)} label="Défunt" name="IdDefunt" size="lg" color="green" variant="standard">
                                {dataDefunt && dataDefunt.map(({id, nom, prenom}) => (
                                  <Option key={id} value={id}>{nom} {prenom}</Option>
                                ))};
                    </Select>
                    <Input disabled={isAgeDisabled} value={formData.AgeDefunt} onChange={handleChange} name="AgeDefunt" type="number" size="lg" label="Age" color="green" variant="standard"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Input value={formData.DateDeces} onChange={handleChange} name="DateDeces" size="lg" label="Date de décès" color="green" variant="standard" type="date"/>
                    <Select value={formData.IdCauseDeces} selected={() =>{return getCauseDecesNameById(formData.IdCauseDeces)}} onChange={(e) => changeSelectCauseDeces(e)} label="Cause du décès" name="newMarque" size="lg" color="green" variant="standard">
                                {dataCauseDeces && dataCauseDeces.map(({id, nom}) => (
                                  <Option key={id} value={id}>{nom}</Option>
                                ))};
                    </Select>
                    
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
                  
                    <Input onChange={handleImageChange} size="lg" label="Pièce justificative (faire part, acte de décès,...)" name="PieceJustificative" color="green" type="file" variant="standard" accept="image/*" capture="user" id="fileInput"/>
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

export default FormDeces;
