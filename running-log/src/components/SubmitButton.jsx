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