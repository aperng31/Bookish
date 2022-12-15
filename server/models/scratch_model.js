const { Pool } = require('pg');

//old DB
//postgres://jkmisjma:MKoKlVSfDfxQRGsUj-3Uiiro_J15wYxX@raja.db.elephantsql.com/jkmisjma
const PG_URI =
  'postgres://gesysjqu:GYiAX4YH4YxUgVUZTRYBjgUh6en856dD@ziggy.db.elephantsql.com/gesysjqu';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
