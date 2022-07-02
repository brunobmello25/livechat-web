import { useEffect, useState, createContext, useContext } from "react";

export type User = {
  name: string;
};

export type ContextProps = {
  user: User | null;
  loading: boolean;
  updateUser: (user: User) => void;
};

const UserContext = createContext<ContextProps>({} as ContextProps);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);

      const localStorageUser = localStorage.getItem("user");

      if (localStorageUser) {
        setUser(JSON.parse(localStorageUser));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  function updateUser(newUser: User) {
    try {
      setLoading(true);

      localStorage.setItem("user", JSON.stringify(newUser));

      setUser(newUser);
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro desconhecido. Verifique o console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider value={{ loading, user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const context = useContext(UserContext);

  return context;
}

export { UserContext, UserProvider, useUser };
