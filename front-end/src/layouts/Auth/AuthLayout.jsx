import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
    return (
        <div
            className="
                grid 
                grid-cols-1 
                lg:grid-cols-[400px_1fr]
                h-full
            "
        >
            {/* Área de formulário */}
            <div className="bg-gray-50 p-2 border-r-[1px] border-black/20 shadow h-full">
                <Outlet />
            </div>

            {/* Área secundária que some no mobile */}
            <div className="hidden lg:flex">
                <div className="h-full w-full flex justify-center items-center overflow-hidden">
                    <img src="/ilustrator.jpg" alt="Imagem ilustrativa" className="h-[80%] w-[80%] overflow-hidden flex justify-center items-center" />
                </div>
            </div>
        </div>
    )
}
