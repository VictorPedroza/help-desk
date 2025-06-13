import { FaAngleDown } from "react-icons/fa";

import { useDropdown } from "@/hooks"

export const Dropdown = ({ children }) => {
    const { isOpen: dropdownOpen, toggle: toggleDropdown } = useDropdown(false);

    return (
        <nav>
            <div>
                <button
                    onClick={toggleDropdown}
                    className="w-full px-3 py-2 bg-orange-500 text-white flex justify-between items-center rounded-md hover:bg-orange-600 transition-colors"
                >
                    <span>Abrir Chamado</span>
                    <FaAngleDown
                        className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {dropdownOpen && (
                    <div className="mt-1 space-y-1 bg-white border border-gray-300 rounded-md shadow">
                        {children}
                    </div>
                )}
            </div>
        </nav>
    )
}