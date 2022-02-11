const YSQL = require('../index.js').YSQL;

describe("Getting YSQL client", function() {  
    let connectionString = "postgres://postgres@localhost:5433/postgres";
    beforeEach(function() {
        spyOn(YSQL, 'getPostgresClient');
        const ysqlClient = YSQL.getPostgresClient({connectionString});
    }); 
  
    it("calls getClient with configuration", function() {
      expect(YSQL.getPostgresClient).toHaveBeenCalledWith({connectionString});
    });
});