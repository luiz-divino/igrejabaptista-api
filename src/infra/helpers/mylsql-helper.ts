import { IDataBaseConnection } from "@/infra/Database-connection";
import mysql, { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class MySqlHelper implements IDataBaseConnection {
  private client: Pool | null = null;

  constructor(private readonly connectionString: string) {}

  async connect(): Promise<void> {
    if (!this.client) {
      this.client = mysql.createPool(this.connectionString);
    }
  }

  async query<T extends RowDataPacket[] | ResultSetHeader>(
    sql: string,
    params?: any[],
  ): Promise<T> {
    if (!this.client) await this.connect();
    const [rows] = await this.client!.execute<T>(sql, params);
    return rows;
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.end();
      this.client = null;
    }
  }
}
