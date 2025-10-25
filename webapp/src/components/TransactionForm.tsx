import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Stack } from "@mui/material";
import { CreateTransactionDto } from "@/dtos/Dtos";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";
import { useState } from "react";

type TransactionFormProps = {
    mode: "create" | "edit";
    defaultValues?: CreateTransactionDto;
    onSubmit: (data: any) => void;
    loading?: boolean;
  };
  
  export function TransactionForm({
    mode,
    defaultValues,
    onSubmit,
    loading = false,
  }: TransactionFormProps) {
    const { handleSubmit, control } = useForm({
      defaultValues: defaultValues,
    });

    const [amount, setAmount] = useState(0.0);
    const [date, setDate] = useState<Date | null | undefined>(new Date());
  
    const submit = () => {
      const transaction: CreateTransactionDto = {
        amount
      }
      onSubmit?.(transaction);
    };
  
    return (
      <div className='h-full flex justify-center'>
                  <div className='mt-[5%] text-white'>
                      <TextField
                          autoFocus
                          margin="dense"
                          label="Amount"
                          type="number"
                          fullWidth
                          variant="outlined"
                          value={amount}
                          onChange={(e) => setAmount(parseFloat(e.target.value))}
                      />
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
           
                <DatePicker
                sx={{color: "white"}}
                className="border-white"
                label="Datum auswählen"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
                />
            </LocalizationProvider>
                      <Button variant="contained" onClick={submit}>Erstellen</Button>
                  </div>
              </div>
    );
  }