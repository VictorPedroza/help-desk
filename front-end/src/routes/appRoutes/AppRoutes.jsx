import { Routes, Route } from 'react-router-dom'
import { MainLayout, AuthLayout } from '@/layouts'

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<AuthLayout />}>
                </Route>
                <Route path='/Painel' element={<MainLayout />}>
                </Route>
            </Routes>
        </>
    )
}