//perhaps we want just regular postgres library, but pg-promise will be fine
const pgp = require('pg-promise')(/*options*/)
//TODO: get credentials from a file not included in git
export default pgp('postgres://postgres:postgres@localhost:5432/va_trial')
