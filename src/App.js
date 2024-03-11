import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.js';
import { io } from 'socket.io-client';
import SocketContext from './context/SocketContext';

// page
import Home from './pages/home/Home.js';
import Login from './pages/auth/Login.js';
import Register from './pages/auth/Register.js';
import Forgot from './pages/auth/Forgot.js';
import Reset from './pages/auth/Reset.js';
import LoginWithCode from './pages/auth/LoginWithCode.js';
import Verify from './pages/auth/Verify.js';
import Profile from './pages/profile/Profile.js';
import ChangePassword from './pages/changePassword/ChangePassword.js';
import UserList from './pages/userList/UserList.js';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from './redux/features/auth/authSlice.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

axios.defaults.withCredentials = true;

//socket io
const socket = io(process.env.REACT_APP_BACKEND_URL.split('/api/v1')[0]);

function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const user = useSelector(selectUser);

	useEffect(() => {
		dispatch(getLoginStatus());
		if (isLoggedIn && user === null) {
			dispatch(getUser());
		}
	}, [dispatch, isLoggedIn, user]);

	return (
		<div className='dark'>
			<SocketContext.Provider value={socket}>
				<Router>
					<ToastContainer />
					<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
						<Routes>
							<Route
								path='/'
								element={
									<Layout>
										<Home socket={socket} />
									</Layout>
								}
							/>
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='/forgot' element={<Forgot />} />
							<Route path='/resetPassword/:resetToken' element={<Reset />} />
							<Route path='/loginWithCode/:email' element={<LoginWithCode />} />
							<Route
								path='/verify/:verificationToken'
								element={
									<Layout>
										<Verify />
									</Layout>
								}
							/>
							<Route
								path='/profile'
								element={
									<Layout>
										<Profile />
									</Layout>
								}
							/>
							<Route
								path='/changePassword'
								element={
									<Layout>
										<ChangePassword />
									</Layout>
								}
							/>
							<Route
								path='/users'
								element={
									<Layout>
										<UserList />
									</Layout>
								}
							/>
						</Routes>
					</GoogleOAuthProvider>
				</Router>
			</SocketContext.Provider>
		</div>
	);
}

export default App;
