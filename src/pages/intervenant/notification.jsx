import {useEffect, useState} from "react";
import { api_url } from "@/configs/api-url";
import {
  Typography,
  Card,
  CardBody,
  Input,
  Button,
  Dialog,
  Textarea,
} from "@material-tailwind/react";
import {
    CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function Notification() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Objet: '',
    Corps: '',
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
  useEffect(() => {
    checkToken();
    }, [navigate]);

    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [openSuccess, setOpenSuccess] = useState(false);
    const handleOpenSuccess = () => setOpenSuccess(!open);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (formData.Objet == '' || formData.Corps == '') {
        setErrorMessage('Veuillez remplir tous les champs.');
        setOpen(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpen(false);
        return;
      }

      const apiUrl = `${api_url}/api/Email/notifier`; 
    
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

  return (
    <div className="mt-12">
      <div className="text-center mb-12">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Notification
                </Typography>
              </div>
              <CardBody>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div className="flex flex-col gap-12">
                    <Input value={formData.Objet} onChange={handleChange} type="text" label="Objet" name="Objet" color="green" variant="standard"/>
                    <Textarea value={formData.Corps} onChange={handleChange} label="Corps" name="Corps" color="green"/>
                  </div>
                  <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5">
                    <Button variant="gradient" color="indigo" type="submit" fullWidth={false}>
                      Notifier
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
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

export default Notification;
