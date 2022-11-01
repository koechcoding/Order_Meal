import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter()});

global.window = {}
import localStorage from 'mock-local-Storage';
window.localStorage = global.localStorage

export default Enzyme;
