import { api_url } from "@/configs/api-url";
import axios from "axios";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Select, 
    Option,
    Chip,
    SpeedDial,
    SpeedDialAction,
    SpeedDialContent,
    SpeedDialHandler,
    IconButton,
    Checkbox,
    Tooltip,
    Drawer,
    Dialog
  } from "@material-tailwind/react";

import DateFormatter from "@/widgets/layout/date-formatter";

import {CheckIcon, XMarkIcon, ArrowUpTrayIcon, DocumentIcon, PhotoIcon, ArrowDownTrayIcon} from "@heroicons/react/24/solid";

import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
  
  export function ValidationMigrationEntrante() {

    const navigate = useNavigate();

    const [openExcel, setOpenExcel] = useState(false);
    const openDrawerExcel = () => setOpenExcel(true);
    const closeDrawerExcel = () => setOpenExcel(false);
    const [fileExcel, setFileExcel] = useState(null);

    const [openCSV, setOpenCSV] = useState(false);
    const openDrawerCSV = () => setOpenCSV(true);
    const closeDrawerCSV = () => setOpenCSV(false);
    const [fileCSV, setFileCSV] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const handleOpenError = () => setOpenError(!open);

    const [openSuccess, setOpenSuccess] = useState(false);
    const handleOpenSuccess = () => setOpenSuccess(!open);

    const [dataMotifMigration, setDataMotifMigration] = useState([]);
    const [dataMigrationEntrante, setDataMigrationEntrante] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFiltered, setIsFiltered] = useState(false);

    const [formFiltre, setFormFiltre] = useState({
      numeroMenage: '',
      motifMigration: -1,
      statutResidence: -1,
      statut: -1
    });

    const checkToken = () => {
      const token = sessionStorage.getItem('authToken');

      if (!token) {
        navigate('/auth/sign-in');
      }

      try {
        const decodedtoken = jwtDecode(token);
        const now = Date.now() / 1000;
        if(now > decodedtoken.exp || decodedtoken.profil != "Responsable guichet unique") {
          sessionStorage.removeItem('authToken');
          navigate('/auth/sign-in');
        }
      } catch (error) {
        sessionStorage.removeItem('authToken');
        navigate('/auth/sign-in');
      }

    };

    const downloadCSV = async () => {
      try {
        const response = await fetch(`${api_url}/api/MigrationEntrantes/export/csv`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
    
        if (!response.ok) {
          throw new Error('Erreur lors du téléchargement du fichier');
        }
    
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `migration_entrante_${new Date().toISOString()}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    const downloadExcel = async () => {
      try {
        const response = await fetch(`${api_url}/api/MigrationEntrantes/export/excel`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
    
        if (!response.ok) {
          throw new Error('Erreur lors du téléchargement du fichier');
        }
    
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `migration_entrante_${new Date().toISOString()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    const importCSV = async (event) => {
      event.preventDefault();
      if (!fileCSV) {
        alert('Veuillez sélectionner un fichier.');
        return;
      }
  
      const formData = new FormData();
      formData.append('Fichier', fileCSV);
  
      try {
        const response = await axios.post(`${api_url}/api/MigrationEntrantes/import/csv`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        if(response.data.error){
          setErrorMessage(response.data.error);
          setOpenError(true);
          await new Promise(r => setTimeout(r, 2000));
          setOpenError(false);
          return;
        }
        console.log('Réponse du serveur:', response.data);
        setOpenSuccess(true);
          await new Promise(r => setTimeout(r, 500));
        setOpenSuccess(false);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier:', error);
      }
    };

    const importExcel = async (event) => {
      event.preventDefault();
      if (!fileExcel) {
        alert('Veuillez sélectionner un fichier.');
        return;
      }
  
      const formData = new FormData();
      formData.append('Fichier', fileExcel);
  
      try {
        const response = await axios.post(`${api_url}/api/MigrationEntrantes/import/excel`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        if(response.data.error){
          setErrorMessage(response.data.error);
          setOpenError(true);
          await new Promise(r => setTimeout(r, 2000));
          setOpenError(false);
          return;
        }
        console.log('Réponse du serveur:', response.data);
        setOpenSuccess(true);
          await new Promise(r => setTimeout(r, 500));
        setOpenSuccess(false);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier:', error);
      }
    };

    const getMigrationEntrante = async (pageNumber) => {
  
      const apiMigrationEntrante = `${api_url}/api/MigrationEntrantes/page/${pageNumber}`; 

      try {
        const reponseMigrationEntrante = await fetch(apiMigrationEntrante, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        if (!reponseMigrationEntrante.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponseMigrationEntrante.json();
        setDataMigrationEntrante(data.migrationEntrante);
        setTotalPages(data.totalPages);
        console.log("dataMigrationEntrante après la mise à jour d'état :", data);
      } catch (error) {
        console.error("Error: " + error.message);
      }

    };

    const getFilteredMigrationEntrante = async (pageNumber) => {
    
      const apiFiltre = `${api_url}/api/MigrationEntrantes/filtre/page/${pageNumber}`;
  
      try {
        const response = await fetch(apiFiltre , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formFiltre),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
  
        const data = await response.json();
        console.log('Réponse de API Filtre :', data);
        setDataMigrationEntrante(data.migrationEntrante);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      }
    };

    const getMotifMigration = async () => {
  
      const apiMotifMigration = `${api_url}/api/MotifMigrations`; 

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

    const submitFiltre = async (e) => {
      e.preventDefault();

      setIsFiltered(true);
      setPageNumber(1);
    };

    const ValiderById = async (id) => {
  
      const apiValiderById = `${api_url}/api/MigrationEntrantes/valider/${id}`; 

      try {
        const reponseValiderById = await fetch(apiValiderById, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        if (!reponseValiderById.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponseValiderById.json();
        if(data.error){
          setErrorMessage(data.error);
          setOpenError(true);
          await new Promise(r => setTimeout(r, 2000));
          setOpenError(false);
          return;
        }
        setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
        setOpenSuccess(false);
        if (isFiltered) {
          getFilteredMigrationEntrante(pageNumber);
          getMotifMigration();
          } else {
          getMigrationEntrante(pageNumber);
          }
        console.log("dataValiderById après la mise à jour d'état :", data);
      } catch (error) {
        console.error("Error: " + error.message);
      }

    };

    const RefuserById = async (id) => {
  
      const apiRefuserById = `${api_url}/api/MigrationEntrantes/refuser/${id}`; 

      try {
        const reponseRefuserById = await fetch(apiRefuserById, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        if (!reponseRefuserById.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponseRefuserById.json();
        if(data.error){
          setErrorMessage(data.error);
          setOpenError(true);
          await new Promise(r => setTimeout(r, 2000));
          setOpenError(false);
          return;
        }
        setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
        setOpenSuccess(false);
        if (isFiltered) {
          getFilteredMigrationEntrante(pageNumber);
          getMotifMigration();
          } else {
          getMigrationEntrante(pageNumber);
          }
        console.log("dataRefuserById après la mise à jour d'état :", data);
      } catch (error) {
        console.error("Error: " + error.message);
      }

    };

    const Valider = async () => {
      const checkedIds = getCheckedIds();
      if (checkedIds.length === 0) {
        setErrorMessage('Veuillez sélectionner au moins un élément.');
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        return;
      }
    
      try {
        const response = await axios.put(`${api_url}/api/MigrationEntrantes/valider`, checkedIds, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        if(response.data.error){
          setErrorMessage(response.data.error);
          setOpenError(true);
          await new Promise(r => setTimeout(r, 2000));
          setOpenError(false);
          return;
        }
        setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
        setOpenSuccess(false);
        if (isFiltered) {
          getFilteredMigrationEntrante(pageNumber);
          getMotifMigration();
          } else {
          getMigrationEntrante(pageNumber);
          }
        setCheckedItems({})
        console.log('Réponse du serveur:', response.data);
      } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
      }
    };

    const Refuser = async () => {
      const checkedIds = getCheckedIds();
      if (checkedIds.length === 0) {
        setErrorMessage('Veuillez sélectionner au moins un élément.');
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        return;
      }
    
      try {
        const response = await axios.put(`${api_url}/api/MigrationEntrantes/refuser`, checkedIds, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        if(response.data.error){
          setErrorMessage(response.data.error);
          setOpenError(true);
          await new Promise(r => setTimeout(r, 2000));
          setOpenError(false);
          return;
        }
        setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
        setOpenSuccess(false);
        if (isFiltered) {
          getFilteredMigrationEntrante(pageNumber);
          getMotifMigration();
          } else {
          getMigrationEntrante(pageNumber);
          }
        setCheckedItems({})
        console.log('Réponse du serveur:', response.data);
      } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
      }
    };

    useEffect(() => {
      checkToken();
      getMotifMigration();
    }, [navigate]);

    useEffect(() => {
      if (isFiltered) {
        getFilteredMigrationEntrante(pageNumber);
        getMotifMigration();
        } else {
        getMigrationEntrante(pageNumber);
        }
    }, [pageNumber, isFiltered]);

    const handlePreviousPage = () => {
      setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
    };
      
    const handleNextPage = () => {
      setPageNumber((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const getMotifMigrationNameById = (id) => {
      const MotifMigration = dataMotifMigration.find(MotifMigration => MotifMigration.id === id);
      return MotifMigration ? MotifMigration.nom : '';
    };

    const changeFiltre = (e) => {
      const { name, value } = e.target;
      setFormFiltre({
        ...formFiltre,
        [name]: value,
      });
      console.log(formFiltre);
    };
  
    const changeFiltreSelectMotifMigration = (value) => {
      setFormFiltre((prevFormModif) => ({
        ...prevFormModif,
        motifMigration: value,
      }));
    };
  
    const changeFiltreSelectStatutResidence = (value) => {
      setFormFiltre((prevFormModif) => ({
        ...prevFormModif,
        statutResidence: value,
      }));
    };

    const changeFiltreSelectStatut = (value) => {
      setFormFiltre((prevFormModif) => ({
        ...prevFormModif,
        statut: value,
      }));
    };

    const resetFiltre = () => {
      setFormFiltre((prevFormFiltre) => ({
        ...prevFormFiltre,
        numeroMenage: '',
        motifMigration: -1,
        statutResidence: -1,
        statut: -1
      }));
      setIsFiltered(false);
      setPageNumber(1);
    };

    const getCheckedIds = () => {
      return Object.keys(checkedItems).filter(id => checkedItems[id]);
    };

    const [checkedItems, setCheckedItems] = useState(
      dataMigrationEntrante.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {})
    );

    const handleItemChange = (event) => {
      const { name, checked } = event.target;
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [name]: checked,
      }));
    };

    const handleFileCSVChange = (event) => {
      setFileCSV(event.target.files[0]);
    };

    const handleFileExcelChange = (event) => {
      setFileExcel(event.target.files[0]);
    };

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">

        <Drawer placement="right" open={openExcel} onClose={closeDrawerExcel} className="p-4 text-center">
            <div className="text-center">
              <Typography variant="h5" color="black">
                Migration Entrante
              </Typography>
            </div>
            <form onSubmit={importExcel} className="flex flex-col gap-6 p-4" encType="multipart/form-data">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Importer un fichier Excel
              </Typography>
              <Input name="Fichier" type="file" onChange={handleFileExcelChange} />
              <Button type="submit" color="green" variant="gradient" fullWidth={false}>Importer</Button>
            </form>
        </Drawer>

        <Drawer placement="right" open={openCSV} onClose={closeDrawerCSV} className="p-4 text-center">
            <div className="text-center">
              <Typography variant="h5" color="black">
                Migration Entrante
              </Typography>
            </div>
            <form onSubmit={importCSV} className="flex flex-col gap-6 p-4" encType="multipart/form-data">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Importer un fichier CSV
              </Typography>
              <Input name="Fichier" type="file" onChange={handleFileCSVChange} />
              <Button type="submit" color="green" variant="gradient" fullWidth={false}>Importer</Button>
            </form>
        </Drawer>

      <Card className="h-full w-full">
          <Typography
            variant="h1"
            color="black"
            className="mt-4 flex justify-center gap-1 text-4xl font-normal"
          >
            Validation des migrations entrante
          </Typography>

          <Card color="transparent" shadow={false} className="p-6 text-center mb-2">
            <div className="flex justify-center gap-4">
              <SpeedDial placement="left">
              <Tooltip placement="top" color="light" content="Exporter" delay={500}>
                <SpeedDialHandler>
                  <IconButton size="lg" className="rounded-full" color="gray">
                    <ArrowUpTrayIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </IconButton>
                </SpeedDialHandler>
              </Tooltip>
              <SpeedDialContent className="flex-row">
                <SpeedDialAction onClick={downloadExcel} className="h-16 w-16 hover:animate-pulse">
                  <DocumentIcon className="h-5 w-5" />
                  <Typography color="black" className="text-xs font-normal">
                    Excel
                  </Typography>
                </SpeedDialAction>
                <SpeedDialAction onClick={downloadCSV} className="h-16 w-16 hover:animate-pulse">
                  <DocumentIcon className="h-5 w-5" />
                  <Typography color="black" className="text-xs font-normal">
                    CSV
                  </Typography>
                </SpeedDialAction>
              </SpeedDialContent>
              </SpeedDial>
              <SpeedDial placement="right">
                <Tooltip placement="top" color="light" content="Importer" delay={500}>
                  <SpeedDialHandler>
                    <IconButton size="lg" className="rounded-full border-2" color="white">
                      <ArrowDownTrayIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                    </IconButton>
                  </SpeedDialHandler>
                </Tooltip>
                <SpeedDialContent className="flex-row">
                  <SpeedDialAction onClick={openDrawerExcel} className="h-16 w-16 hover:animate-pulse">
                    <DocumentIcon className="h-5 w-5" />
                    <Typography color="black" className="text-xs font-normal">
                      Excel
                    </Typography>
                  </SpeedDialAction>
                  <SpeedDialAction onClick={openDrawerCSV} className="h-16 w-16 hover:animate-pulse">
                    <DocumentIcon className="h-5 w-5" />
                    <Typography color="black" className="text-xs font-normal">
                      CSV
                    </Typography>
                  </SpeedDialAction>
                </SpeedDialContent>
              </SpeedDial>
            </div>
          </Card>

        <Card color="transparent" shadow={false} className="p-6">
        <form onSubmit={submitFiltre} className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="flex flex-col gap-4">
            <Input value={formFiltre.numeroMenage} onChange={changeFiltre} size="lg" label="Numéro ménage" name="numeroMenage" color="green"/>
            </div>
            <div className="flex flex-col gap-4">
            <Select
                color="green"
                label="Motif"
                name="motifMigration"
                size="lg"
                value={formFiltre.motifMigration}
                onChange={(e) => changeFiltreSelectMotifMigration(e)}
                selected={() =>{return getMotifMigrationNameById(formFiltre.motifMigration)}}
              >
                  {dataMotifMigration && dataMotifMigration.map(({id, nom}) => (
                    <Option key={id} value={id}>{nom}</Option>
                  ))};
              </Select>
            </div>
            <div className="flex flex-col gap-4">
            <Select selected={(element) =>
                {
                 if (element) {
                  const selectedValue = element.props.value;
                  if(selectedValue == 10) return "Permanent";
                  return "Temporaire";
                 }
                }
              } 
              value={formFiltre.statutResidence}
              onChange={(e) => changeFiltreSelectStatutResidence(e)}
              label="Statut de résidence" 
              name="statutResidence" 
              size="lg" 
              color="green">
                  <Option value={-10}>Temporaire</Option>
                  <Option value={10}>Permanent</Option>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
            <Select selected={(element) =>
                {
                 if (element) {
                  const selectedValue = element.props.value;
                  if(selectedValue == 0) return "En attente";
                  return "Validé";
                 }
                }
              } 
              value={formFiltre.statut}
              onChange={(e) => changeFiltreSelectStatut(e)}
              label="Statut" 
              name="statut" 
              size="lg" 
              color="green">
                  <Option value={5}>Validé</Option>
                  <Option value={0}>En attente</Option>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Button variant="outlined" color="green" className="border-2" type="submit" fullWidth={false}>
                Filtrer
              </Button>
              <Button onClick={resetFiltre} variant="gradient" color="red" type="button" fullWidth={false}>
                Réinitialiser
              </Button>
            </div>
          </form>
        </Card>

        <Card color="transparent" shadow={false} className="p-6">
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="mt-4 gap-1 font-normal"
          >
            Validation multiple
          </Typography>
          <span className="mt-3">
            <Tooltip content="valider">
              <Button onClick={() => Valider()} className="text-center ml-1" color="green" size="sm">
                <CheckIcon className="h-4 w-4" />
              </Button>
            </Tooltip>

            <Tooltip content="rejeter">
                <Button onClick={() => Refuser()} className="text-center ml-5" color="red" size="sm" variant="outlined">
                  <XMarkIcon className="h-4 w-4" />
                </Button>
            </Tooltip>
          </span>
        </Card>
      
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto" id="mydata">
          <thead>
            <tr>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Ancien ménage
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Nouveau ménage
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Individu
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Motif
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Date d&apos;arrivée
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Statut de résidence
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Date prévue de rentrée
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Pièce justificative
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Fokotany d&apos;origine
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Commune d&apos;origine
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    District d&apos;origine
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Région d&apos;origine
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Intervenant
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Responsable
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Statut
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                </th>
              
            </tr>
          </thead>
          <tbody>
          {dataMigrationEntrante && dataMigrationEntrante.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Checkbox 
                        ripple={true}
                        id={`checkbox${item.id}`}
                        name={item.id.toString()}
                        checked={checkedItems[item.id]}
                        onChange={handleItemChange}
                        disabled={item.statut == 5 ? true : false} 
                      />
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.ancienMenage ? item.ancienMenage.numeroMenage : ''} 
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.nouveauMenage ? item.nouveauMenage.numeroMenage : ''} 
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.individu ? item.individu.nom : ''} {item.individu ? item.individu.prenom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.motifMigration ? item.motifMigration.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <DateFormatter date={item.dateArrivee}/>
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.statutResidence === -10 ? 'Temporaire' : 'Permanent'}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                        
                        {item.dateRentree == null ? (
                          <span></span>
                        ) : (
                          <DateFormatter date={item.dateRentree} />
                        )}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                            <Tooltip placement="top" color="light" content={<img src={item.pieceJustificative} style={{ width: '225px', height: '200px' }}/>} >
                              <PhotoIcon className="h-5 w-5 m-auto" />
                            </Tooltip>
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.ancienMenage.fokontany ? item.ancienMenage.fokontany.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.ancienMenage.fokontany.commune ? item.ancienMenage.fokontany.commune.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.ancienMenage.fokontany.commune.district ? item.ancienMenage.fokontany.commune.district.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.ancienMenage.fokontany.commune.district.region ? item.ancienMenage.fokontany.commune.district.region.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.intervenant ? item.intervenant.nom : ''} {item.intervenant ? item.intervenant.prenom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.responsable ? item.responsable.nom : ''} {item.responsable ? item.responsable.prenom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Chip
                            variant="ghost"
                            color={item.statut == 5 ? 'green' : 'amber'}
                            size="sm"
                            value={item.statut == 5 ? 'Validé' : 'En attente'}
                          />
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Tooltip content="valider">
                          <Button onClick={() => ValiderById(item.id)} disabled={item.statut == 5 ? true : false} className="text-center ml-5" color="green" size="sm">
                            <CheckIcon className="h-4 w-4" />
                          </Button>
                      </Tooltip>

                      <Tooltip content="rejeter">
                          <Button onClick={() => RefuserById(item.id)} disabled={item.statut == 5 ? true : false} className="text-center ml-5" color="red" size="sm" variant="outlined">
                            <XMarkIcon className="h-4 w-4" />
                          </Button>
                      </Tooltip>
                    </td>

                  </tr>
                  ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {pageNumber} sur {totalPages === 0 ? 1 : totalPages}
          </Typography>
          <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={handlePreviousPage} disabled={pageNumber === 1}>
            Précédent
          </Button>
          <Button variant="outlined" size="sm" onClick={handleNextPage} disabled={pageNumber === totalPages}>
            Suivant
          </Button>
          </div>
        </CardFooter>
    </Card>

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
  
  export default ValidationMigrationEntrante;
  