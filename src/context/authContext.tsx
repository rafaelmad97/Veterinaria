import { createContext, useState } from "react";

interface Authcontext {
  logged: boolean;
  methods: AuthMethods;
}

interface AuthMethods {}

const defaultauthContext: Authcontext = {
  logged: false,
};
export const AuthContext = createContext<Authcontext>(defaultauthContext);

function AuthState({ children }: any) {
  const [logged, setLogged] = useState(defaultauthContext.logged);

  return (
    <AuthContext.Provider
      value={{
        logged,
        methods: {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthState;
