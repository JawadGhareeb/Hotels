import {
  useState,
  useContext,
  useEffect,
  Fragment,
  createContext,
} from "react";
import { account } from "../appwrite/appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
const Auth = createContext();

export const AuthContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const Login = async (userInfo) => {
    setLoading(true);
    try {
      let response = await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const Logout = () => {
    account.deleteSession("current");
    setUser(null);
  };
  const Register = async (userInfo) => {
    setLoading(true);
    try {
      let response = await account.create(
        ID.unique(),
        userInfo.Email,
        userInfo.Pass1,
        userInfo.Name
      );
      await account.createEmailSession(userInfo.Email, userInfo.Pass1);
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const userContext = {
    user,
    Login,
    Logout,
    Register,
  };
  const checkUser = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    setTimeout(() => {
      checkUser();
    }, 2000);
  }, []);
  return (
    <Fragment>
      <Auth.Provider value={userContext}>{children}</Auth.Provider>
    </Fragment>
  );
};
export const useAuth = () => {
  return useContext(Auth);
};
