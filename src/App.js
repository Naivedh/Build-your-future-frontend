import Routes from './components/Routing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { TutorContextProvider } from './TutorContextProvider';
import { SearchContextProvider } from './SearchContextProvider';
import { AuthContextProvider } from './context/AuthContextProvider';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <TutorContextProvider>
        <SearchContextProvider>
          <Navbar/>
            <Routes/>
          <Footer/>
        </SearchContextProvider>
      </TutorContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
