import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Select, Option } from '@material-tailwind/react';

function PlanningDialog({ isOpen, onClose, onSave }) {
  const [selectedIntervenant, setSelectedIntervenant] = useState('');
  const [selectedResponsable, setSelectedResponsable] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');

  const handleSave = () => {
    onSave({ intervenant: selectedIntervenant, responsable: selectedResponsable, localisation:{region: selectedRegion, district: selectedDistrict, commune: selectedCommune} });
    setSelectedIntervenant();
    setSelectedResponsable();
    setSelectedRegion();
    setSelectedDistrict();
    setSelectedCommune();
    onClose();
  };

  const handleChangeIntervenant = (value) => {
    setSelectedIntervenant(value);
  };

  const handleChangeResponsable = (value) => {
    setSelectedResponsable(value);
  };

  const handleChangeRegion = (value) => {
    setSelectedRegion(value);
  };

  const handleChangeDistrict = (value) => {
    setSelectedDistrict(value);
  };

  const handleChangeCommune = (value) => {
    setSelectedCommune(value);
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Ajouter un emploi du temps</DialogHeader>
      <DialogBody>
        <Select label="Sélectionner un intervenant" value={selectedIntervenant} onChange={handleChangeIntervenant}>
          <Option value="Koto Lita">Koto Lita</Option>
          <Option value="Soa Fara">Soa Fara</Option>
        </Select>
        <br/>
        <Select label="Sélectionner un responsable" value={selectedResponsable} onChange={handleChangeResponsable}>
          <Option value="Jean Ba">Jean Ba</Option>
          <Option value="Vero Manitra">Vero Manitra</Option>
        </Select>
        <br/>
        <Select label="Sélectionner un Région" value={selectedRegion} onChange={handleChangeRegion}>
          <Option value="Analamanga">Analamanga</Option>
          <Option value="Vakinakaratra">Vakinakaratra</Option>
        </Select>
        <br/>
        <Select label="Sélectionner un District" value={selectedDistrict} onChange={handleChangeDistrict}>
          <Option value="District I">District I</Option>
          <Option value="District II">District II</Option>
        </Select>
        <br/>
        <Select label="Sélectionner un Commune" value={selectedCommune} onChange={handleChangeCommune}>
          <Option value="Commune I">Commune I</Option>
          <Option value="Commune II">Commune II</Option>
        </Select>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" className='mr-3' onClick={onClose}>
          <span>Annuler</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleSave}>
          <span>Enregistrer</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

PlanningDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

export default PlanningDialog;
