import { environment } from '../environments/environment';

import { DevURLConfig } from './dev-url.config';
import { ProdURLConfig } from './prod-url.config';

let config = environment.production ? ProdURLConfig : DevURLConfig;

export const URLConfig = config;