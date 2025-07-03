import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import { RefreshTokenModal } from './components/Login/RefreshToken/RefreshToken';
import { useAuthStore } from './storage/authStore';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log(isAuthenticated, "test");
  return (
    <BrowserRouter>
      {isAuthenticated ? <AppRoutes />: (
        <div className="flex">
          <div className='w-full'>
            <AppRoutes />
            <RefreshTokenModal warningTime={120} />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;