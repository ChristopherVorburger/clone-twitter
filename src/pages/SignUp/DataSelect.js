import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const selectMonth = [
  {
    value: "",
    label: "",
  },
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

export function SelectMonth() {
  const [month, setMonth] = React.useState("");

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <TextField
      id="outlined-select-currency"
      select
      label="Mois"
      value={month}
      onChange={handleChange}
      fullWidth={true}
      InputLabelProps={{
        shrink: true,
      }}
    >
      {selectMonth.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export function SelectDay() {
  const selectDay = [];

  for (let i = 0; i < 32; i++) {
    const objet = { value: `${i}`, label: `${i}` };
    selectDay.push(objet);
  }

  const [day, setDay] = React.useState("");

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  return (
    <TextField
      id="outlined-select-currency"
      select
      label="Jour"
      value={day}
      onChange={handleChange}
      fullWidth={true}
      InputLabelProps={{
        shrink: true,
      }}
    >
      {selectDay.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export function SelectYear() {
  const selectYear = [];

  for (let i = 2022; i > 1901; i--) {
    const objet = { value: `${i}`, label: `${i}` };
    selectYear.push(objet);
  }

  const [year, setYear] = React.useState("");

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <TextField
      id="outlined-select-currency"
      select
      label="Année"
      value={year}
      onChange={handleChange}
      fullWidth={true}
      InputLabelProps={{
        shrink: true,
      }}
    >
      {selectYear.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
