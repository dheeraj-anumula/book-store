import DatabaseConnection from './dbService';
import logger from '../utils/logger';

export default class ProductService {
  constructor() {
    this.productTableName = 'product';
    this.stockTableName = 'stock';
    const databaseConnection = new DatabaseConnection();
    this.databaseClient = databaseConnection.getDatabaseClient();
  }

  async getAllProducts() {
    const query = {
      text: `SELECT * FROM ${this.productTableName} p LEFT JOIN stock s ON p.id = s.product_id`,
    };
    logger.logInfo(`Executing query - ${query.text}`);
    const result = await this.databaseClient.query(query);

    return result.rows;
  }

  async getProductsById(productId) {
    const query = {
      text: `SELECT * FROM ${this.productTableName} p LEFT JOIN stock s ON p.id = s.product_id WHERE p.id = $1`,
      values: [productId],
    };
    logger.logInfo(`Executing query - ${query.text}`);
    const result = await this.databaseClient.query(query);
    const product = result.rows[0];
    return product;
  }

  async createProduct(product) {
    try {
      await this.databaseClient.query('BEGIN');

      const productInsert = `INSERT INTO ${this.productTableName}(title, description, price) VALUES ($1, $2, $3) RETURNING id`;
      const productInsertValues = [product.title, product.description, product.price];
      const stockInsert = `INSERT INTO ${this.stockTableName}(product_id, count) VALUES ($1, $2)`;

      const createdProduct = await this.databaseClient.query(productInsert, productInsertValues);
      const stockInsertValues = [createdProduct.rows[0].id, product.count];

      await this.databaseClient.query(stockInsert, stockInsertValues);
      await this.databaseClient.query('COMMIT');

      return createdProduct.rows[0].id;
    } catch (e) {
      await this.databaseClient.query('ROLLBACK');
      throw e;
    }
  }
}
