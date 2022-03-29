import Routes from './components/Routing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { TutorContextProvider } from './TutorContextProvider';
import { SearchContextProvider } from './SearchContextProvider';

function App() {
  return (
    <div className="App">
      <TutorContextProvider>
        <SearchContextProvider>
          <Navbar/>
            <Routes/>
          <Footer/>
        </SearchContextProvider>
      </TutorContextProvider>
    </div>
  );
}

export default App;
