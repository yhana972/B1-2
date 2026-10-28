// 제출 state는 부모 폼이 관리합니다. 버튼은 전달받은 상태와 문구를 화면에 반영합니다.
// disabled에는 boolean을, 태그 안에는 사용자에게 보여줄 문자열을 넣습니다.
function SubmitButton({isSubmitting, label}){
    return(
        <button type="submit" disabled={isSubmitting}>
            {
                isSubmitting?'저장 중...':label
            }
        </button>
    )
}
export default SubmitButton