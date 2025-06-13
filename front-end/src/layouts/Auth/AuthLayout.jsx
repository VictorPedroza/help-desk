import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
    return(
        <div className="grid grid-cols-[500px_1fr]">
            <div className="bg-gray-50 p-2 border-r-[1px] border-black/20 shadow min-h-[650px]">
                <Outlet />
            </div>
            <div className="p-2">
                Test 2
            </div>
        </div>
    )
}