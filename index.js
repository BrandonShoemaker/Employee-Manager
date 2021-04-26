const Session = require('./lib/Session');

// starts everything
function getSession(){
    let session = new Session();
    session.setEmployees();  
}
getSession();