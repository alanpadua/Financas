import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Keycloak from 'keycloak-js';

// 1. Definimos o que o nosso Hook vai entregar para os outros componentes
interface AuthContextData {
    token: string | undefined;
    authenticated: boolean;
    logout: () => void;
    username: string | undefined;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'SistemaFinanceiro',
    clientId: 'finance-frontend',
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        keycloak.init({
            onLoad: 'login-required',
            pkceMethod: 'S256', // Padrão de segurança moderno
            checkLoginIframe: false
        }).then((auth) => {
            setAuthenticated(auth);
            setLoading(false);
        });
    }, []);

    const logout = () => keycloak.logout();

    if (loading) return <div>Carregando segurança...</div>;

    return (
        <AuthContext.Provider value={{
            token: keycloak.token,
            authenticated,
            logout,
            username: keycloak.tokenParsed?.preferred_username
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// O Hook que você vai usar em todo o projeto
export const useAuth = () => useContext(AuthContext);