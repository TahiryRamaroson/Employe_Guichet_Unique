import {useEffect, useState, useRef} from "react";
import Webcam from 'react-webcam';
import axios from 'axios';
import { api_url } from "@/configs/api-url";
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

export function FormNaissance() {

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const [openError, setOpenError] = useState(false);
  const handleOpenError = () => setOpenError(!open);

  const [openSuccess, setOpenSuccess] = useState(false);
  const handleOpenSuccess = () => setOpenSuccess(!open);

  const [dataPere, setDataPere] = useState([]);
  const [dataMere, setDataMere] = useState([]);

  const storedMenage = JSON.parse(sessionStorage.getItem('menage'));
  const token = sessionStorage.getItem('authToken');
  const decodedtoken = jwtDecode(token);
  const [formData, setFormData] = useState({
    NomNouveauNe: '',
    PrenomNouveauNe: '',
    DateNaissance: '',
    NumActeNaissance: '',
    Sexe: null,
    Statut: 0,
    IdFokontany: storedMenage.fokontany.id,
    IdMenage: storedMenage.id,
    IdPere: null,
    IdMere: null,
    IdIntervenant: +decodedtoken.idutilisateur,
    IdResponsable: null,
    PieceJustificative: '',
  });
  console.log(formData);

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

  const getPere = async () => {
  
    const apiPere = `${api_url}/api/Naissances/pere/${storedMenage.id}`; 
    console.log("apiPere :", apiPere);
    try {
      const reponsePere = await fetch(apiPere, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponsePere.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponsePere.json();
      setDataPere(data);
      console.log("dataPere après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getMere = async () => {
  
    const apiMere = `${api_url}/api/Naissances/mere/${storedMenage.id}`; 
    console.log("apiMere :", apiMere);
    try {
      const reponseMere = await fetch(apiMere, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseMere.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseMere.json();
      if (data.error) {
        setErrorMessage(data.error);
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        navigate('/intervenant/module');
      }
      setDataMere(data);
      console.log("dataMere après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.NomNouveauNe == '' || formData.PrenomNouveauNe == '' || formData.Sexe == null || formData.IdPere == null ||
      formData.DateNaissance == '' || formData.PieceJustificative == '' || formData.email == '' || formData.IdMere == null
    ) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setOpenError(true);
      await new Promise(r => setTimeout(r, 2000));
      setOpenError(false);
    }

    const foData = new FormData();
    foData.append('NomNouveauNe', formData.NomNouveauNe);
    foData.append('PrenomNouveauNe', formData.PrenomNouveauNe);
    foData.append('DateNaissance', formData.DateNaissance);
    foData.append('NumActeNaissance', formData.NumActeNaissance);
    foData.append('Sexe', formData.Sexe);
    foData.append('PieceJustificative', formData.PieceJustificative);
    foData.append('Statut', formData.Statut);
    foData.append('IdFokontany', formData.IdFokontany);
    foData.append('IdMenage', formData.IdMenage);
    foData.append('IdPere', formData.IdPere);
    foData.append('IdMere', formData.IdMere);
    foData.append('IdIntervenant', formData.IdIntervenant);
    foData.append('IdResponsable', formData.IdResponsable);

    try {
      const response = await axios.post(`${api_url}/api/Naissances`, formData, {
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
    getPere();
    getMere();
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
    const filename = `naissance-pj-photo-${timestamp}.jpg`;
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
  };

  const changeSelectPere = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      IdPere: value,
    }));
  };

  const changeSelectMere = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      IdMere: value,
    }));
  };

  const getPereNameById = (id) => {
    const pere = dataPere.find(pere => pere.id === id);
    return pere ? pere.nom + " " + pere.prenom : '';
  };

  const getMereNameById = (id) => {
    const mere = dataMere.find(mere => mere.id === id);
    return mere ? mere.nom + " " + mere.prenom : '';
  };

  return (
    <div className="mt-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Naissance
                </Typography>
              </div>
              <CardBody>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6" encType="multipart/form-data">
                  <div className="flex flex-col gap-12">
                    <Input value={formData.NomNouveauNe} onChange={handleChange} size="lg" label="Nom du nouveau né" name="NomNouveauNe" color="green" variant="standard"/>
                    <Input value={formData.DateNaissance} onChange={handleChange} size="lg" label="Date de naissance" name="DateNaissance" color="green" type="date" variant="standard"/>
                    <Input value={formData.NumActeNaissance} onChange={handleChange} size="lg" label="Numéro de l'acte de naissance" name="NumActeNaissance" color="green" variant="standard"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Input value={formData.PrenomNouveauNe} onChange={handleChange} size="lg" label="Prénom(s) du nouveau né" name="PrenomNouveauNe" color="green" variant="standard"/>
                    <Select selected={(element) =>
                              {
                               if (element) {
                                const selectedValue = element.props.value;
                                formData.Sexe = selectedValue;
                                if(selectedValue == 0) return "Femme"
                                return "Homme";
                               }
                              }
                            } label="Sexe" name="Sexe" size="lg" color="green" variant="standard">
                        <Option value={1}>Homme</Option>
                        <Option value={0}>Femme</Option>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Select selected={() =>{return getPereNameById(formData.IdPere)}} onChange={(e) => changeSelectPere(e)} value={formData.IdPere} label="Père" name="IdPere" size="lg" color="green" variant="standard">
                                {dataPere && dataPere.map(({id, nom, prenom}) => (
                                  <Option key={id} value={id}>{nom} {prenom}</Option>
                                ))};
                    </Select>
                    <Select selected={() =>{return getMereNameById(formData.IdMere)}} onChange={(e) => changeSelectMere(e)} value={formData.IdMere} label="Mère" name="IdMere" size="lg" color="green" variant="standard">
                                {dataMere && dataMere.map(({id, nom, prenom}) => (
                                  <Option key={id} value={id}>{nom} {prenom}</Option>
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

export default FormNaissance;
