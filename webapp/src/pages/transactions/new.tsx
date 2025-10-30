import { TransactionForm } from "@/components/TransactionForm";
import { useTransactionsMutations } from "@/mutations/useTransactionsMutations";
import { CreateTransactionDto } from "@/util";
import { useRouter } from "next/router";

export default function AddTransaction() {

    const {addTransaction} = useTransactionsMutations();

    const router = useRouter()


    const onSubmit = async(data: CreateTransactionDto) => {
        await addTransaction.mutateAsync(data);
        router.push("/transactions")
    }

    return (<div>
        <div className="p-6 flex-col w-full">
            <h1 className="text-2xl font-semibold mb-4">Neues Transaktion erstellen</h1>
            <TransactionForm onSubmit={onSubmit}/>
        </div>
    </div>)
}