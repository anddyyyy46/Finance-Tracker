import { CategoryCountDto, CreateTransactionDateDto, CreateTransactionDto, fetchBackend, fetchProxy, ReadTransactionDto } from "@/util";
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
        mutationFn: async (transaction: CreateTransactionDto): Promise< ReadTransactionDto | null> => {
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

    const uploadTransactions = useMutation({
        mutationFn: async (file: File ): Promise< ReadTransactionDto[] | null> => {
            const uploadFile = new FormData()
            uploadFile.append("file", file)
            
            const res = await fetchProxy("transaction/upload", {
                method: 'POST',
                body: uploadFile
            }, true);
            if(!res){
                return null
            }
            const transactions = await res.json()
            toast.success(`Erfolgreich ${transactions.length} Transaktionen erstellt`)
            return transactions;
        },
        onSuccess: 
            async ()=>await queryClient.invalidateQueries({queryKey})
    })

    const deleteTransaction = useMutation({
        mutationFn: async (id: number) =>{
            const res = await fetchProxy(`transaction/${id}`, {
                method: "DELETE",
            });
            if(!res){
                return null
            }
            toast.success("Erfolgreich gelöscht")
            return null;
        },
        onSuccess: 
            async ()=>await queryClient.invalidateQueries({queryKey})
    
    })

    const getCategoriesCount = useQuery({
        queryFn: async (): Promise<CategoryCountDto[] | null> => {
            const res = await fetchProxy("transaction/categorycount", {
                method: 'GET',
            });
            if(!res){
                return null;
            }
            const categoriesCount = await res.json()
            return categoriesCount;
        },
        queryKey: ["categoryCount"],
    })

    const getTransactionsBetweenDates = useMutation({
        mutationFn: async (createTransactionDateDto: CreateTransactionDateDto): Promise<ReadTransactionDto[] | null> => {
            const res = await fetchProxy("transaction/betweendate", {
                method: 'POST',
                body: JSON.stringify(
                    createTransactionDateDto
                )
            });
            if(!res){
                return null;
            }
            const transactions = await res.json()
            return transactions;
        }
    })



    return {
        getAllTransactions,
        addTransaction,
        uploadTransactions,
        deleteTransaction,
        getTransactionsBetweenDates,
        getCategoriesCount
    }
}