import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Basics } from './pages/Basics';
import { Advanced } from './pages/Advanced';
import { Playground } from './pages/Playground';
import { Quiz } from './pages/Quiz';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/basics/:topicId" element={<Basics />} />
          <Route path="/advanced" element={<Advanced />} />
          <Route path="/advanced/:topicId" element={<Advanced />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
