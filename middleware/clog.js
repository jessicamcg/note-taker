const clog = (req, res, next) => {
    switch (req.method) {
        case 'GET' :
            console.log(`${req.method} request to ${req.path}`);
            break;
        case 'POST': 
            console.log(`${req.method} request to ${req.path}`);
        default:
            break;
    }
}

exports.clog = clog;