import {useEffect, useState} from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from "axios";
import { api_url } from "@/configs/api-url";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Input,
  Button,
  Dialog,
  Tooltip,
  Checkbox,
  CardFooter,
} from "@material-tailwind/react";
import { useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import FokontanyName from "@/widgets/layout/fokontany-name";

export function MenageIndividu() {

  const navigate = useNavigate();

  const [dataMenage, setDataMenage] = useState([]);

  const [typeMenage, setTypeMenage] = useState("CSV");
  const [typeIndividu, setTypeIndividu] = useState("CSV");
  const [fileExcelMenage, setFileExcelMenage] = useState(null);
  const [fileExcelIndividu, setFileExcelIndividu] = useState(null);
  const [fileCSVMenage, setFileCSVMenage] = useState(null);
  const [fileCSVIndividu, setFileCSVIndividu] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const handleOpenError = () => setOpenError(!open);

    const [openSuccess, setOpenSuccess] = useState(false);
    const handleOpenSuccess = () => setOpenSuccess(!open);

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

  const importCSVMenage = async (event) => {
    event.preventDefault();
    if (!fileCSVMenage) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileCSVMenage);

    try {
      const response = await axios.post(`${api_url}/api/Menages/import/csv`, formData, {
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

  const importExcelMenage = async (event) => {
    event.preventDefault();
    if (!fileExcelMenage) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileExcelMenage);

    try {
      const response = await axios.post(`${api_url}/api/Menages/import/excel`, formData, {
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

  const importCSVIndividu = async (event) => {
    event.preventDefault();
    if (!fileCSVIndividu) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileCSVIndividu);

    try {
      const response = await axios.post(`${api_url}/api/Individus/import/csv`, formData, {
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

  const importExcelIndividu = async (event) => {
    event.preventDefault();
    if (!fileExcelIndividu) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileExcelIndividu);

    try {
      const response = await axios.post(`${api_url}/api/Individus/import/excel`, formData, {
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

  const getMenage = async (pageNumber) => {
  
    const apiMenage = `${api_url}/api/Menages/a-valide/${pageNumber}`; 

    try {
      const reponseMenage = await fetch(apiMenage, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseMenage.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseMenage.json();
      setDataMenage(data.menages);
      setTotalPages(data.totalPages);
      console.log("dataMenage après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const ValiderById = async (id) => {
  
    const apiValiderById = `${api_url}/api/Menages/valider/${id}`; 

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
      getMenage(pageNumber);
      console.log("dataValiderById après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const RefuserById = async (id) => {
  
    const apiRefuserById = `${api_url}/api/Menages/refuser/${id}`; 

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
      getMenage(pageNumber);
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
      const response = await axios.put(`${api_url}/api/Menages/valider`, checkedIds, {
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
      getMenage(pageNumber);
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
      const response = await axios.put(`${api_url}/api/Menages/refuser`, checkedIds, {
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
      getMenage(pageNumber);
      setCheckedItems({})
      console.log('Réponse du serveur:', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    }
  };

  useEffect(() => {
    checkToken();
    getMenage(pageNumber);
  }, [navigate, pageNumber]);

  const handleFileCSVChangeMenage = (event) => {
    setFileCSVMenage(event.target.files[0]);
  };

  const handleFileExcelChangeMenage = (event) => {
    setFileExcelMenage(event.target.files[0]);
  };

  const handleFileCSVChangeIndividu = (event) => {
    setFileCSVIndividu(event.target.files[0]);
  };

  const handleFileExcelChangeIndividu = (event) => {
    setFileExcelIndividu(event.target.files[0]);
  };
  
  const getCheckedIds = () => {
    return Object.keys(checkedItems).filter(id => checkedItems[id]);
  };

  const [checkedItems, setCheckedItems] = useState(
    dataMenage.reduce((acc, item) => {
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

  const handlePreviousPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };
    
  const handleNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="mt-12 mb-12">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 mb-10 place-items-center">
            <Card variant="gradient" className="w-[50%] max-w-[20rem] p-5 mt-6 rounded">
                <CardHeader contentCenter shadow={false} className="bg-transaparent mt-2">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="flex justify-center"
                    >
                      Importer des ménages
                    </Typography>
                </CardHeader>
              <CardBody
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
              >
                <Tabs value={typeMenage}>
                    <TabsHeader className="relative z-0">
                      <Tab value="CSV" onClick={() => setTypeMenage("CSV")}>
                        CSV
                      </Tab>
                      <Tab value="Excel" onClick={() => setTypeMenage("Excel")}>
                        Excel
                      </Tab>
                    </TabsHeader>
                    <TabsBody
                      className="!overflow-x-hidden !overflow-y-visible"
                      animate={{
                        initial: {
                          x: typeMenage === "CSV" ? 400 : -400,
                        },
                        mount: {
                          x: 0,
                        },
                        unmount: {
                          x: typeMenage === "CSV" ? 400 : -400,
                        },
                      }}
                    >
                      <TabPanel value="CSV" className="p-0">
                        <form onSubmit={importCSVMenage} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                              <Input
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="Fichier"
                                type="file"
                                onChange={handleFileCSVChangeMenage}
                              />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                      <TabPanel value="Excel" className="p-0">
                        <form onSubmit={importExcelMenage} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                                <Input
                                  size="lg"
                                  color="green"
                                  variant="standard"
                                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                  labelProps={{
                                    className: "before:content-none after:content-none",
                                  }}
                                  name="Fichier"
                                  type="file"
                                  onChange={handleFileExcelChangeMenage}
                                />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                    </TabsBody>
                </Tabs>
              </CardBody>
            </Card>
            <Card variant="gradient" className="w-[50%] max-w-[20rem] p-5 mt-6 rounded">
                <CardHeader contentCenter shadow={false} className="bg-transaparent mt-2">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="flex justify-center"
                    >
                      Importer des individus
                    </Typography>
                </CardHeader>
              <CardBody
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
              >
                <Tabs value={typeIndividu}>
                    <TabsHeader className="relative z-0">
                      <Tab value="CSV" onClick={() => setTypeIndividu("CSV")}>
                        CSV
                      </Tab>
                      <Tab value="Excel" onClick={() => setTypeIndividu("Excel")}>
                        Excel
                      </Tab>
                    </TabsHeader>
                    <TabsBody
                      className="!overflow-x-hidden !overflow-y-visible"
                      animate={{
                        initial: {
                          x: typeIndividu === "CSV" ? 400 : -400,
                        },
                        mount: {
                          x: 0,
                        },
                        unmount: {
                          x: typeIndividu === "CSV" ? 400 : -400,
                        },
                      }}
                    >
                      <TabPanel value="CSV" className="p-0">
                        <form onSubmit={importCSVIndividu} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                              <Input
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="Fichier"
                                type="file"
                                onChange={handleFileCSVChangeIndividu}
                              />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                      <TabPanel value="Excel" className="p-0">
                        <form onSubmit={importExcelIndividu} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                                <Input
                                  size="lg"
                                  color="green"
                                  variant="standard"
                                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                  labelProps={{
                                    className: "before:content-none after:content-none",
                                  }}
                                  name="Fichier"
                                  type="file"
                                  onChange={handleFileExcelChangeIndividu}
                                />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                    </TabsBody>
                </Tabs>
              </CardBody>
            </Card>
        </div>

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

        <Card>
        <CardBody className="overflow-scroll px-0 bg-white">
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
                    Numéro ménage
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
                    Adresse
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
                    Fokontany
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
                    Individu(s)
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                </th>
              
            </tr>
          </thead>
          <tbody>
          {dataMenage && dataMenage.map((item) => {
              const splittedMenage = item.menage.split(",");
              const splittedIndividu = item.individu.split(";");

              return (
                <tr key={item.id}>
                  <td className="p-4 border-b border-blue-gray-50 text-center">
                  <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Checkbox 
                        ripple={true}
                        id={`checkbox${item.id}`}
                        name={item.id.toString()}
                        checked={checkedItems[item.id]}
                        onChange={handleItemChange}
                      />
                    </td>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 text-center">
                    <Typography variant="paragraph" color="blue-gray" className="font-normal">
                      {splittedMenage[0]}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 text-start">
                    <Typography variant="paragraph" color="blue-gray" className="font-normal">
                      {splittedMenage[1]}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 text-start">
                    <Typography variant="paragraph" color="blue-gray" className="font-normal">
                      <FokontanyName fokontanyId={splittedMenage[2]} />
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 text-center">
                    <Typography variant="paragraph" color="blue-gray" className="font-normal">
                      {/* Tooltip avec contenu affiché sur une même ligne pour chaque individu */}
                      <Tooltip
                        placement="top"
                        color="light"
                        content={
                          splittedIndividu.map((individu, index) => {
                            const InfoIndividu = individu.split(",");
                            return (
                              <div key={index} className="flex"> {/* Utilisation de flex pour aligner les infos sur une ligne */}
                                {InfoIndividu.map((info, i) => (
                                  <span key={i} className="inline-block mx-1">{i === 3 ? (info === "1" ? "Homme" : "Femme") :
                                    i === 6 ? (info === "1" ? "Chef" : "Pas Chef") :
                                    info}</span>
                                ))}
                              </div>
                            );
                          })
                        }
                      >
                        <InformationCircleIcon className="h-5 w-5 m-auto" />
                      </Tooltip>
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 text-center">
                    <Tooltip content="valider">
                      <Button onClick={() => ValiderById(item.id)} className="text-center ml-5" color="green" size="sm">
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                      
                    <Tooltip content="rejeter">
                      <Button onClick={() => RefuserById(item.id)} className="text-center ml-5" color="red" size="sm" variant="outlined">
                        <XMarkIcon className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              );
          })}

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

export default MenageIndividu;
