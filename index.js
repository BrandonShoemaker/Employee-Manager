const Session = require('./lib/Session');

async function getSession(){
    let session = new Session();
    session.setEmployees();  
}
getSession();