import { TextField, Button, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { useCategoriesMutations } from "@/mutations/useCategoriesMutations";
import { CreateTransactionDto, ReadCategoryDto, ReadPaymentPartnerDto } from "@/util";
import { usePaymentPartnerMutations } from "@/mutations/usePaymentPartnerMutations";

type TransactionFormProps = {
    defaultValues?: CreateTransactionDto;
    onSubmit: (data: CreateTransactionDto) => void;
    loading?: boolean;
  };
  
  export function TransactionForm({
    onSubmit,
  }: TransactionFormProps) {

    const [amount, setAmount] = useState(0.0);
    const [transactionMedium, setTransactionMedium] = useState("");
    const [date, setDate] = useState<Date | null | undefined>(new Date());
    const [category, setCategory] = useState<ReadCategoryDto | null>(null)
    const [paymentPartner, setPaymentPartner] = useState<ReadPaymentPartnerDto | null>(null)
  
    const {getAllCategories} = useCategoriesMutations();
    const {data: categories} = getAllCategories;

    const {getAllPaymentPartners} = usePaymentPartnerMutations();
    const {data: paymentPartners} = getAllPaymentPartners;

    const submit = () => {
     
      const transaction: CreateTransactionDto = {
        amount: amount,
        date: date,
        paymentPartnerId: paymentPartner?.id,
        transactionMedium: transactionMedium,
        categoryId: category?.id,
        importance: undefined,

      }
      onSubmit?.(transaction);
    };

    const handleAmountChange = (input: string) => {

      input = input.replace(",", ".");
      const regex = /^\d*([.,]\d{0,2})?$/;
  
      if (regex.test(input) || input === "") {
          setAmount(parseFloat(input));
      }
    };
  
    return (
      <div className='h-full w-full grid grid-cols-2 gap-4 text-white '>
                  <div className='flex flex-col justify-evenly gap-4 '>
                      <TextField
                          autoFocus
                          margin="dense"
                          label="Betrag (in € und mit Komma)"
                          type="number"
                          fullWidth
                          variant="outlined"
                          value={amount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                          slotProps={{
                            htmlInput: {
                              inputMode: "decimal", 
                            }
                          }}
                      />
                      <TextField
                          autoFocus
                          margin="dense"
                          label="Zahlungsmittel"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={transactionMedium}
                          onChange={(e) => setTransactionMedium(e.target.value)}
                      />
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
           
                        <DatePicker
                        autoFocus
                        sx={{color: "white"}}
                        className="border-white"
                        label="Datum auswählen"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                        />

                  </LocalizationProvider>
                  </div>
                  <div className="flex flex-col justify-evenly gap-4 w-full">
                      <Autocomplete 
                        options={categories || []}
                        getOptionLabel={(option) => option.title}
                        value={category}
                        onChange={(e, newValue)=> setCategory(newValue)}
                        renderInput={(params)=> <TextField {...params} label="Kategorie auswählen" />}
                        fullWidth
                      />
                      <Autocomplete 
                        options={paymentPartners || []}
                        getOptionLabel={(option) => option.name}
                        value={paymentPartner}
                        onChange={(e, newValue)=> setPaymentPartner(newValue)}
                        renderInput={(params)=> <TextField {...params} label="Sender/Empfänger auswählen" />}
                        fullWidth
                      />
                    
                  </div>
                  <Button variant="contained" onClick={submit}>Erstellen</Button>
              </div>
    );
  }