import Nav from './Nav';
import Tabs from './Tabs';

const App = () => {
    // use Load as default state
    // const [CurrentTab, setCurrentTab] = useState('main');

    return (
        <div className="container-fluid vh-100 overflow-auto flex-grow-1 position-relative">
            <div className="row h-100">

                <div className="col content">
                  <Tabs />
                </div>
                
                <div className="col-3 menu bg-light shadow">
                    <Nav />
                </div>


            </div>
        </div>
    );
}

export default App;
