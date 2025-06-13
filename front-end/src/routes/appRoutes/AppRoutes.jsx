import { Routes, Route, Link } from 'react-router-dom'
import { MainLayout, AuthLayout } from '@/layouts'
import { Main } from "@/pages"

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<AuthLayout />}>
                    <Route index element={
                        <Link
                            className='w-full px-3 py-2 bg-orange-500 text-white flex justify-between items-center rounded-md hover:bg-orange-600 transition-colors'
                            to="/Painel"
                        >
                            Entrar
                        </Link>
                    } />
                </Route>
                <Route path='/' element={<MainLayout />}>
                    <Route path='Painel' element={<Main />} />
                </Route>
            </Routes>
        </>
    )
}