import client from "@/config/appwrite.config";
import { Account } from "appwrite";

class AuthService {
  private static instance: AuthService;
  private static account: Account = new Account(client);

  public static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public login = (email: string, password: string) => {
    return AuthService.account.createEmailPasswordSession(email, password);
  };
  public register = async (data: any) => {
    const { email, password, userId, name }: any = data;
    return AuthService.account.create(userId, email, password, name);
  };

  public logout = () => {
    return AuthService.account.deleteSession("current");
  };

  public getAccount = () => {
    return AuthService.account.get();
  };
}

export default AuthService;
