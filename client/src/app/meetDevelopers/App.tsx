import DevelopersGrid from '@/components/DevelopersGrid';
import { developers } from '@/data/developers';

function App() {
  return (
    <div className="App">
      <DevelopersGrid developers={developers} />
    </div>
  );
}

export default App;