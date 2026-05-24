import { BrowserRouter, Routes, Route } from "react-router";
import PageComponents from "./pages/page-components";
import Layout from "./pages/layout";
import HomePage from "./pages/HomePage";
import PhotoDetails from "./pages/photoDetais";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        //layout define o layout base da aplicação, onde os componentes comuns
        como header, footer, sidebar podem ser definidos. O Outlet é usado para
        renderizar os componentes filhos dentro do layout.
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
          <Route path="/components" element={<PageComponents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
