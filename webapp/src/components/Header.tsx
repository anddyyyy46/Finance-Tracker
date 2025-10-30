import { useAuthMutations } from "@/mutations/useAuthMutations";
import UploadBtn from "./UploadBtn";

export default function Header(){

    const {getUser} = useAuthMutations();
    const {data: user} = getUser;
    

    return (
        <div className="w-full flex justify-between items-center p-4 mb-4 border border-white rounded p-2">
            <span className="text-xl">Hallo {user?.fullname}</span>
            <UploadBtn></UploadBtn>
        </div>
    )
}