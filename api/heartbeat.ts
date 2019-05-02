import handler from './handler';
import * as auth from './authenticate';

export default handler(async (req, userId) => {
    return "You are logged in as user " + userId;
}, auth.authenticate);
