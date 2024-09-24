import {useEffect, useState} from "react";
import { api_url } from "@/configs/api-url";
import {
  Typography,
  Card,
  CardBody,
  Select,
  Option,
  Textarea,
  Button,
  Dialog
} from "@material-tailwind/react";
import { ChevronLeftIcon} from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export function FormPlainte() {

  const navigate = useNavigate();

  const storedMenage = JSON.parse(sessionStorage.getItem('menage'));

  const [dataVictime, setDataVictime] = useState([]);
  const [formData, setFormData] = useState({
    Description: '',
    Victime: null,
    FokontanyFait: storedMenage.fokontany.id,
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

  const getVictime = async () => {
  
    const apiVictime = `${api_url}/api/Plaintes/victime/${storedMenage.id}`; 
    console.log("apiVictime :", apiVictime);
    try {
      const reponseVictime = await fetch(apiVictime, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseVictime.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseVictime.json();
      setDataVictime(data);
      console.log("dataVictime après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  useEffect(() => {
    checkToken();
    getVictime();
    }, [navigate]);

  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [openSuccess, setOpenSuccess] = useState(false);
  const handleOpenSuccess = () => setOpenSuccess(!open);

  const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (formData.Description == '' || formData.Victime == null) {
        setErrorMessage('Veuillez remplir tous les champs.');
        setOpen(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpen(false);
        return;
      }

      const apiUrl = `${api_url}/api/Plaintes`; 
    
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
    
        const responseData = await response.json();
  
        if (responseData.error) {
          setErrorMessage(responseData.error);
          setOpen(true);
          await new Promise(r => setTimeout(r, 2000));
          setOpen(false);
          return;
        }

        setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
        setOpenSuccess(false);
  
      } catch (error) {
        alert('Erreur lors de la connexion, veuillez réessayer')
        console.error('Erreur lors de la connexion :', error.message);
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(name, value);
  };  

  const changeSelectVictime = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Victime: value,
    }));
  };

  const getVictimeNameById = (id) => {
    const Victime = dataVictime.find(Victime => Victime.id === id);
    return Victime ? Victime.nom + " " + Victime.prenom : '';
  };

  return (
    <div className="mt-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Plaintes
                </Typography>
              </div>
              <CardBody>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div className="flex flex-col gap-12">
                    <Select selected={() =>{return getVictimeNameById(formData.Victime)}} onChange={(e) => changeSelectVictime(e)} label="Victime" name="Victime" size="lg" color="green" variant="standard">
                                {dataVictime && dataVictime.map(({id, nom, prenom}) => (
                                  <Option key={id} value={id}>{nom} {prenom}</Option>
                                ))};
                    </Select>
                    <Textarea value={formData.Description} onChange={handleChange} name="Description" label="Description" color="green"/>
                  </div>
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

          <Dialog open={open} handler={handleOpen} size="md" className="bg-transparent">
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

export default FormPlainte;
