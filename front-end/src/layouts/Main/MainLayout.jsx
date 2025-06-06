import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return(
        <div className="grid grid-cols-[300px_1fr]">
            <div className="bg-gray-50 p-2 border-r-[1px] border-black/20 shadow min-h-[650px]">
                <h1 className="text-orange-500 font-bold text-2xl text-center">Help Desk</h1>
            </div>
            <div className="p-2">
                <Outlet />
            </div>
        </div>
    )
}