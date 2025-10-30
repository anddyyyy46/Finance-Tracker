import { CreatePaymentPartnerDto, fetchProxy, ReadPaymentPartnerDto } from "@/util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const queryKey = ["paymentPartner"]

export const usePaymentPartnerMutations = () => {
    const queryClient = useQueryClient()

    const getAllPaymentPartners= useQuery({
        queryKey: queryKey,
        queryFn: async (): Promise< ReadPaymentPartnerDto[] | null> => {
            const res = await fetchProxy("paymentpartner", {
                method: 'GET',
            });
            if(!res){
                return null;
            }
            const paymentPartners = await res.json()
            return paymentPartners;
        }
    })

    const addPaymentPartner = useMutation({
        mutationFn: async (paymentPartner: CreatePaymentPartnerDto): Promise< ReadPaymentPartnerDto | null> => {
            const res = await fetchProxy("paymentpartner", {
                method: 'POST',
                body: JSON.stringify(
                    paymentPartner
                )
            });
            if(!res){
                return null
            }
            const paymentPartners = await res.json()
            toast.success("Erfolgreich erstellt")
            return paymentPartners;
        },
        onSuccess: 
            async ()=>await queryClient.invalidateQueries({queryKey})
        }
    )

    return {
        getAllPaymentPartners,
        addPaymentPartner
    }
}