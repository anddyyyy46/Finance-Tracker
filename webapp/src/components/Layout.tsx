import Header from "./Header";
import SideNav from "./SideNav";

export default function Layout({ children }: { children: React.ReactNode }){
    return(
        <div className="w-full h-full flex justify-center items-center ">
            <div className="w-[90%] h-[90%]">
                <Header></Header>
            <div className="flex w-full h-[90%] overflow-auto">
                <SideNav></SideNav>
                <main className="w-2/3 border border-white relative">{children}</main>
            </div>
            
            </div>
        </div>
    )
}