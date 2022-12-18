import './WrongAcsess.css'

function WrongAcsess() {
    return (
        <div className="wrongAcsess">
            <h1>Ви немаєте доступу до цих даних!</h1>
            <a className="wrLink" href='http://localhost:3000/login'>УВІЙТИ В СИСТЕМУ</a>
            <a className="wrLink" href='http://localhost:3000/'>НА ГОЛОВНУ</a>
        </div>
    );
}
  
export default WrongAcsess;