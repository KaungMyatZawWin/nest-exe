import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import mysql from 'mysql2/promise';
import dbConfig from './dbconfig';

@Injectable()
export class DbhelperService implements OnModuleInit, OnModuleDestroy {
  private pool: mysql.Pool;
  async onModuleInit() {
    this.pool = mysql.createPool(dbConfig);
  }

  async getConnection() {
    console.log("Database Connected (Connection Pool)'");
    
    return this.pool.getConnection();
  }

  async execute(query: string, params: any[] = []) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(query, params);
      return rows;
    } finally {
      connection.release();
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('❌ Database Disconnected (Connection Pool)');
  }
}
