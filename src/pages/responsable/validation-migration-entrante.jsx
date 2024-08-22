import React from "react";
import data_migration_entrante from "../../data/migration_entrante";

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
    Checkbox,
    Tooltip
  } from "@material-tailwind/react";

import DateFormatter from "@/widgets/layout/date-formatter";

import {CheckIcon, XMarkIcon, ArrowUpTrayIcon, DocumentIcon} from "@heroicons/react/24/solid";

import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
  
  export function ValidationMigrationEntrante() {

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
        if(now > decodedtoken.exp || decodedtoken.profil != "Responsable guichet unique") {
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

    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
      data_migration_entrante.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {})
    );

    const handleSelectAllChange = () => {
      const newSelectAll = !selectAll;
      setSelectAll(newSelectAll);
      const newCheckedItems = data_migration_entrante.reduce((acc, item) => {
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
            Validation des migrations entrante
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
              <Select label="Motif" name="newMarque" size="lg" color="green">
                  <Option value="">étude</Option>
                  <Option value="">urgence familiale</Option>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Select label="Statut de résidence" name="newMarque" size="lg" color="green">
                  <Option value="">temporaire</Option>
                  <Option value="">permanent</Option>
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
                    Individu
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
                    Motif
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
                    Date d&apos;arrivée
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
                    Statut de résidence
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
                    Date prévue de rentrée
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
                    Pièce justificative
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
                    Fokotany d&apos;origine
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
                    Commune d&apos;origine
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
                    District d&apos;origine
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
                    Région d&apos;origine
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
          {data_migration_entrante && data_migration_entrante.map((item) => (
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
                          {item.nouveau_menage ? item.nouveau_menage.Numero_menage : ''} 
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.Individu ? item.Individu.nom : ''} {item.Individu ? item.Individu.prenom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.motif ? item.motif.description : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <DateFormatter date={item.date_arrivee}/>
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.statut_residence}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                        
                        {item.date_rentree === "" ? (
                          <span>-</span>
                        ) : (
                          <DateFormatter date={item.date_rentree} />
                        )}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.piece_justificative}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.ancien_menage.Fokotany ? item.ancien_menage.Fokotany.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.ancien_menage.Fokotany.Commune ? item.ancien_menage.Fokotany.Commune.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.ancien_menage.Fokotany.Commune.District ? item.ancien_menage.Fokotany.Commune.District.nom : ''}
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.ancien_menage.Fokotany.Commune.District.Region ? item.ancien_menage.Fokotany.Commune.District.Region.nom : ''}
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
        
      </div>
    );
  }
  
  export default ValidationMigrationEntrante;
  