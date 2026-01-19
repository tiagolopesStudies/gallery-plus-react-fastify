import { BrowserRouter, Route, Routes } from 'react-router'
import { ComponentsPage } from './pages/components'
import { HomePage } from './pages/home'
import { LayoutMain } from './pages/layouts/main'
import { PhotoDetailsPage } from './pages/photo-details'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route index element={<HomePage />} />
          <Route path="/componentes" element={<ComponentsPage />} />
          <Route path="/fotos/:id" element={<PhotoDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
