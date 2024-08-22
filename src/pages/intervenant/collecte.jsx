import React, {useEffect, useState} from "react";
import {
  Typography,
  Card,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function Collecte() {

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
    <div className="mt-12">
      <div className="text-center mb-12">
        <Typography variant="h3" color="black">
            Choix du ménage
        </Typography>
      </div>
      <div className="mb-6 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-1">
          <form>
            <div className="flex gap-4">
              <Input size="lg" label="Numéro ménage" color="green"/>
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
                  Chef de ménage: Rabe Koto
                </Typography>
                <Typography className="mb-4">
                  CIN: 145823475
                </Typography>
                <Typography className="mb-4">
                  Fokontany: Kianja
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
    </div>
  );
}

export default Collecte;
