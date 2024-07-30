import {
  ServerStackIcon,
  RectangleStackIcon,
  HomeIcon,
  ArrowPathRoundedSquareIcon,
  IdentificationIcon,
  ArrowsRightLeftIcon,
  FaceSmileIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { Collecte, Historique, NaissanceIntervenant, Profil, Module, FormNaissance, FormGrossesse, FormPlainte} from "@/pages/intervenant";
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
        icon: <FaceSmileIcon {...icon} />,
        name: "Naissance",
        path: "/naissance",
        element: <NaissanceIntervenant />,
        op: "",
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
