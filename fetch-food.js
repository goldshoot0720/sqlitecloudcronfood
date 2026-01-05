import fs from 'fs';
import { Database } from '@sqlitecloud/drivers';

// 連到正確的資料庫
const db = new Database(process.env.SQLITECLOUD_URL);

(async () => {
  try {
    const result = await db.sql`SELECT * FROM food;`;
    if (!result) throw new Error('No data returned from SQLiteCloud');
    fs.writeFileSync('food.json', JSON.stringify(result, null, 2));
    console.log('Saved food.json with', result.length, 'records');
  } catch (err) {
    console.error('Query error:', err);
    process.exit(1);
  }
})();
