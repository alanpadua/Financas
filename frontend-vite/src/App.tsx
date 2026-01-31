import './App.css'
import {useAuth} from "./context/AuthContext.tsx";

function App() {
    const {username, logout, token} = useAuth();
    return (
        <div>
            <h1>💰 Sistema Financeiro</h1>
            <p>Bem-vindo, <strong>{username}</strong>!</p>
            <button onClick={logout}>Sair</button>

            <div style={{marginTop: '20px', fontSize: '10px'}}>
                <strong>Seu Token (será enviado para o Backend):</strong>
                <pre>{token?.substring(0, 50)}...</pre>
            </div>
        </div>
    )
}

export default App
