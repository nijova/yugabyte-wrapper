const YSQL = require('../index.js').YSQL;

describe("Getting YSQL client", function() {  
    let connectionString = "postgres://postgres@localhost:5433/postgres";
    let configuration = {connectionString};
    beforeEach(function() {
        spyOn(YSQL.postgresDriver, 'Client');
        const ysqlClient = YSQL.getPostgresClient(configuration);
    }); 
  
    it("calls getClient with configuration", function() {
      expect(YSQL.postgresDriver.Client).toHaveBeenCalledWith(configuration);
    });
});