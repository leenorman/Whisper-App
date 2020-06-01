if(process.env.NODE_ENV==='production'){
    module.exports = require('./prod')
}else{
    module.exports = require('./dev')
}

// Atlas API uses HTTP Digest Authentication. It essentially requires a username and a password which are hashed using a unique server-generated value called a nonce. The username is the API public key and the password is the corresponding private key.