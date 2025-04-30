import { FC,useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectOption {
  id: number;
  value: string;
}

interface SelectProps {
  selectValue: SelectOption[];
  name: string;
  onChange: (value: string) => void; 
}

export const SelectWindow: FC<SelectProps> = ({ selectValue, name, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setSelectedValue(value);
    onChange(value); 
  };

  return (
    <Box sx={{ maxWidth: 150, marginY: 2 }}>
      <FormControl fullWidth>
        <InputLabel>{name}</InputLabel>
        <Select
          value={selectedValue}
          label={name}
          onChange={handleChange}
        >
          {selectValue.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};