import 'babel-polyfill';
const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: false });