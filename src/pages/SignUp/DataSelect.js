import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const selectMois = [
  {
    value: "Janvier",
    label: "Janvier",
  },
  {
    value: "Février",
    label: "Février",
  },
  {
    value: "Mars",
    label: "Mars",
  },
  {
    value: "Avril",
    label: "Avril",
  },
  {
    value: "Mai",
    label: "Mai",
  },
  {
    value: "Juin",
    label: "Juin",
  },
  {
    value: "Juillet",
    label: "Juillet",
  },
  {
    value: "Aout",
    label: "Aout",
  },
  {
    value: "Septembre",
    label: "Septembre",
  },
  {
    value: "Octobre",
    label: "Octobre",
  },
  {
    value: "Novembre",
    label: "Novembre",
  },
  {
    value: "Décembre",
    label: "Décembre",
  },
];

export function SelectMois() {
  const [mois, setMois] = React.useState("Janvier");

  const handleChange = (event) => {
    setMois(event.target.value);
  };

  return (
    <div>
      <TextField
        id="outlined-select-currency"
        select
        label="Mois"
        value={mois}
        onChange={handleChange}
      >
        {selectMois.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export function SelectJours() {
  const selectJour = [];

  for (let i = 0; i < 32; i++) {
    const objet = { value: `${i}`, label: `${i}` };
    selectJour.push(objet);
  }

  const [jours, setJours] = React.useState(1);

  const handleChange = (event) => {
    setJours(event.target.value);
  };

  return (
    <div>
      <TextField
        id="outlined-select-currency"
        select
        label="Jour"
        value={jours}
        onChange={handleChange}
      >
        {selectJour.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export function SelectAnnees() {
  const selectAnnees = [];

  for (let i = 2022; i > 1901; i--) {
    const objet = { value: `${i}`, label: `${i}` };
    selectAnnees.push(objet);
  }

  const [annees, setAnnees] = React.useState(2022);

  const handleChange = (event) => {
    setAnnees(event.target.value);
  };

  return (
    <div>
      <TextField
        id="outlined-select-currency"
        select
        label="Année"
        value={annees}
        onChange={handleChange}
      >
        {selectAnnees.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
