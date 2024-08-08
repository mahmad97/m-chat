// import { authenticate } from '@/app/lib/actions'

const Page = () => {
	return (
		<form>
			<input type='email' name='email' placeholder='Email' required />
			<input type='password' name='password' placeholder='Password' required />
			<button type='submit'>Login</button>
		</form>
	);
};

export default Page;
