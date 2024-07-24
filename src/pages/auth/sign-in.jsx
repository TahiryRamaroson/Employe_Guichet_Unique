import {
  Input,
  Typography,
} from "@material-tailwind/react";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function SignIn() {
  const navigate = useNavigate();

  // État local pour suivre les valeurs du formulaire
  const [formData, setFormData] = useState({
    mail: 'admin@gmail.com',
    password: 'admin',
  });

  // Gestionnaire d'événement pour la saisie des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gestionnaire d'événement pour la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const apiUrl = "https://api-finalclouds5-production.up.railway.app/utilisateurs/admin/login"; 
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Vous pouvez ajouter des en-têtes supplémentaires si nécessaire, par exemple pour l'authentification
          // 'Authorization': 'Bearer ' + votreToken,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la demande.');
      }
  
      const responseData = await response.json();

    if (responseData.message == null) {
      alert('Email ou mot de passe incorrect');
      return navigate('/auth/sign-in');
    }
  
      const authToken = responseData.result.token;
      localStorage.setItem("authToken", authToken);
  
      
      navigate('/page/accueil');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.message);
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <img src="/img/logo.svg" height={150} width={150} alt="" style={{ margin: 'auto' }}/>
          <br/>
          <Typography variant="h2" className="font-bold mb-4">Authentification</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Bienvenue</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"  
              onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Identifiant
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Mot de passe
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6">
              Se connecter
            </button>
          </div>
          

        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.jpg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
