import { CreateTransactionDto, ReadTransactionDto } from "@/dtos/Dtos";
import { fetchBackend, fetchProxy } from "@/util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const queryKey = ["transactions"]

export const useTransactionsMutations = () =>{

    const queryClient = useQueryClient()

    const getAllTransactions = useQuery({
        queryKey: queryKey,
        queryFn: async (): Promise< ReadTransactionDto[] | null> => {
            const res = await fetchProxy("transaction", {
                method: 'GET',
            });
            if(!res){
                return null;
            }
            const transactions = await res.json()
            return transactions;
        }
    })

    const addTransaction = useMutation({
        mutationFn: async (transaction: CreateTransactionDto): Promise< ReadTransactionDto[] | null> => {
            const res = await fetchProxy("transaction", {
                method: 'POST',
                body: JSON.stringify(
                    transaction
                )
            });
            if(!res){
                return null
            }
            const transactions = await res.json()
            toast.success("Erfolgreich erstellt")
            return transactions;
        },
        onSuccess: 
            async ()=>await queryClient.invalidateQueries({queryKey})
        }
    )

    return {
        getAllTransactions,
        addTransaction
    }
}