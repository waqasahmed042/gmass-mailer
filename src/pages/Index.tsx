import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page as the main entry point
    navigate('/login');
  }, [navigate]);

  return null; // This component just redirects, no UI needed
};

export default Index;
