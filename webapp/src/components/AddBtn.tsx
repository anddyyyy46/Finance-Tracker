import { Button } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router";



type ButtonProps = {
    pathName? : string;
    onclick: ()=>void

}

export default function AddBtn({onclick, pathName}: ButtonProps){
    const router = useRouter();
    const curRoute = router.pathname;
    return (
        <div className="absolute right-4 bottom-4">
            <Link href={`${pathName}/new`} className={curRoute === `${pathName}` ? 'font-bold' : ''}>
                    
                <Button onClick={onclick}
                    variant="outlined" >
                    +
                </Button>
            </Link>
        </div>
    )
}