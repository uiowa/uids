// import the uids
import '../../../src/assets/scss/navbar.module.scss';

// Javascript in fractal is plain es5, we need to import it into a module, we then can "safely" the window scope to make it available
import { uidsUtils } from 'exports-loader?exports=uidsUtils!../../../src/components/proposals/brand/navbar/navbar';

window.uidsUtils = uidsUtils;
