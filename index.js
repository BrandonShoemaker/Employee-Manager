const Session = require('./lib/Session');

async function generateHTML(){
    let session = new Session();

    await session.setEmployees();

    
}