import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

const AuthContext = createContext({
  user: null,
  login: async (_email, _password) => {},
  signup: async (_email, _password) => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const unsubscribe = auth.onAuthStateChanged((user) => {
    console.log("here");
    setUser(user);
    setLoading(false);
  });

  useEffect(() => unsubscribe);

  const signup = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
