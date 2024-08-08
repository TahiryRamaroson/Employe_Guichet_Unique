import React from "react";
import data_plainte from "../../data/plainte";
import data_historique_action from "../../data/historique_action";
//import XLSX from 'xlsx';
//import jsPDF from 'jspdf';
//import 'jspdf-autotable';
//import html2canvas from 'html2canvas';

import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Select, 
    Option,
    Chip,
    SpeedDial,
    SpeedDialAction,
    SpeedDialContent,
    SpeedDialHandler,
    IconButton,
    Tooltip,
    Checkbox,
    Dialog,
    DialogBody
  } from "@material-tailwind/react";

import DateFormatter from "@/widgets/layout/date-formatter";

import {CheckIcon, XMarkIcon, ArrowUpTrayIcon, DocumentIcon} from "@heroicons/react/24/solid";

import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
  
  export function ValidationPlainte() {

    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);

    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
      data_plainte.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {})
    );

    const handleSelectAllChange = () => {
      const newSelectAll = !selectAll;
      setSelectAll(newSelectAll);
      const newCheckedItems = data_plainte.reduce((acc, item) => {
        acc[item.id] = newSelectAll;
        return acc;
      }, {});
      setCheckedItems(newCheckedItems);
    };

    const handleItemChange = (event) => {
      const { name, checked } = event.target;
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [name]: checked,
      }));
    };

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="h-full w-full">
          <Typography
            variant="h1"
            color="black"
            className="mt-4 flex justify-center gap-1 text-4xl font-normal"
          >
            Validation des plaintes
          </Typography>

          <Card color="transparent" shadow={false} className="p-6 text-center mb-8">
            <SpeedDial placement="bottom">
              <SpeedDialHandler>
                <IconButton size="lg" className="rounded-full" color="gray">
                  <ArrowUpTrayIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </IconButton>
              </SpeedDialHandler>
              <SpeedDialContent className="flex-row">
                <SpeedDialAction className="h-16 w-16">
                  <DocumentIcon className="h-5 w-5" />
                  <Typography color="blue-gray" className="text-xs font-normal">
                    Excel
                  </Typography>
                </SpeedDialAction>
                <SpeedDialAction className="h-16 w-16">
                  <DocumentIcon className="h-5 w-5" />
                  <Typography color="blue-gray" className="text-xs font-normal">
                    CSV
                  </Typography>
                </SpeedDialAction>
                <SpeedDialAction className="h-16 w-16">
                  <DocumentIcon className="h-5 w-5" />
                  <Typography color="blue-gray" className="text-xs font-normal">
                    PDF
                  </Typography>
                </SpeedDialAction>
              </SpeedDialContent>
            </SpeedDial>
          </Card>

        <Card color="transparent" shadow={false} className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="flex flex-col gap-4">
              <Input size="lg" label="Numéro ménage" color="green"/>
            </div>
            <div className="flex flex-col gap-4">
              <Input size="lg" label="Date du fait" color="green" type="date"/>
            </div>
            <div className="flex flex-col gap-4">
              <Select label="Catégorie" name="newMarque" size="lg" color="green">
                  <Option value="">électricité</Option>
                  <Option value="">eau</Option>
                  <Option value="">sécurité</Option>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Select label="Statut" name="newMarque" size="lg" color="green">
                  <Option value="">Validé</Option>
                  <Option value="">En attente</Option>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Button variant="outlined" color="green" className="border-2" type="submit" fullWidth={false}>
                Filtrer
              </Button>
            </div>
          </form>
        </Card>

        <Card color="transparent" shadow={false} className="p-6">
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="mt-4 gap-1 font-normal"
          >
            Validation multiple
          </Typography>
          <span className="mt-3">
            <Tooltip content="valider">
              <Button className="text-center ml-1" color="green" size="sm">
                <CheckIcon className="h-4 w-4" />
              </Button>
            </Tooltip>

            <Tooltip content="rejeter">
                <Button className="text-center ml-5" color="red" size="sm" variant="outlined">
                  <XMarkIcon className="h-4 w-4" />
                </Button>
            </Tooltip>
          </span>
        </Card>
      
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto" id="mydata">
          <thead>
            <tr>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Numéro ménage
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Victime
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Description
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Catégorie
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Date du fait
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Intervenant
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Responsable
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
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
              
            </tr>
          </thead>
          <tbody>
          {data_plainte && data_plainte.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Checkbox 
                        ripple={true}
                        name={item.id.toString()}
                        checked={checkedItems[item.id]}
                        onChange={handleItemChange} 
                      />
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.Victime.Menage ? item.Victime.Menage.Numero_menage : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.Victime ? item.Victime.nom : ''} {item.Victime ? item.Victime.prenom : ''}
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.description_plainte}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.categorie_plainte ? item.categorie_plainte.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <DateFormatter date={item.date_fait} />
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.intervenant ? item.intervenant.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.responsable ? item.responsable.nom : ''}
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
                          size="sm"
                          value={item.statut}
                        />
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Tooltip content="valider">
                          <Button className="text-center ml-5" color="green" size="sm">
                            <CheckIcon className="h-4 w-4" />
                          </Button>
                      </Tooltip>

                      <Tooltip content="rejeter">
                          <Button className="text-center ml-5" color="red" size="sm" variant="outlined">
                            <XMarkIcon className="h-4 w-4" />
                          </Button>
                      </Tooltip>
                    </td>

                  </tr>
                  ))}
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
        
        <Card className="h-full w-full">
              <Typography
                variant="h1"
                color="black"
                className="mt-4 flex justify-center gap-1 text-4xl font-normal"
              >
                Suivi des plaintes
              </Typography>

            <Card color="transparent" shadow={false} className="p-6 mt-6">
              <form className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="flex flex-col gap-4">
                  <Input size="lg" label="Numéro ménage" color="green"/>
                </div>
                <div className="flex flex-col gap-4">
                  <Input size="lg" label="Date du fait" color="green" type="date"/>
                </div>
                <div className="flex flex-col gap-4">
                  <Select label="Catégorie" name="newMarque" size="lg" color="green">
                      <Option value="">électricité</Option>
                      <Option value="">eau</Option>
                      <Option value="">sécurité</Option>
                  </Select>
                </div>
                <div className="flex flex-col gap-4">
                  <Select label="Statut" name="newMarque" size="lg" color="green">
                      <Option value="">Validé</Option>
                      <Option value="">En attente</Option>
                  </Select>
                </div>
                <div className="flex flex-col gap-4">
                  <Button variant="outlined" color="green" className="border-2" type="submit" fullWidth={false}>
                    Filtrer
                  </Button>
                </div>
              </form>
            </Card>



          <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto" id="mydata">
              <thead>
                <tr>

                    <th
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Numéro ménage
                      </Typography>
                    </th>
                    <th
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Victime
                      </Typography>
                    </th>
                    <th
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Description
                      </Typography>
                    </th>
                    <th
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Catégorie
                      </Typography>
                    </th>
                    <th
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Date de saisie
                      </Typography>
                    </th>
                    <th
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Intervenant
                      </Typography>
                    </th>
                    <th
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Responsable
                      </Typography>
                    </th>
                    <th
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Traitement
                      </Typography>
                    </th>
                    <th
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                    </th>

                </tr>
              </thead>
              <tbody>
              {data_plainte && data_plainte.map((item) => (
                      <tr key={item.id}>
                        <td className="p-4 border-b border-blue-gray-50 text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.Victime.Menage ? item.Victime.Menage.Numero_menage : ''}
                            </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {item.Victime ? item.Victime.nom : ''} {item.Victime ? item.Victime.prenom : ''}
                              </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.description_plainte}
                            </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.categorie_plainte ? item.categorie_plainte.nom : ''}
                            </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <DateFormatter date={item.date_fait} />
                            </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.intervenant ? item.intervenant.nom : ''}
                            </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.responsable ? item.responsable.nom : ''}
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
                              color="amber"
                              size="sm"
                              value={item.statut_traitement}
                            />
                            </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Tooltip content="Action">
                            <Button onClick={handleOpen} variant="outlined" className="mr-5 border-none">
                              <ArrowTopRightOnSquareIcon className="h-5 w-5" onClick={handleOpen}/>
                            </Button>
                          </Tooltip>
                          <Dialog open={open} handler={handleOpen} className="bg-green" size="lg">
                            <DialogBody>
                              <Card className="h-full w-full">
                                    <Button variant="gradient" color="amber" className="m-auto mt-6 mb-6" type="submit" fullWidth={false} size="lg">
                                      Cloturer
                                    </Button>
                                <form className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6 ml-6 mr-6">
                                  <div className="flex flex-col gap-4">
                                    <Input size="md" label="Date de visite" color="green" type="date"/>
                                  </div>
                                  <div className="flex flex-col gap-4">
                                    <select className="block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500" multiple>
                                        <option value="koto">Appui psychologique</option>
                                        <option value="bema">Appui financière</option>
                                    </select>
                                  </div>
                                  <div className="flex flex-col gap-4">
                                    <Button variant="outlined" color="green" className="border-2" type="submit" fullWidth={false}>
                                      Ajouter
                                    </Button>
                                  </div>
                                </form>
                                <Typography
                                variant="paragraph"
                                color="blue-gray"
                                className="font-normal ml-5"
                                >
                                  Historique:
                                </Typography>
                              <CardBody className="overflow-scroll px-0">
                                <table className="w-full min-w-max table-auto" id="mydata">
                                  <thead>
                                    <tr>
                                        <th
                                          className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                          <Typography
                                            variant="paragraph"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                          >
                                            Date de visite
                                          </Typography>
                                        </th>
                                        <th
                                          className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                          <Typography
                                            variant="paragraph"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                          >
                                            Action
                                          </Typography>
                                        </th>
                                        <th
                                          className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                          <Typography
                                            variant="paragraph"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                          >
                                            Responsable
                                          </Typography>
                                        </th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                  {data_historique_action && data_historique_action.map((item) => (
                                          <tr key={item.id}>
                                            <td className="p-4 border-b border-blue-gray-50 text-center">
                                                  <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                  >
                                                    <DateFormatter date={item.date_visite} />
                                                  </Typography>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50 text-center">
                                                <Typography
                                                  variant="small"
                                                  color="blue-gray"
                                                  className="font-normal"
                                                >
                                                  {item.actions && item.actions.map((action) => (
                                                    <span key={action.id}>{action.description}, </span>
                                                  ))}
                                                </Typography>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50 text-center">
                                                <Typography
                                                  variant="small"
                                                  color="blue-gray"
                                                  className="font-normal"
                                                >
                                                  {item.responsable ? item.responsable.nom : ''} {item.responsable ? item.responsable.prenom : ''}
                                                </Typography>
                                            </td>
                                  
                                          </tr>
                                          ))}
                                  </tbody>
                                </table>
                              </CardBody>
                              </Card>
                            </DialogBody>
                          </Dialog>
                        </td>
              
                      </tr>
                      ))}
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
  
  export default ValidationPlainte;
  