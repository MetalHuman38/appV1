import '../client/globals.css';
import ClickCounter from '../client/components/shared/ClickCounter';

const App = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world! - {process.env.NODE_ENV} - {process.env.name}
      </h1>
      <ClickCounter />
    </>
  );
};

export default App;
