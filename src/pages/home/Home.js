import React from 'react';
import './Home.scss';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { Sidebar } from '../../components/sidebar';

const Home = () => {
	useRedirectLoggedOutUser('/login');
	return (
		<>
			<div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden'>
				{/*container*/}
				<div className='container h-screen flex py-[19px]'>
					{/*Sidebar*/}
					<Sidebar />
				</div>
			</div>
		</>
	);
};

export default Home;
