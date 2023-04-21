import { NhostClient } from '@nhost/nhost-js';

const nhost = new NhostClient({
	subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
	region: process.env.REACT_APP_NHOST_REGION,
});

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };

