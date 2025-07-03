import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { PageUnauthorized } from '../components/Global/Unauthorized/PageUnauthorized/PageUnauthorized';
import ResetPassword from '../components/Login/Password/ResetPassword';
import RegisterCorporate from '../components/Login/Register/RegisterCorporate';
import { permissionRole, roleRedirectMap } from '../constants/role';
import { LoadingOverlay } from '../components/Global/Loading/LoadingOverlay';
import { useAuthStore } from '../storage/authStore';
const urlBackendOld = import.meta.env.VITE_BACKEND_OLD_URL;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, crendital } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.role as string;
  const redirectUrl = getRedirectUrlByRole(role);

  // Si el rol requiere redirección al backend viejo
  if (permissionRole.includes(role)) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${urlBackendOld}${redirectUrl}`;

    const emailField = document.createElement('input');
    emailField.type = 'hidden';
    emailField.name = 'email';
    emailField.value = crendital.email;
    form.appendChild(emailField);

    const passwordField = document.createElement('input');
    passwordField.type = 'hidden';
    passwordField.name = 'password';
    passwordField.value = crendital.password;
    form.appendChild(passwordField);

    document.body.appendChild(form);

    setTimeout(() => {
      form.submit();
    }, 100);

    return <LoadingOverlay fullScreen message="Cargando..." />;
  }

  if (!permissionRole.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}


function getRedirectUrlByRole(role: string): string {
  if (!role) return '/login';
  return roleRedirectMap[role.toLowerCase()] ?? '/login';
}
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/test" replace />} />
      <Route path="/login/forgot" element={<ResetPassword />} />
      <Route path="/register-corporate" element={<RegisterCorporate />} />
      <Route
        path="/test"
        element={
          <ProtectedRoute>
            <div>Test authorized</div>
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<PageUnauthorized />} />
      <Route path="*" element={<Navigate to="/unauthorized" replace />} />
    </Routes>
  );
}

