import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Keycloak from "keycloak-js";
import {AuthProvider} from "./context/AuthContext.tsx";

const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "SistemaFinanceiro",
    clientId: "finance-frontend"
});

try {
    const authenticated = await keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false
    })
    console.log(`Usuário está autenticado? ${authenticated}`);

    // Se chegou aqui, temos o TOKEN!
    console.log("Token de Acesso:", keycloak.token);
} catch (error) {
    console.error("Falha na autenticação", error)
}
createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <App/>
    </AuthProvider>,
)
