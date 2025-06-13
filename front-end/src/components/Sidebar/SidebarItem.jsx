import { useSidebar } from '@/hooks'
import { Link } from 'react-router-dom';

export const Item = ({ to, text }) => {
    const { close: closeSidebar } = useSidebar();
    return (
        <Link
            to={to}
            className="block px-3 py-2 rounded-md hover:bg-orange-100 transition-colors"
            onClick={closeSidebar}
        >
            {text}
        </Link>
    )
}