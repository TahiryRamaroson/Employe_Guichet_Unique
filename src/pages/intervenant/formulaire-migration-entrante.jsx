import {useEffect, useState, useRef} from "react";
import Webcam from 'react-webcam';
import {
  Typography,
  Card,
  CardBody,
  Select,
  Option,
  Radio,
  Input,
  Button,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import {
  CameraIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ViewfinderCircleIcon} from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function FormMigrationEntrante() {

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

    const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const webcamRef = useRef(null);

  const handleOpen = () => setOpen(!open);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedImage(imageSrc);

    // Convert the base64 image to a file
    const byteString = atob(imageSrc.split(',')[1]);
    const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], 'webcam-photo.jpg', { type: mimeString });

    // Create a new DataTransfer to add the file to the input
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    document.getElementById('fileInput').files = dataTransfer.files;
  };

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

  return (
    <div className="mt-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Migration Entrante
                </Typography>
              </div>
              <CardBody>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-12">
                    <Select label="Individu" name="newMarque" size="lg" color="green" variant="standard">
                        <Option value="">Koto</Option>
                        <Option value="">Bema</Option>
                    </Select>
                    <Select label="Motif de la migration" name="newMar" size="lg" color="green" variant="standard">
                        <Option value="">Etude</Option>
                        <Option value="">Urgence familiale</Option>
                    </Select>
                    <div className="flex gap-10">
                      <Typography
                        color="blue-gray"
                        className="font-normal text-blue-gray-400 mt-2"
                      >
                        Statut de résidence
                      </Typography>
                      <Radio
                        name="type"
                        color="green"
                        ripple={true}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                          <Typography
                            color="blue-gray"
                            className="font-normal text-blue-gray-400"
                          >
                            Temporaire
                          </Typography>
                        }
                      />
                      <Radio
                        name="type"
                        color="green"
                        ripple={true}
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                          <Typography
                            color="blue-gray"
                            className="font-normal text-blue-gray-400"
                          >
                            Permanent
                          </Typography>
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-12">
                    <Input size="lg" label="Date d'arrivée" color="green" variant="standard" type="date"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-12">
                        <Select label="Region origine" name="newMar" size="lg" color="green" variant="standard">
                            <Option value="">Analamanga</Option>
                        </Select>
                        <Select label="Commune d'origine" name="newMarq" size="lg" color="green" variant="standard">
                            <Option value="">Analamanga</Option>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-12">
                        <Select label="District d'origine" name="newMarqu" size="lg" color="green" variant="standard">
                            <Option value="">Analamanga</Option>
                        </Select>
                        <Select label="Fokotany d'origine" name="newMarque" size="lg" color="green" variant="standard">
                            <Option value="">Analamanga</Option>
                        </Select>
                      </div>
                    </div>
                    <Input size="lg" label="Date prévue de rentrée" color="green" variant="standard" type="date"/>
                  </div>
                  <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5">
                    <Button onClick={handleOpen} variant="gradient" className="mr-5">
                      <CameraIcon className="h-5 w-5"/>
                    </Button>
                    <Dialog open={open} handler={handleOpen} className="bg-green">
                      <DialogBody>
                        {open && <Webcam ref={webcamRef} className="rounded"/>}
                        <div className="col-span-1 md:col-span-3 flex justify-center mt-5 mb-5">
                        <Button onClick={capture} variant="gradient" className="rounded-full" color="green">
                          <ViewfinderCircleIcon className="h-5 w-5"/>
                        </Button>
                        </div>
                      </DialogBody>
                    </Dialog>
                    <Input onChange={handleImageChange} size="lg" label="Pièce justificative" color="green" type="file" variant="standard" accept="image/*" capture="user" id="fileInput"/>
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

export default FormMigrationEntrante;
