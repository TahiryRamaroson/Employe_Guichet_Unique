import { api_url } from "@/configs/api-url";
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
    Tooltip
  } from "@material-tailwind/react";

import DateFormatter from "@/widgets/layout/date-formatter";

import {ArrowUpTrayIcon, DocumentIcon} from "@heroicons/react/24/solid";

import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
  
  export function VisualisationPlainte() {

    const navigate = useNavigate();

    const [dataCategoriePlainte, setDataCategoriePlainte] = useState([]);
    const [dataPlainte, setDataPlainte] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFiltered, setIsFiltered] = useState(false);

    const [formFiltre, setFormFiltre] = useState({
      numeroMenage: '',
      dateFait: null,
      idCategoriePlainte: -1,
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
        if(now > decodedtoken.exp || decodedtoken.profil != "Intervenant sociaux") {
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
        const response = await fetch(`${api_url}/api/Plaintes/export/csv`, {
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
        a.download = `plainte_${new Date().toISOString()}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    const downloadExcel = async () => {
      try {
        const response = await fetch(`${api_url}/api/Plaintes/export/excel`, {
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
        a.download = `plainte_${new Date().toISOString()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    const getPlainte = async (pageNumber) => {
  
      const apiPlainte = `${api_url}/api/Plaintes/page/${pageNumber}`; 

      try {
        const reponsePlainte = await fetch(apiPlainte, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        if (!reponsePlainte.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponsePlainte.json();
        setDataPlainte(data.plainte);
        setTotalPages(data.totalPages);
        console.log("dataPlainte après la mise à jour d'état :", data);
      } catch (error) {
        console.error("Error: " + error.message);
      }

    };

    const getFilteredPlainte = async (pageNumber) => {
    
      const apiFiltre = `${api_url}/api/Plaintes/filtre/page/${pageNumber}`;
  
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
        setDataPlainte(data.plainte);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      }
    };

    const getCategoriePlainte = async () => {
  
      const apiCategoriePlainte = `${api_url}/api/CategoriePlaintes`; 

      try {
        const reponseCategoriePlainte = await fetch(apiCategoriePlainte, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        if (!reponseCategoriePlainte.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponseCategoriePlainte.json();
        setDataCategoriePlainte(data);
        console.log("dataCategoriePlainte après la mise à jour d'état :", data);
      } catch (error) {
        console.error("Error: " + error.message);
      }

    };

    const submitFiltre = async (e) => {
      e.preventDefault();

      setIsFiltered(true);
      setPageNumber(1);
    };

    useEffect(() => {
      checkToken();
      getCategoriePlainte();
    }, [navigate]);

    useEffect(() => {
      if (isFiltered) {
        getFilteredPlainte(pageNumber);
        getCategoriePlainte();
        } else {
        getPlainte(pageNumber);
        }
    }, [pageNumber, isFiltered]);

    const handlePreviousPage = () => {
      setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
    };
      
    const handleNextPage = () => {
      setPageNumber((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const getCategoriePlainteNameById = (id) => {
      const CategoriePlainte = dataCategoriePlainte.find(CategoriePlainte => CategoriePlainte.id === id);
      return CategoriePlainte ? CategoriePlainte.nom : '';
    };

    const changeFiltre = (e) => {
      const { name, value } = e.target;
      setFormFiltre({
        ...formFiltre,
        [name]: value,
      });
      console.log(formFiltre);
    };
  
    const changeFiltreSelectCategoriePlainte = (value) => {
      setFormFiltre((prevFormModif) => ({
        ...prevFormModif,
        idCategoriePlainte: value,
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
        dateFait: null,
        idCategoriePlainte: -1,
        statut: -1
      }));
      setIsFiltered(false);
      setPageNumber(1);
    };

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
    <Card className="h-full w-full">
          <Typography
            variant="h1"
            color="black"
            className="mt-4 flex justify-center gap-1 text-4xl font-normal"
          >
            Visualisation des plaintes
          </Typography>

          <Card color="transparent" shadow={false} className="p-6 text-center mb-8">
            <SpeedDial placement="bottom">
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
                  <Typography color="blue-gray" className="text-xs font-normal">
                    Excel
                  </Typography>
                </SpeedDialAction>
                <SpeedDialAction onClick={downloadCSV} className="h-16 w-16 hover:animate-pulse">
                  <DocumentIcon className="h-5 w-5" />
                  <Typography color="blue-gray" className="text-xs font-normal">
                    CSV
                  </Typography>
                </SpeedDialAction>
              </SpeedDialContent>
            </SpeedDial>
          </Card>

        <Card color="transparent" shadow={false} className="p-6">
          <form onSubmit={submitFiltre} className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="flex flex-col gap-4">
            <Input value={formFiltre.numeroMenage} onChange={changeFiltre} size="lg" label="Numéro ménage" name="numeroMenage" color="green"/>
            </div>
            <div className="flex flex-col gap-4">
              <Input value={formFiltre.dateFait || ''} onChange={changeFiltre} size="lg" label="Date du fait" name="dateFait" color="green" type="date"/>
            </div>
            <div className="flex flex-col gap-4">
              <Select
                color="green"
                label="Catégorie"
                name="idCategoriePlainte"
                size="lg"
                value={formFiltre.idCategoriePlainte}
                onChange={(e) => changeFiltreSelectCategoriePlainte(e)}
                selected={() =>{return getCategoriePlainteNameById(formFiltre.idCategoriePlainte)}}
              >
                  {dataCategoriePlainte && dataCategoriePlainte.map(({id, nom}) => (
                    <Option key={id} value={id}>{nom}</Option>
                  ))};
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

        
      
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto" id="mydata">
          <thead>
            <tr>
              
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
                    Victime
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
                    Description
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
                    Catégorie
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
                    Date du fait
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
              
            </tr>
          </thead>
          <tbody>
          {dataPlainte && dataPlainte.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.victime.menage ? item.victime.menage.numeroMenage : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.victime ? item.victime.nom : ''} {item.victime ? item.victime.prenom : ''}
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.description}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.categoriePlainte ? item.categoriePlainte.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <DateFormatter date={item.dateFait} />
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
        
      </div>
    );
  }
  
  export default VisualisationPlainte;
  