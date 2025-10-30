import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {InfoOutlined} from '@mui/icons-material';
import { ChangeEvent, useState } from "react";
import { useTransactionsMutations } from "@/mutations/useTransactionsMutations";

export default function UploadBtn(){

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const {uploadTransactions} = useTransactionsMutations();

    const sendFile = async(event: ChangeEvent<HTMLInputElement>)=>{
        if(event.target?.files?.[0]){
            setFile(event.target.files[0])
            await uploadTransactions.mutateAsync(event.target.files[0])
            
        }
    }

    return (
        <div>
             <label htmlFor="file-upload" className="inline-block px-5 py-2.5 bg-blue-500 text-white rounded-lg cursor-pointer font-sans text-base transition-colors duration-200 hover:bg-blue-700">
                CSV hochladen
            </label>
  
            <input type="file" id="file-upload" className="hidden" onChange={sendFile}></input>
            
            
            <IconButton onClick={()=>setOpen(true)}>
                <InfoOutlined></InfoOutlined>
            </IconButton>
            <Dialog open={open} onClose={()=>setOpen(false)}>
                <DialogTitle>CSV-Datei Hinweis</DialogTitle>
                <DialogContent>
                    <p>
                        Damit die Transaktionen wie gewollt in das
                        System übernommen werden, ist es wichtig, dass die 
                        Spalten die genau richtigen Namen haben wie in 
                        <span><a href="/Beispiel.csv" className="text-blue-600 underline cursor-pointer font-medium mx-2">Beispiel.csv</a></span>
                    </p>
                     
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)}>Schließen</Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}