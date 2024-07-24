import React, {useEffect, useState} from "react";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";
import { StatisticsCard } from "@/widgets/cards";
import { UsersIcon, UserGroupIcon, MapPinIcon} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NumberFormatter from "@/widgets/layout/number-formatter";

export function Accueil() {

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        
          <StatisticsCard
            title="Nombre d'utilisateur"
            color="green"
            icon={React.createElement(UsersIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={15} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de ménage"
            color="green"
            icon={React.createElement(UserGroupIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={9251} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de Commune dans la base de recensement"
            color="green"
            icon={React.createElement(MapPinIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={42} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de Fokontany dans la base de recensement"
            color="green"
            icon={React.createElement(MapPinIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={42} /></strong>
              </Typography>
            }
          />
      </div>
    </div>
  );
}

export default Accueil;
