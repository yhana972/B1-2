import Navigation from "./Navigation"

// 모든 페이지에서 공유하는 상단 영역입니다. 링크 구성은 Navigation이 담당합니다.
function Header(){
    return(
        <header>
            <Navigation />
        </header>
    )
}

export default Header