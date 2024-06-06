import './globals.css';
import { ClickCounter } from './ClickCounter';

const App = () => {
  const name = "world";
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world! - {process.env.NODE_ENV}
      </h1>
      <ClickCounter />
    </>
  );
};

export default App;
