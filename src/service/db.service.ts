import client from "@/config/appwrite.config";
import { Databases, Permission, ID, Role, Query } from "appwrite";

class DBService {
  private static instance: DBService;
  private db: Databases = new Databases(client);

  public static getInstance() {
    if (!DBService.instance) {
      DBService.instance = new DBService();
    }

    return DBService.instance;
  }

  public getDocuments = async (userId: string) => {
    return await this.db.listDocuments(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      [Query.equal("userId", [userId])],
    );
  };

  public getDocument = async (docId: string) => {
    return await this.db.getDocument(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      docId,
    );
  };

  public getDocumentsByTarget = async (userId: string, target: string, value: string) => {
    return await this.db.listDocuments(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      [Query.equal("userId", [userId]), Query.equal(target, [value])],
    );
  };

  public getDocumentsOfAmount = async (userId: string, type: string) => {
    return await this.db.listDocuments(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      [
        Query.equal("userId", [userId]),
        Query.equal("type", [type]),
        Query.select(["type", "amount", "userId"]),
      ],
    );
  };

  public getDocumentsOfTypeCategory = async (userId: string) => {
    return await this.db.listDocuments(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      [
        Query.equal("userId", [userId]),
        Query.select(["type", "category", "amount", "userId"]),
      ],
    );
  };

  public getDocumentsBySearch = async (userId: string, keyword: string) => {
    return await this.db.listDocuments(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      [Query.equal("userId", [userId]), Query.search("name", keyword)],
    );
  };

  public create = async (data: any) => {
    const { userId } = data;
    console.log(data);
    await this.db.createDocument(
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
    );
  };

  public update = async (docId: string, data: any) => {
    return await this.db.updateDocument(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      docId,
      data,
    );
  };

  public delete = async (docId: string) => {
    return await this.db.deleteDocument(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      docId,
    );
  };
}

export default DBService;
