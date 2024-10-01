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
} from "@material-tailwind/react";
import { useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export function MenageIndividu() {

  const navigate = useNavigate();

  const [typeMenage, setTypeMenage] = useState("CSV");
  const [typeIndividu, setTypeIndividu] = useState("CSV");
  const [fileExcelMenage, setFileExcelMenage] = useState(null);
  const [fileExcelIndividu, setFileExcelIndividu] = useState(null);
  const [fileCSVMenage, setFileCSVMenage] = useState(null);
  const [fileCSVIndividu, setFileCSVIndividu] = useState(null);

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

  useEffect(() => {
    checkToken();
  }, [navigate]);

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
