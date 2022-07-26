import { Client } from 'pg';
import createError from 'http-errors';
import logger from '../utils/logger';

export default class DatabaseConnection {
  constructor() {
    this.connectToDatabase();
  }

  connectToDatabase() {
    try {
      this.databaseClient = new Client();
      this.databaseClient.connect();
    } catch (error) {
      logger.logError(error);
      throw new createError.InternalServerError(`Internal Server Error ${error}`);
    }
  }

  getDatabaseClient() {
    return this.databaseClient;
  }
}
