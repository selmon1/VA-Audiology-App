import handler from './handler';
import * as auth from './authenticate';

export default handler((request) => {
  return 'Hello, world!';
}, auth.alwaysPermitted);
