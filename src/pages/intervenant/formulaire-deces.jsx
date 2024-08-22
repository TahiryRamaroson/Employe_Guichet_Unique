import React, {useEffect, useState, useRef} from "react";
import Webcam from 'react-webcam';
import {
  Typography,
  Card,
  CardBody,
  Select,
  Option,
  Input,
  Button,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import {
  CameraIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";
import { ChevronLeftIcon, ViewfinderCircleIcon} from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NumberFormatter from "@/widgets/layout/number-formatter";

export function FormDeces() {
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

  const webcamRef = useRef(null);

  const takePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    console.log('Photo taken:', photo);
    setSelectedImage(photo);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  return (
    <div className="mt-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Décès
                </Typography>
              </div>
              <CardBody>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-12">
                    <Select label="Défunt" name="newMarque" size="lg" color="green" variant="standard">
                        <Option value="">Koto</Option>
                        <Option value="">Bema</Option>
                    </Select>
                    <Input size="lg" label="Age" color="green" variant="standard"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Input size="lg" label="Date de décès" color="green" variant="standard" type="date"/>
                    <Select label="Cause du décès" name="newMarque" size="lg" color="green" variant="standard">
                        <Option value="">Cancer</Option>
                        <Option value="">Accident</Option>
                    </Select>
                    
                  </div>
                  <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5">
                  <Button onClick={handleOpen} variant="gradient" className="mr-5">
                    <CameraIcon className="h-5 w-5"/>
                  </Button>
                  <Dialog open={open} handler={handleOpen} className="bg-green">
                    <DialogBody>
                      {open && <Webcam ref={webcamRef} className="rounded"/>}
                      <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5">
                      <Button onClick={takePhoto} variant="gradient" className="rounded-full" color="green">
                        <ViewfinderCircleIcon className="h-5 w-5"/>
                      </Button>
                      </div>
                    </DialogBody>
                  </Dialog>
                  
                    <Input size="lg" label="Pièce justificative (faire part, acte de décès,...)" color="green" type="file" variant="standard" accept="image/*" capture="user" onChange={handleImageChange}/>
                  </div>
                  {selectedImage && <img src={selectedImage} alt="Selected" className="rounded"/>}
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

export default FormDeces;
