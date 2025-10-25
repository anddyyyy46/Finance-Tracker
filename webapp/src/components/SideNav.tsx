import Link from "next/link";
import { useRouter } from "next/router";

export default function SideNav(){

  const router = useRouter();
  const pathname = router.pathname;


    return (
        <div id="SideNav" className="w-1/3 mr-8 border border-white">
            <ul>
                <li>
                <Link href="/transactions" className={pathname === '/transactions' ? 'font-bold' : ''}>
                    Transactions
                </Link>
            
                </li>
                <li>
                <Link href="/settings" className={pathname === '/settings' ? 'font-bold' : ''}>
                    Settings
                </Link>
            
                </li>
            </ul>
            
        </div>
    )
}