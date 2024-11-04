import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect the user to the '/map' page when the index page loads
    navigate('/map');
  }, [navigate]);

  return (
    <div className='container'>
    </div>
  );
};

export default IndexPage;
