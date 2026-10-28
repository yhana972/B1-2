// 조회·저장·삭제 실패에서 같은 UI를 사용합니다. role="alert"는 오류 안내임을 전달합니다.
function ErrorState({message}){
    return <p role="alert">{message}</p>
}
export default ErrorState