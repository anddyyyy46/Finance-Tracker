import AddBtn from "@/components/AddBtn";
import InputPopover from "@/components/InputPopover";
import { useCategoriesMutations } from "@/mutations/useCategoriesMutations";
import { usePaymentPartnerMutations } from "@/mutations/usePaymentPartnerMutations";
import { CreateCategoryDto, CreatePaymentPartnerDto, fetchProxy } from "@/util";
import { Box, Button, List, ListItem, ListItemText, Popover, TextField, Typography } from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";

export default function Settings(){

    const {getAllCategories, addCategory} = useCategoriesMutations();
    const {data: categories} = getAllCategories;

    const {getAllPaymentPartners, addPaymentPartner} = usePaymentPartnerMutations();
    const {data: paymentPartners} = getAllPaymentPartners;

    const [anchorElPPF, setAnchorElPPF] = useState<null | HTMLElement>(null);
    const [anchorElCF, setAnchorElCF] = useState<null | HTMLElement>(null);
    const [paymentPartnerForm, setpaymentPartnerForm] = useState<CreatePaymentPartnerDto>({name: "", contact: "", email: "", telNr: ""});
    const [categoryForm, setCategoryForm] = useState<CreateCategoryDto>({title: "", description: ""})


    const handleClickPPF = (event: MouseEvent<HTMLElement>) => {
        setAnchorElPPF(event.currentTarget);
    };
    const handleClickCF = (event: MouseEvent<HTMLElement>) => {
        setAnchorElCF(event.currentTarget);
    };
    const handleClosePPF = () => {
        setAnchorElPPF(null);
    };

    const handleCloseCF = () => {
        setAnchorElCF(null);
    };

    const handleSavePPF = async() => {
        await addPaymentPartner.mutateAsync(paymentPartnerForm);
        setpaymentPartnerForm({ name: "", email: "" });
        
    };
    const handleSaveCF = async() => {
        await addCategory.mutateAsync(categoryForm);
        setCategoryForm({ title: "", description: "" });
    };


    return (
        <div>
            <div>
                <div className="flex items-center">
                    <h3>Transaktionspartner: </h3>
                    <button
                        className=" mx-2 bg-white w-8 h-8 cursor-pointer rounded-full hover:bg-gray-400 text-black text-2xl
                        transition-colors duration-200 shadow-md" onClick={handleClickPPF}>
                            +
                </button>
                <InputPopover
                    fields={[
                    { name: "name", label: "Name" },
                    { name: "email", label: "E-Mail" },
                    { name: "contact", label: "Kontakt" },
                    { name: "telNr", label: "Tel. Nr." },
                    ]}
                    values={paymentPartnerForm}
                    onChange={setpaymentPartnerForm}
                    onSave={handleSavePPF}
                    anchorEl={anchorElPPF}
                    onClose={handleClosePPF}
                    title="Neu"
                />
                </div>
                <List>
                    {paymentPartners?.map((paymentPartner) => (
                        <ListItem key={paymentPartner.id}>
                            <ListItemText primary={paymentPartner.name} secondary={paymentPartner.email} />
                        </ListItem>
                    ))}
                </List>
            </div>
            <div>
                <div className="flex items-center">
                <h3>Kategorien: </h3>
                <button
                        className=" mx-2 bg-white w-8 h-8 cursor-pointer rounded-full hover:bg-gray-400 text-black text-2xl
                        transition-colors duration-200 shadow-md" onClick={handleClickCF}>
                            +
                </button>
                <InputPopover
                    fields={[
                    { name: "title", label: "Titel" },
                    { name: "description", label: "Beschreibung" },
                    ]}
                    values={categoryForm}
                    onChange={setCategoryForm}
                    onSave={handleSaveCF}
                    anchorEl={anchorElCF}
                    onClose={handleCloseCF}
                    title="Neu"
                />
                </div>
                <List>
                    {categories?.map((category) => (
                        <ListItem key={category.id}>
                            <ListItemText primary={category.title} secondary={category.description} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}