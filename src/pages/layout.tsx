import { Outlet } from "react-router-dom"
import Header from "../components/header"
import Content from "../components/content"

export default function Layout() {
  return (
    <>
      <Header className="mt-9" />
      <Content>
        <Outlet />
      </Content>
    </>
  )
}
