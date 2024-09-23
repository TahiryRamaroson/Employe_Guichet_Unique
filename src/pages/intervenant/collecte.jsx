import {useEffect, useState} from "react";
import { api_url } from "@/configs/api-url";
import {
  Typography,
  Card,
  CardBody,
  Input,
  Button,
  Dialog,
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function Collecte() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numeroMenage: '',
  });
  const [menage, setMenage] = useState({});

  useEffect(() => {
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

    checkToken();
    }, [navigate, menage]);

    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const apiUrl = `${api_url}/api/Menages/numero/${formData.numeroMenage}`; 
    
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
    
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
    
        const responseData = await response.json();
  
        if (responseData.error) {
          setErrorMessage(responseData.error);
          setOpen(true);
        } else {
          sessionStorage.setItem("menage", JSON.stringify(responseData));
          setMenage(responseData);
          console.log(menage); // Utilisez l'objet menage comme nécessaire
        }
  
      } catch (error) {
        alert('Erreur lors de la connexion, veuillez réessayer')
        console.error('Erreur lors de la connexion :', error.message);
      }
    };

    useEffect(() => {
      // Récupérer l'objet menage depuis le sessionStorage lors du montage du composant
      const storedMenage = JSON.parse(sessionStorage.getItem('menage'));
      if (storedMenage) {
        setMenage(storedMenage);
      }
    }, []);

  return (
    <div className="mt-12">
      <div className="text-center mb-12">
        <Typography variant="h3" color="black">
            Choix du ménage
        </Typography>
      </div>
      <div className="mb-6 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-1">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <Input size="lg" label="Numéro ménage" name="numeroMenage" color="green" value={formData.numeroMenage} onChange={handleChange}/>
              <Button variant="outlined" color="green" className="border-2" type="submit">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <div className="flex justify-center">
            <Card className="mt-6 w-96 flex justify-center">
              <CardBody>
                <InformationCircleIcon className="h-10 w-10 mb-5 m-auto" color="green"/>
                <Typography className="mb-4">
                  Chef de ménage: {menage.individu ? menage.individu.nom : ''} {menage.individu ? menage.individu.prenom : ''}
                </Typography>
                <Typography className="mb-4">
                  CIN: {menage.individu ? menage.individu.cin : ''}
                </Typography>
                <Typography className="mb-4">
                  Fokontany: {menage.fokontany ? menage.fokontany.nom : ''}
                </Typography>
              </CardBody>
            </Card>
          </div>
          <div className="flex justify-end mt-5">
            <Link to="/intervenant/module">
              <Button className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <span className="ml-2">Suivant</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
      </div>
        <Dialog open={open} handler={handleOpen} size="md" className="bg-transparent">
          <Card color="red" className="w-full text-center flex justify-center opacity-[75%]">
            <ExclamationCircleIcon className="h-10 w-10 m-auto mt-5" color="white"/>
            <Typography variant="h3" color="white" className="mt-5">Une erreur s&apos;est produite</Typography>
            <Typography variant="paragraph" color="white" className="mt-5 mb-5">{errorMessage}</Typography>
          </Card>
        </Dialog>
    </div>
  );
}

export default Collecte;
