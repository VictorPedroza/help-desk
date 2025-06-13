import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
    return(
        <div 
            className="
                grid 
                grid-cols-1 
                sm:grid-cols-[500px_1fr]
            "
        >
            {/* Área de formulário */}
            <div className="bg-gray-50 p-2 border-r-[1px] border-black/20 shadow min-h-[650px]">
                <Outlet />
            </div>

            {/* Área secundária que some no mobile */}
            <div className="p-2 hidden sm:flex">
                Test 2
            </div>
        </div>
    )
}
