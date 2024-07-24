import React from "react";

import {
    Card,
    Popover,
    PopoverHandler,
    PopoverContent,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Tooltip,
    Select, 
    Option,
    Chip,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";

import { PencilIcon, TrashIcon, InformationCircleIcon, PlusIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";

import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
  
  export function Utilisateur() {

    const [type, setType] = React.useState("card");

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
    <Card className="h-full w-full">
          <Typography
            variant="h1"
            color="black"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Liste des utilisateurs
          </Typography>
        <div className="mt-5 mb-5 flex items-center justify-center">
        <Popover
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <PopoverHandler>
            
              <Button className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <PlusIcon className="h-4 w-4" />
                <span className="ml-2">Ajout</span>
              </Button>
            
          </PopoverHandler>
          <PopoverContent>
            <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96">

              <Card className="w-full max-w-[24rem]">
                <CardBody>
                  <Tabs value={type} className="overflow-visible">
                    <TabsHeader className="relative z-0 ">
                      <Tab value="card" onClick={() => setType("card")}>
                        Etape 1
                      </Tab>
                      <Tab value="paypal" onClick={() => setType("paypal")}>
                        Etape 2
                      </Tab>
                    </TabsHeader>
                    <TabsBody
                      className="!overflow-x-hidden !overflow-y-visible"
                      animate={{
                        initial: {
                          x: type === "card" ? 400 : -400,
                        },
                        mount: {
                          x: 0,
                        },
                        unmount: {
                          x: type === "card" ? 400 : -400,
                        },
                      }}
                    >
                      <TabPanel value="card" className="p-0">
                        <div className="mb-1 mt-3 flex flex-col gap-6">
                          <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Nom
                          </Typography>
                          <Input
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            name="nom"
                            value=""
                            required
                          />
                          <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Prénom
                          </Typography>
                          <Input
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            name="newanneeSortie"
                            value=""
                            required
                          />
                          <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Profil
                          </Typography>
                          <Select 
                            label="Marque"
                            name="newMarque"
                            size="lg"
                          >
                                <Option value="">test</Option>
                          </Select>
                          <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Statut
                          </Typography>
                          <Select 
                            label="Catégorie"
                            size="lg"
                            name="newCategorie"
                          >
                          
                                <Option value="">test</Option>
                          </Select>
                        </div>
                      </TabPanel>
                      <TabPanel value="paypal" className="p-0">
                        <div className="mb-1 mt-3 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                              Adresse
                            </Typography>
                            <Input
                              size="lg"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="nom"
                              value=""
                              required
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                              Contact
                            </Typography>
                            <Input
                              size="lg"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="newanneeSortie"
                              value=""
                              required
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                              Email
                            </Typography>
                            <Input
                              type="email"
                              size="lg"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="newanneeSortie"
                              value=""
                              required
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                              Mot de passe
                            </Typography>
                            <Input
                              type="password"
                              size="lg"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="newanneeSortie"
                              value=""
                              required
                            />
                        </div>
                      </TabPanel>
                    </TabsBody>
                  </Tabs>
                </CardBody>
              </Card>

              <Card color="transparent" shadow={false}>
                <Button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit" fullWidth>
                  Ajouter
                </Button>
              </Card>
            </form>
          </PopoverContent>
        </Popover>
        </div>
        
        <form>
          <div className="ml-10 mr-10 flex flex-col items-center justify-between gap-4 md:flex-row">
                              
            <Input label="recherche"
            name="nom"
            value=""
            />

            <Select label="Profil"
            >
              <Option value="">test</Option>
            </Select>

            <Select label="Statut"
            >
              <Option value="">test</Option>
            </Select>

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
                    Nom
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
                    Prénom
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
                    Statut
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
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
                            Koto
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Intervenant
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Chip
                            variant="ghost"
                            color="green"
                            size="xs"
                            value="actif"
                            icon={
                              <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                            }
                          />
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Tooltip
                        className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                        content={
                          <div className="w-80">
                            <Typography color="black" className="font-medium">
                              Email: example@gmail.com
                            </Typography>
                            <Typography color="black" className="font-medium">
                              Contact: 032 01 404 37
                            </Typography>
                            <Typography color="black" className="font-medium">
                              Adresse: Lot III F Anosizato
                            </Typography>
                          </div>
                        }>
                        <InformationCircleIcon className="h-8 w-8" color="black" />
                      </Tooltip>
                    
                    </td>
                    
                    <td className="p-4 border-b border-blue-gray-50">

                    <Popover
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <PopoverHandler>
                        
                            <Button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <PencilIcon className="h-4 w-4" />
                            </Button>
                        
                      </PopoverHandler>
                      <PopoverContent>
                        <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96">
                          <Card className="w-full max-w-[24rem]">
                            <CardBody>
                              <Tabs value={type} className="overflow-visible">
                                <TabsHeader className="relative z-0 ">
                                  <Tab value="card" onClick={() => setType("card")}>
                                    Etape 1
                                  </Tab>
                                  <Tab value="paypal" onClick={() => setType("paypal")}>
                                    Etape 2
                                  </Tab>
                                </TabsHeader>
                                <TabsBody
                                  className="!overflow-x-hidden !overflow-y-visible"
                                  animate={{
                                    initial: {
                                      x: type === "card" ? 400 : -400,
                                    },
                                    mount: {
                                      x: 0,
                                    },
                                    unmount: {
                                      x: type === "card" ? 400 : -400,
                                    },
                                  }}
                                >
                                  <TabPanel value="card" className="p-0">
                                    <div className="mb-1 mt-3 flex flex-col gap-6">
                                      <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Nom
                                      </Typography>
                                      <Input
                                        size="lg"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                          className: "before:content-none after:content-none",
                                        }}
                                        name="nom"
                                        value=""
                                        required
                                      />
                                      <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Prénom
                                      </Typography>
                                      <Input
                                        size="lg"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                          className: "before:content-none after:content-none",
                                        }}
                                        name="newanneeSortie"
                                        value=""
                                        required
                                      />
                                      <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Profil
                                      </Typography>
                                      <Select 
                                        label="Marque"
                                        name="newMarque"
                                        size="lg"
                                      >
                                            <Option value="">test</Option>
                                      </Select>
                                      <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Satut
                                      </Typography>
                                      <Select 
                                        label="Catégorie"
                                        size="lg"
                                        name="newCategorie"
                                      >
                                      
                                            <Option value="">test</Option>
                                      </Select>
                                    </div>
                                  </TabPanel>
                                  <TabPanel value="paypal" className="p-0">
                                    <div className="mb-1 mt-3 flex flex-col gap-6">
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                          Adresse
                                        </Typography>
                                        <Input
                                          size="lg"
                                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                          labelProps={{
                                            className: "before:content-none after:content-none",
                                          }}
                                          name="nom"
                                          value=""
                                          required
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                          Contact
                                        </Typography>
                                        <Input
                                          size="lg"
                                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                          labelProps={{
                                            className: "before:content-none after:content-none",
                                          }}
                                          name="newanneeSortie"
                                          value=""
                                          required
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                          Email
                                        </Typography>
                                        <Input
                                          type="email"
                                          size="lg"
                                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                          labelProps={{
                                            className: "before:content-none after:content-none",
                                          }}
                                          name="newanneeSortie"
                                          value=""
                                          required
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                          Mot de passe
                                        </Typography>
                                        <Input
                                          type="password"
                                          size="lg"
                                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                          labelProps={{
                                            className: "before:content-none after:content-none",
                                          }}
                                          name="newanneeSortie"
                                          value=""
                                          required
                                        />
                                    </div>
                                  </TabPanel>
                                </TabsBody>
                              </Tabs>
                            </CardBody>
                          </Card>
                                        
                          <Card color="transparent" shadow={false}>
                            <Button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit" fullWidth>
                              Modifier
                            </Button>
                          </Card>
                        </form>
                      </PopoverContent>
                    </Popover>
                      

                      <Tooltip content="Supprimer">
                          <Button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-5">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                      </Tooltip>
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
  
  export default Utilisateur;
  