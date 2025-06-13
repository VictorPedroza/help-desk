import { Routes, Route } from 'react-router-dom'
import { MainLayout, AuthLayout } from '@/layouts'
import { Main } from "@/pages"

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<AuthLayout />}>
                </Route>
                <Route path='/' element={<MainLayout />}>
                    <Route path='Painel' element={<Main />} />
                </Route>
            </Routes>
        </>
    )
}