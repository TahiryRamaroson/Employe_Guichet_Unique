import {
  Card,
  CardBody,
  Input,
  CardHeader,
  CardFooter,
  Typography,
  Button,
  Select,
  Option,
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
  Tooltip,
  Carousel,

} from "@material-tailwind/react";

import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import DateFormatter from "@/widgets/layout/date-formatter";

export function Historique() {

  // const navigate = useNavigate();
    

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="h-full w-full">
      <Typography
            variant="h1"
            color="black"
            className="mt-6 mb-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Historique de l&apos;utilisation de l&apos;application
          </Typography>
        
        <form>
          <div className="ml-10 mr-10 flex flex-col items-center justify-between gap-4 md:flex-row">
                              
            <Input label="Utilisateur"
            name="nom"
            value=""
            />

            <Select label="Action"
            >
              <Option value="">test</Option>
            </Select>

            <Select label="Module"
            >
              <Option value="">test</Option>
            </Select>

            <Input label="Date"
            name="nom"
            value=""
            type="date"
            />

            <Button variant="outlined" type="submit" className="rounded-full border-2" color="green">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Button>
                              
          </div>
        </form>
      
      <CardBody className="overflow-scroll px-0">
        <table className="mt-6 w-full min-w-max table-auto">
          <thead>
            <tr>
              
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Utilisateur
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Profil
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Module
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Action
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Date
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Url
                  </Typography>
                </th>
              
            </tr>
          </thead>
          <tbody>
                  <tr>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Rabe
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Admin
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Questionnaire
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Modification
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <DateFormatter date="2024-07-22" />

                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            http://localhost:5173/dashboard/historique
                          </Typography>
                    </td>
                    

                  </tr>
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 ">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 sur 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Précédent
          </Button>
          <Button variant="outlined" size="sm">
            Suivant
          </Button>
        </div>
      </CardFooter>
      </Card>
    </div>
  );
}

export default Historique;
