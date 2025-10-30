import * as React from "react";
import { Popover, Box, TextField, Button, Typography } from "@mui/material";

interface Field {
  name: string;
  label: string;
}

interface InputPopoverProps<T extends Record<string, string>> {
    fields: Field[];
    values: T;
    onChange: React.Dispatch<React.SetStateAction<T>>;
    onSave: () => void;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    title?: string;
  }

export default function InputPopover<T extends Record<string, string>>({
    fields,
    values,
    onChange,
    onSave,
    anchorEl,
    onClose,
    title = "Neu",
}: InputPopoverProps<T>) {

 
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...values, [e.target.name]: e.target.value });
  };

  const open = Boolean(anchorEl);

  return (
    <Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box className="p-4 flex flex-col gap-3 w-64">
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>

          {fields.map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              value={values[field.name] || ""}
              onChange={handleFieldChange}
              size="small"
              fullWidth
            />
          ))}

          <Box className="flex justify-end gap-2 mt-2">
            <Button size="small" onClick={onClose}>
              Abbrechen
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                onSave();
                onClose();
              }}
            >
              Speichern
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
