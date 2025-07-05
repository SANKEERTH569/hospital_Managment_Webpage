import { pool } from '../config/database';

export interface IDoctor {
  id: string;
  name: string;
  department: string;
  email: string;
}

export class Doctor {
  static async getAll() {
    const query = 'SELECT * FROM doctors ORDER BY name';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id: string) {
    const query = 'SELECT * FROM doctors WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getByDepartment(department: string) {
    const query = 'SELECT * FROM doctors WHERE department = $1 ORDER BY name';
    const result = await pool.query(query, [department]);
    return result.rows;
  }
}
