import {
  ServerStackIcon,
  RectangleStackIcon,
  ArrowPathRoundedSquareIcon,
  IdentificationIcon,
  ArrowsRightLeftIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import { Collecte, Historique, Visualisation, VisualisationNaissance, VisualisationGrossesse, VisualisationDeces, VisualisationPlainte, Profil, Module, FormNaissance, FormGrossesse, FormPlainte, FormDeces, FormMigrationEntrante, FormMigrationSortante} from "@/pages/intervenant";
import { Parametrage} from "@/pages/responsable";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "intervenant",
    pages: [
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "Collecte",
        path: "/collecte",
        element: <Collecte />,
        op: "",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Visualisation",
        path: "/visualisation",
        element: <Visualisation />,
        op: "",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Visualisation des naissances",
        path: "/visualisation-naissance",
        element: <VisualisationNaissance />,
        op: "none",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Visualisation des grossesses",
        path: "/visualisation-grossesse",
        element: <VisualisationGrossesse />,
        op: "none",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Visualisation des décès",
        path: "/visualisation-deces",
        element: <VisualisationDeces />,
        op: "none",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Visualisation des plaintes",
        path: "/visualisation-plainte",
        element: <VisualisationPlainte />,
        op: "none",
      },
      {
        icon: <IdentificationIcon {...icon} />,
        name: "Gestion de profil",
        path: "/profil",
        element: <Profil />,
        op: "",
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "Historique",
        path: "/historique",
        element: <Historique />,
        op: "",
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "Module",
        path: "/module",
        element: <Module />,
        op: "none",
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "Formulaire des naissances",
        path: "/formulaire-naissance",
        element: <FormNaissance />,
        op: "none",
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "Formulaire des grossesses",
        path: "/formulaire-grossesse",
        element: <FormGrossesse />,
        op: "none",
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "Formulaire des plaintes",
        path: "/formulaire-plainte",
        element: <FormPlainte />,
        op: "none",
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "Formulaire des décès",
        path: "/formulaire-deces",
        element: <FormDeces />,
        op: "none",
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "Formulaire des migrations entrantes",
        path: "/formulaire-migration-entrante",
        element: <FormMigrationEntrante />,
        op: "none",
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "Formulaire des migrations Sortantes",
        path: "/formulaire-migration-sortante",
        element: <FormMigrationSortante />,
        op: "none",
      },
    ],
  },
  {
    layout: "responsable",
    pages: [
      {
        icon: <ArrowsRightLeftIcon {...icon} />,
        name: "Naissane",
        path: "/",
        element: <Parametrage />,
        op: "",
      },
      {
        icon: <ArrowsRightLeftIcon {...icon} />,
        name: "Grossesse",
        path: "/",
        element: <Parametrage />,
        op: "",
      },
      {
        icon: <ArrowsRightLeftIcon {...icon} />,
        name: "Décès",
        path: "/",
        element: <Parametrage />,
        op: "",
      },
      {
        icon: <ArrowsRightLeftIcon {...icon} />,
        name: "Migration",
        path: "/",
        element: <Parametrage />,
        op: "",
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
