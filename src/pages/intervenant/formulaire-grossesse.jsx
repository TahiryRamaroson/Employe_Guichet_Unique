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
  Progress,
  Dialog,
  DialogBody
} from "@material-tailwind/react";
import {
  CameraIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ViewfinderCircleIcon} from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function FormGrossesse() {

  const navigate = useNavigate();

  const [selectedAntecedents, setSelectedAntecedents] = useState([]);
  const [complication, setComplication] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');

  const [openError, setOpenError] = useState(false);
  const handleOpenError = () => setOpenError(!open);

  const [openSuccess, setOpenSuccess] = useState(false);
  const handleOpenSuccess = () => setOpenSuccess(!open);

  const [dataMere, setDataMere] = useState([]);
  const [dataAntecedentMedicaux, setDataAntecedentMedicaux] = useState([]);

  const storedMenage = JSON.parse(sessionStorage.getItem('menage'));
  const token = sessionStorage.getItem('authToken');
  const decodedtoken = jwtDecode(token);

  const [formData, setFormData] = useState({
    AgeMere: null,
    DerniereRegle: '',
    DateAccouchement: '',
    PieceJustificative: '',
    Statut: 0,
    StatutGrossesse: 0,
    IdMere: null,
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

  const getMere = async () => {
  
    const apiMere = `${api_url}/api/Grossesses/mere/${storedMenage.id}`; 
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

  const getAntecedentMedicaux = async () => {
  
    const apiAntecedentMedicaux = `${api_url}/api/AntecedentMedicaux`; 
    try {
      const reponseAntecedentMedicaux = await fetch(apiAntecedentMedicaux, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseAntecedentMedicaux.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseAntecedentMedicaux.json();
      setDataAntecedentMedicaux(data);
      console.log("dataAntecedentMedicaux après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.AgeMere == null || formData.DateAccouchement == '' || 
      formData.DerniereRegle == '' || formData.IdMere == null || formData.PieceJustificative == ''
    ) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setOpenError(true);
      await new Promise(r => setTimeout(r, 2000));
      setOpenError(false);
    }

    const foData = new FormData();
    foData.append('AgeMere', formData.AgeMere);
    foData.append('PieceJustificative', formData.PieceJustificative);
    foData.append('DerniereRegle', formData.DerniereRegle);
    foData.append('DateAccouchement', formData.DateAccouchement);
    if(selectedAntecedents.length != 0) foData.append('AntecedentMedicaux', selectedAntecedents);
    foData.append('RisqueComplication', complication);
    foData.append('Statut', formData.Statut);
    foData.append('StatutGrossesse', formData.StatutGrossesse);
    foData.append('IdMere', formData.IdMere);
    foData.append('IdIntervenant', formData.IdIntervenant);

    try {
      const response = await axios.post(`${api_url}/api/Grossesses`, foData, {
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
    getMere();
    getAntecedentMedicaux();
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
    const filename = `grossesse-pj-photo-${timestamp}.jpg`;
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
  const [isAccouchementDisabled, setIsAccouchementDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if(name === 'DerniereRegle') {
      const dateDerniereRegle = new Date(value);
      const dateAccouchement = new Date(dateDerniereRegle.setMonth(dateDerniereRegle.getMonth() + 9));
      const dateAccouchementString = dateAccouchement.toISOString().split('T')[0];
      setFormData((prevState) => ({
        ...prevState,
        DateAccouchement: dateAccouchementString,
      }));
      setIsAccouchementDisabled(value !== '');
    }
  };

  const handleChangeAntecedent = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedAntecedents(selectedValues);
    setComplication(selectedValues.length * 10);
    console.log("selectedAntecedents-------------------------------------- :", selectedAntecedents);
  };

  const changeSelectMere = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      IdMere: value,
    }));
    calculateAge(getDateNaissanceById(value));
    setIsAgeDisabled(value !== '');
  };

  const getMereNameById = (id) => {
    const mere = dataMere.find(mere => mere.id === id);
    return mere ? mere.nom + " " + mere.prenom : '';
  };

  const getDateNaissanceById = (id) => {
    const Mere = dataMere.find(Mere => Mere.id === id);
    console.log("Mere.dateNaissance-------------------------------------- :", Mere.dateNaissance);
    return Mere ? Mere.dateNaissance : '';
  };

  const calculateAge = (dateNaissance) => {
    if (dateNaissance) {
      const birthDate = new Date(dateNaissance);
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      const monthDifference = now.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && now.getDate() < birthDate.getDate())) {
        age--;
      }
      console.log("age-------------------------------------- :", age);
      setFormData((prevState) => ({
        ...prevState,
        AgeMere: age,
      }));
    }
  };

  return (
    <div className="mt-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Grossesse
                </Typography>
              </div>
              <CardBody>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6" encType="multipart/form-data">
                  <div className="flex flex-col gap-12">
                    <Select value={formData.IdMere} selected={() =>{return getMereNameById(formData.IdMere)}} onChange={(e) => changeSelectMere(e)} label="Mère" name="IdMere" size="lg" color="green" variant="standard">
                                {dataMere && dataMere.map(({id, nom, prenom}) => (
                                  <Option key={id} value={id}>{nom} {prenom}</Option>
                                ))};
                    </Select>
                    <Input value={formData.DerniereRegle} onChange={handleChange} name="DerniereRegle" size="lg" label="Date des dernières règles (DDR)" color="green" type="date" variant="standard"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Input disabled={isAgeDisabled} value={formData.AgeMere} onChange={handleChange} type="number" name="AgeMere" size="lg" label="Age de la mère" color="green" variant="standard"/>
                    <Input disabled={isAccouchementDisabled} value={formData.DateAccouchement} onChange={handleChange} name="DateAccouchement" size="lg" label="Date prévue d'accouchement (DPA)" color="green" type="date" variant="standard"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Typography variant="small" color="gray" className="mt-[5%]">
                      Antécédents médicaux
                    </Typography>
                      <select value={selectedAntecedents} onChange={handleChangeAntecedent} className="block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 mt-[-10%]" multiple>
                                {dataAntecedentMedicaux && dataAntecedentMedicaux.map(({id, nom}) => (
                                  <option key={id} value={id}>{nom}</option>
                                ))};
                      </select>
                  </div>
                  <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5 mt-[5%]">
                    <Typography variant="small" color="gray"> Risque de complication</Typography>
                    <Progress value={complication} size="lg" color="red" className="border border-gray-900/10 bg-gray-900/5 p-1"/>
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
                      <Input onChange={handleImageChange} name="PieceJustificative" size="lg" label="Pièce justificative (Carnet conforme et certifié par le médecin)" color="green" type="file" variant="standard" accept="image/*" capture="user" id="fileInput"/>
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

export default FormGrossesse;
