const YCQL = require('../index.js').YCQL;

describe("Getting YCQL client", function() {
    let contactPoints = ['127.0.0.1']; 
    let loadBalancing = new YCQL.cassandraDriver.policies.loadBalancing.RoundRobinPolicy();
    let options = {contactPoints, policies:{loadBalancing}};
    beforeEach(function() {
        spyOn(YCQL.cassandraDriver, 'Client');
        const ycqlClient = YCQL.getCassandraClient(options);
    }); 
  
    it("calls getClient with options", function() {
      expect(YCQL.cassandraDriver.Client).toHaveBeenCalledWith(options);
    });
});