import { useEffect, useState, createContext } from "react";

export type User = {
  name: string;
};

export type ContextProps = {
  user: User | null;
  loading: boolean;
};

const UserContext = createContext<ContextProps>({ user: null, loading: false });

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

  return (
    <UserContext.Provider value={{ loading, user }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
