import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export interface IDataBaseConnection {
  query<T extends RowDataPacket[] | ResultSetHeader>(
    sql: string,
    params?: any[],
  ): Promise<T>;
  close(): Promise<void>;
  connect(): Promise<void>;
}
