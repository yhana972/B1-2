// 요청 실패와 구분해, 정상 조회했지만 표시할 데이터가 없는 상황을 안내합니다.
function EmptyState({message}){
    return <p>{message}</p>
}
export default EmptyState