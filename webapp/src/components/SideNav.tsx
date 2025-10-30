import Link from "next/link";
import { useRouter } from "next/router";

export default function SideNav(){

  const router = useRouter();
  const pathname = router.pathname;


    return (
        <div id="SideNav" className="w-1/3 mr-8 border border-white rounded p-2">
            <ul className="flex flex-col h-full justify-between text-lg">
               
                    <li className="block">
                        <Link href="/home" className={`${pathname === '/home' ? 'font-bold' : ''} list-item`}>
                            Dashboard
                        </Link>
                        <Link href="/transactions" className={`${pathname === '/transactions' ? 'font-bold' : ''} list-item`}>
                            Transaktionen
                        </Link>
                    </li>
                <li>
                    <Link href="/settings" className={pathname === '/settings' ? 'font-bold' : ''}>
                        Einstellungen
                    </Link>
            
                </li>
            </ul>
            
        </div>
    )
}