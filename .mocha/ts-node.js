process.env.NODE_ENV = 'test';

require('ts-node').register({
    project: __dirname + '/../tsconfig.json'
});
