import { TransactionForm } from "@/components/TransactionForm";
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
        <div className="p-6 flex-col w-full">
            <h1 className="text-2xl font-semibold mb-4">Neues Item erstellen</h1>
            <TransactionForm mode="create" onSubmit={onSubmit}/>
        </div>
    </div>)
}