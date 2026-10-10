import { IDataBaseConnection } from "@/infra/contracts/Database-connection";
import mysql, { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class MySqlHelper implements IDataBaseConnection {
  private client: Pool | null = null;

  async connect(): Promise<void> {
    if (!this.client) {
      this.client = mysql.createPool({
        uri: process.env.DATABASE_URL || "",
        connectionLimit: 10,
        waitForConnections: true,
      });
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
