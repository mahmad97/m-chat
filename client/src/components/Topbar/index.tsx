import ThemeToggle from 'components/ThemeToggle';

const Topbar = () => {
	return (
		<div className='sticky top-0 w-full border-b border-slate-300 dark:border-slate-700 backdrop-blur'>
			<div className='max-w-screen-xl p-4 mx-auto flex justify-between'>
				<h1>m-chat</h1>
				<div className='flex'>
					<ThemeToggle />
					<div>User info</div>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
