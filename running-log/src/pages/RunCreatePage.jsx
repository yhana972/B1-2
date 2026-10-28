import RunForm from "../components/RunForm";

// initialData와 mode를 생략해 RunForm의 기본값(빈 입력값, create 모드)을 사용합니다.
function RunCreatePage(){
    return(
        <section className="run_form">
            <h2>새 러닝 기록</h2>
            <RunForm />
            </section>
    )
}
export default RunCreatePage