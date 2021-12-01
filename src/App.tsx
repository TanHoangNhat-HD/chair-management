import { Route, Routes, Navigate } from 'react-router';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/layout';
import { NotFound, PrivateRoute } from 'components/common';
import '../node_modules/antd/dist/antd.css';
import AuthProvider from 'contexts/authContext';
import ChairManagement from 'features/chair/pages/ChairManagement';
import UserManagement from 'features/user/pages/UserManagement';
import AddEditChair from 'features/chair/pages/AddEditChair';
import ShowChair from 'features/chair/pages/ShowChair';
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="chairs" element={<ChairManagement />}>
              <Route path="" element={<ShowChair />} />
              <Route path="add" element={<AddEditChair />} />
              <Route path="edit/:chairId" element={<AddEditChair />} />
            </Route>
            <Route path="users" element={<UserManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
