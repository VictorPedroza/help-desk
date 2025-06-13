import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Sidebar } from "@/components";
import { useSidebar } from "@/hooks";

export const MainLayout = () => {
    const { isOpen, toggle, close } = useSidebar(false)

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar.Root isOpen={isOpen} >
                <Sidebar.Title text="Help Desk"/>
                <Sidebar.Dropdown>
                    <Sidebar.Item to="/Painel" text="Adicionar" onClick={close} />
                    <Sidebar.Item to="/Painel" text="Editar" onClick={close} />
                    <Sidebar.Item to="/Painel" text="Excluir" onClick={close} />
                </Sidebar.Dropdown>
                <Sidebar.Item to="/Painel" text="Meus Chamados" onClick={close} />
            </Sidebar.Root>

            {/* Botão Hamburguer no mobile */}
            <div className="sm:hidden fixed top-4 right-4 z-30">
                <button 
                    onClick={toggle}
                    className="bg-orange-500 text-white p-2 rounded-md shadow-md hover:bg-orange-600 transition-colors"
                >
                    <FaBars className="w-6 h-6" />
                </button>
            </div>

            {/* Conteúdo Principal */}
            <div className="flex-1 p-4 sm:ml-[300px]">
                <Outlet />
            </div>
        </div>
    );
};
