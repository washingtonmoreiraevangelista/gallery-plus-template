import { BrowserRouter, Routes, Route } from "react-router-dom"
import PageComponents from "./pages/page-components"
import Layout from "./pages/layout"
import PhotoDetails from "./pages/photoDetais"
import HomePage from "./pages/homePage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NuqsAdapter } from "nuqs/adapters/react-router/v7"
import { Toaster } from "sonner"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" />
      <BrowserRouter>
        <NuqsAdapter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/photos/:id" element={<PhotoDetails />} />
              <Route path="/components" element={<PageComponents />} />
            </Route>
          </Routes>
        </NuqsAdapter>
      </BrowserRouter>
    </QueryClientProvider>
  )
}