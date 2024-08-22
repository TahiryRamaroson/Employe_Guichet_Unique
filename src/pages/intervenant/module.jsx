import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { ChevronLeftIcon} from "@heroicons/react/24/solid";
  import {useEffect} from "react";
  import { useNavigate, Link } from "react-router-dom";
  import { jwtDecode } from "jwt-decode";
  
  export function Module() {

    const navigate = useNavigate();

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
    }, [navigate]);
  
    return (
      <div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 mb-10 place-items-center">
  
      <Link to="/intervenant/formulaire-naissance"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-5 mt-6 rounded-none">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
          >
            <img src="/public/img/icon_naissance.svg" alt="." className="h-10 w-10" />
            
            <Typography
              variant="h1"
              color="white"
              className="flex justify-center gap-1 text-4xl font-normal ml-3"
            >
              Naissance
            </Typography>
          </CardBody>
        </Card>
      </Link>
  
      <Link to="/intervenant/formulaire-grossesse"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-5 mt-6 rounded-none">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
          >
            <img src="/public/img/icon_grossesse.svg" alt="." className="h-10 w-10" />
            
            <Typography
              variant="h1"
              color="white"
              className="flex justify-center gap-1 text-4xl font-normal ml-3"
            >
              Grossesse
            </Typography>
          </CardBody>
        </Card>
      </Link>

      <Link to="/intervenant/formulaire-migration-entrante"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-5 mt-6 rounded-none">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
          >
            <img src="/public/img/icon_migration.svg" alt="." className="h-10 w-10" />
            
            <Typography
              variant="h1"
              color="white"
              className="flex justify-center gap-1 text-4xl font-normal ml-3"
            >
              Migration entrante
            </Typography>
          </CardBody>
        </Card>
      </Link>

      <Link to="/intervenant/formulaire-migration-sortante"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-5 mt-6 rounded-none">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
          >
            <img src="/public/img/icon_migration.svg" alt="." className="h-10 w-10" />
            
            <Typography
              variant="h1"
              color="white"
              className="flex justify-center gap-1 text-4xl font-normal ml-3"
            >
              Migration sortante
            </Typography>
          </CardBody>
        </Card>
      </Link>

      <Link to="/intervenant/formulaire-deces"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-5 mt-6 rounded-none">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
          >
            <img src="/public/img/icon_deces.svg" alt="." className="h-10 w-10" />
            
            <Typography
              variant="h1"
              color="white"
              className="flex justify-center gap-1 text-4xl font-normal ml-3"
            >
              Décès
            </Typography>
          </CardBody>
        </Card>
      </Link>

      <Link to="/intervenant/formulaire-plainte"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-5 mt-6 rounded-none">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
          >
            <img src="/public/img/icon_plainte.svg" alt="." className="h-10 w-10" />
            
            <Typography
              variant="h1"
              color="white"
              className="flex justify-center gap-1 text-4xl font-normal ml-3"
            >
              Plainte
            </Typography>
          </CardBody>
        </Card>
      </Link>
  
      </div>

      <div className="flex justify-start mt-9 mb-5">
      <Link to="/intervenant/collecte">
        <Button className="flex items-center text-center border-2 me-2 mb-2" color="green" variant="outlined">
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="ml-2">Précédent</span>
        </Button>
      </Link>
      </div>
      </div>
    );
  }
  
  export default Module;
  