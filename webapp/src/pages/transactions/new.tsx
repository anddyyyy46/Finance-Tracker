import { TransactionForm } from "@/components/TransactionForm";
import { CreateTransactionDto } from "@/dtos/Dtos";
import { useTransactionsMutations } from "@/mutations/useTransactionsMutations";
import { useRouter } from "next/router";

export default function addTransaction() {

    const {addTransaction} = useTransactionsMutations();

    const router = useRouter()


    const onSubmit = async(data: any) => {
        const res = await addTransaction.mutateAsync(data);
        router.push("/transactions")
    }

    return (<div>
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Neues Item erstellen</h1>
            <TransactionForm mode="create" onSubmit={onSubmit}/>
        </div>
    </div>)
}