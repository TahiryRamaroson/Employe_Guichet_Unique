import React, {useEffect, useState} from "react";
import {
  Typography,
  Card,
  CardBody,
  Select,
  Option,
  Input,
  Button,
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NumberFormatter from "@/widgets/layout/number-formatter";

export function FormNaissance() {

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
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Naissance
                </Typography>
              </div>
              <CardBody>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-12">
                    <Input size="lg" label="Nom du nouveau né" color="green" variant="standard"/>
                    <Input size="lg" label="Date de naissance" color="green" type="date" variant="standard"/>
                    <Input size="lg" label="Numéro de l'acte de naissance" color="green" variant="standard"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Input size="lg" label="Prénom(s) du nouveau né" color="green" variant="standard"/>
                    <Input size="lg" label="Lieu de naissance" color="green" variant="standard"/>
                    <Input size="lg" label="Pièce justificative" color="green" type="file" variant="standard"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Select label="Sexe" name="newMarque" size="lg" color="green" variant="standard">
                        <Option value="">Masculin</Option>
                        <Option value="">Féminin</Option>
                    </Select>
                    <Select label="Père" name="newMarque" size="lg" color="green" variant="standard">
                        <Option value="">Koto</Option>
                        <Option value="">Bema</Option>
                    </Select>
                    <Select label="Mère" name="newMarque" size="lg" color="green" variant="standard">
                        <Option value="">Soa</Option>
                        <Option value="">Fara</Option>
                    </Select>
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
    </div>
  );
}

export default FormNaissance;
