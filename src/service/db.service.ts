import client from "@/config/appwrite.config";
import { Databases, Permission, ID, Role } from "appwrite";

class DBService {
  private static instance: DBService;
  private db: Databases = new Databases(client);

  public static getInstance() {
    if (!DBService.instance) {
      DBService.instance = new DBService();
    }

    return DBService.instance;
  }

  public create = (data: any, success: any) => {
    const { userId } = data;
    console.log(data)
    this.db
      .createDocument(
        process.env.NEXT_APPWRITE_DB_ID as string,
        process.env.NEXT_APPWRITE_COLLECTION_ID as string,
        ID.unique(),
        data,
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
          Permission.write(Role.user(userId)),
        ],
      )
      .then(() => {
        success(true);
      })
      .catch((error: any) => {
        console.log(error);
        success(false);
      });
  };
}

export default DBService;
