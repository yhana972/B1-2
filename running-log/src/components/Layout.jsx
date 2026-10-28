import Header from "./Header"

// children은 부모가 태그 사이에 전달한 JSX입니다. 각 페이지를 공통 헤더 아래에 표시합니다.
function Layout({ children }) {
    return (
       <>
        <Header />
        <main className="main">{children}</main>
       </>
    )
}

export default Layout