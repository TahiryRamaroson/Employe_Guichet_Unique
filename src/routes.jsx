import {
  ServerStackIcon,
  RectangleStackIcon,
  ArrowPathRoundedSquareIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import { Collecte, Visualisation, VisualisationNaissance, VisualisationGrossesse, VisualisationDeces, VisualisationPlainte, VisualisationMigrationEntrante, VisualisationMigrationSortante, Module, FormNaissance, FormGrossesse, FormPlainte, FormDeces, FormMigrationEntrante, FormMigrationSortante} from "@/pages/intervenant";
import { Planning, ValidationNaissance, ValidationGrossesse, ValidationDeces, ValidationPlainte, ValidationMigrationEntrante, ValidationMigrationSortante} from "@/pages/responsable";
import { SignIn, SignUp } from "@/pages/auth";
import { ExclamationTriangleIcon, FaceSmileIcon, ArrowDownOnSquareIcon, ArrowUpOnSquareIcon, ChatBubbleOvalLeftEllipsisIcon, CalendarDaysIcon, CalendarIcon } from "@heroicons/react/24/outline";

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
        icon: <TableCellsIcon {...icon} />,
        name: "Visualisation des migrations entrante",
        path: "/visualisation-migration-entrante",
        element: <VisualisationMigrationEntrante />,
        op: "none",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Visualisation des migrations sortante",
        path: "/visualisation-migration-sortante",
        element: <VisualisationMigrationSortante />,
        op: "none",
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
        icon: <CalendarIcon {...icon} />,
        name: "Planning GU",
        path: "/planning",
        element: <Planning />,
        op: "",
      },
      {
        icon: <FaceSmileIcon {...icon} />,
        name: "Naissane",
        path: "/validation-naissance",
        element: <ValidationNaissance />,
        op: "",
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Grossesse",
        path: "/validation-grossesse",
        element: <ValidationGrossesse />,
        op: "",
      },
      {
        icon: <ExclamationTriangleIcon {...icon} />,
        name: "Décès",
        path: "/validation-deces",
        element: <ValidationDeces />,
        op: "",
      },
      {
        icon: <ArrowDownOnSquareIcon {...icon} />,
        name: "Migration Entrante",
        path: "/validation-migration-entrante",
        element: <ValidationMigrationEntrante />,
        op: "",
      },
      {
        icon: <ArrowUpOnSquareIcon {...icon} />,
        name: "Migration Sortante",
        path: "/validation-migration-sortante",
        element: <ValidationMigrationSortante />,
        op: "",
      },
      {
        icon: <ChatBubbleOvalLeftEllipsisIcon {...icon} />,
        name: "Plainte",
        path: "/validation-plainte",
        element: <ValidationPlainte />,
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
