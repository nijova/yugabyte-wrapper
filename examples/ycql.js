let loadBalancing = new cassandraDriver.policies.loadBalancing.RoundRobinPolicy();
let contactPoints = ['127.0.0.1']; 
const cassandraClient = getCassandraClient({contactPoints, loadBalancing});