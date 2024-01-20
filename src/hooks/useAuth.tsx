import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext was used outside of the AuthContextProvider");
  return context;
}
