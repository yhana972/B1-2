// message는 호출하는 페이지가 정합니다. role="status"는 진행 상황 안내임을 전달합니다.
function Loading({message}){
    return <p role="status">{message}</p>
}
export default Loading