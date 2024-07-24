import {
  ServerStackIcon,
  RectangleStackIcon,
  CogIcon,
  HomeIcon,
  ArrowPathRoundedSquareIcon,
  UserGroupIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import { Accueil, Historique, Utilisateur, Profil} from "@/pages/intervenant";
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
        icon: <HomeIcon {...icon} />,
        name: "Accueil",
        path: "/accueil",
        element: <Accueil />,
        op: "",
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Gestion d'utilisateur",
        path: "/utilisateur",
        element: <Utilisateur />,
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
    ],
  },
  {
    layout: "responsable",
    pages: [
      {
        icon: <CogIcon {...icon} />,
        name: "Paramétrage",
        path: "/parametrage",
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
