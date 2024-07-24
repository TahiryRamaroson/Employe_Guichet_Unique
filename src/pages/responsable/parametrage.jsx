import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function Parametrage() {

  const navigate = useNavigate();

  // useEffect(() => {
  //   // Fonction pour vérifier la présence du token dans le localStorage
  //   const checkToken = () => {
  //     const token = localStorage.getItem('authToken');

  //     if (!token) {
  //       navigate('/auth/sign-in');
  //     }

  //     try {
  //       const decodedtoken = jwtDecode(token);
  //       const now = Date.now() / 1000;
  //       if(now > decodedtoken.exp) localStorage.removeItem('authToken');
  //     } catch (error) {
  //       localStorage.removeItem('authToken');
  //       navigate('/auth/sign-in');
  //     }

  //   };

  //   // Appel de la fonction de vérification lors du chargement de la page
  //   checkToken();
  //   }, []);

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 mb-10 place-items-center">

    <Link to="/dashboard/utilisateur"> 
      <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-8">
        <CardBody
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Utilisateur
          </Typography>
        </CardBody>
      </Card>
    </Link>

    <Link to="/dashboard/profil">
      <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-8">
        <CardBody
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Profil
          </Typography>
        </CardBody>
      </Card>
    </Link>

    </div>
    
  );
}

export default Parametrage;
