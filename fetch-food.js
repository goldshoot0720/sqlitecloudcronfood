import fs from 'fs';
import { Database } from '@sqlitecloud/drivers';

const db = new Database(process.env.SQLITECLOUD_URL);

(async () => {
  try {
    const result = await db.sql`SELECT * FROM food;`;
    fs.writeFileSync('food.json', JSON.stringify(result, null, 2));
    console.log('Saved food.json with', result.length, 'records');
    process.exit(0); // 確保 runner 結束
  } catch (err) {
    console.error('Query error:', err);
    process.exit(1); // 失敗也要 exit
  }
})();
