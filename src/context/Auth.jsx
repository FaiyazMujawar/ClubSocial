import { createContext, useContext, useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { auth } from "../firebase/config";

const AuthContext = createContext({
  user: null,
  login: async (_email, _password) => {},
  signup: async (_email, _password) => {},
  logout: async () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const unsubscribe = auth.onAuthStateChanged((user) => {
    console.log({ user });
    setUser(user);
    setLoading(false);
  });

  useEffect(() => unsubscribe);

  const signup = async (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = async (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const logout = async () => auth.signOut();
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
