import React, {useEffect, useState} from "react";
import {
  Typography,
  Card,
  CardBody,
  Select,
  Option,
  Input,
  Button,
  Progress
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";
import { ChevronLeftIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NumberFormatter from "@/widgets/layout/number-formatter";

export function FormGrossesse() {

  return (
    <div className="mt-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Grossesse
                </Typography>
              </div>
              <CardBody>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-12">
                    <Select label="Mère" name="newMarque" size="lg" color="green" variant="standard">
                        <Option value="">Soa</Option>
                        <Option value="">Fara</Option>
                    </Select>
                    <Input size="lg" label="Date des dernières règles (DDR)" color="green" type="date" variant="standard"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Input size="lg" label="Age de la mère" color="green" variant="standard"/>
                    <Input size="lg" label="Date prévue d'accouchement (DPA)" color="green" type="date" variant="standard"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Input size="lg" label="Pièce justificatif (Carnet conforme et certifié par le médecin)" color="green" type="file" variant="standard"/>
                    <Typography variant="small" color="gray">
                      Antécédents médicaux
                      <select className="block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500" multiple>
                          <option value="koto">Fausse couche</option>
                          <option value="bema">Fausse couche</option>
                          <option value="koto">Fausse couche</option>
                          <option value="bema">Fausse couche</option>
                          <option value="koto">Fausse couche</option>
                          <option value="bema">Fausse couche</option>
                      </select>
                    </Typography>
                    
                  </div>
                  <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5">
                    <Typography variant="small" color="gray"> Risque de complication</Typography>
                    <Progress value={20} size="lg" color="red" className="border border-gray-900/10 bg-gray-900/5 p-1"/>
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

export default FormGrossesse;
