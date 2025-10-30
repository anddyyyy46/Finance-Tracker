import Link from "next/link"

type ButtonProps = {
    pathName? : string;

}

export default function AddBtn({pathName}: ButtonProps){
    return (
        <div className="absolute right-8 bottom-4">
            <Link href={`${pathName}/new`}>
                    
                <button
                   className="bg-white w-16 h-16 cursor-pointer rounded-full hover:bg-gray-400 text-black text-3xl p-4
                   transition-colors duration-200 shadow-md">
                    +
                </button>
            </Link>
        </div>
    )
}