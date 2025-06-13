import { Outlet } from "react-router-dom"
import { FaAngleDown } from "react-icons/fa"

export const MainLayout = () => {
    return(
        <div className="grid grid-cols-[300px_1fr]">
            <div className="bg-gray-50 p-2 border-r-[1px] border-black/20 shadow min-h-[650px]">
                <h1 className="text-orange-500 font-bold text-2xl text-center mb-4">Help Desk</h1>
                <div>
                    <button className="px-3 py-2 bg-orange-500 text-white w-full flex justify-between rounded-md hover:bg-orange-600 transition-colors">
                        <p>Abrir Chamado</p>
                        <FaAngleDown className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
            <div className="p-2">
                <Outlet />
            </div>
        </div>
    )
}