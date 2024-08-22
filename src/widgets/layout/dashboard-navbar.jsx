import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Chip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";
import { PowerIcon } from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const logout = () => {
    sessionStorage.removeItem("authToken");
  };

  var token = sessionStorage.getItem("authToken");
  var profil, utilisateur;

  if (token) {
    const decodedtoken = jwtDecode(token);
    const now = Date.now() / 1000;
    if(now > decodedtoken.exp) sessionStorage.removeItem('authToken');
    console.log(decodedtoken);
    profil = decodedtoken.profil;
    utilisateur = decodedtoken.sub;
  }

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <Chip variant="ghost" value={utilisateur} color="green" className="mr-5" icon={<UserCircleIcon/>} />
          <Chip variant="ghost" value={profil} color="teal" className="mr-5" />
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="/auth/sign-in">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex normal-case"
              onClick={logout}
            >
              <PowerIcon className="h-8 w-8 text-red-500" />
              <Typography variant="paragraph" color="blue-gray">Déconnexion</Typography>
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <PowerIcon className="h-5 w-5 text-red-500" />
            </IconButton>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
