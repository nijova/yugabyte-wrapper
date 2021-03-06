# Yugabyte npm

Yugabyte's YSQL and YCQL drivers for postgres and cassandra in one single package

Check it out at [https://www.npmjs.com/package/yugabyte](https://www.npmjs.com/package/yugabyte)

## Installation

Install the package in your nodeJS project:

```
npm install -S yugabyte
```

## Usage

You can use either the YSQL or YCQL driver.

Refer to the ./examples  to see basic usage of the drivers.

### YSQL

Require the driver, set the configuration, create the client: 

```
const YSQL = require('yugabyte').YSQL;
const config = {};
const ysqlClient = YSQL.getPostgresClient(config);
```

### YCQL

Require the driver, set the options, create the client: 

```
const YCQL = require('yugabyte').YCQL;
const options = {};
const ycqlClient = YCQL.getCassandraClient(options);
```

