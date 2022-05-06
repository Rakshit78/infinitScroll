import { useLocation } from 'react-router-dom';
const Jsondata: React.FC = () => {
  const data = useLocation().state;
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Jsondata;
