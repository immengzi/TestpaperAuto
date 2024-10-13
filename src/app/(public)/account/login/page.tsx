import Link from "next/link";

const registerLink = {label: "Register", href: "/account/register"};
const forgetpwdLink = {label: "Forgetpwd", href: "/account/forgetpwd"};

export default function Login() {
    return (
        <div className="flex flex-col justify-center min-h-screen gap-5 px-9 pb-16 w-full max-w-lg mx-auto">
            <h2 className="mx-auto text-3xl font-bold">Login</h2>
            <form>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path
                                d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                        </svg>
                        <input type="email" className="grow" placeholder="email@example.com" required={true}/>
                    </label>
                </div>
                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-key-fill" viewBox="0 0 16 16">
                            <path
                                d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                        </svg>
                        <input type="password" className="grow" placeholder="Enter password" required={true}/>
                    </label>
                    <label className="label">
                        <Link href={forgetpwdLink.href} className={"label-text-alt link link-hover"}>
                            Forgot password?
                        </Link>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">
                        Login
                    </button>
                </div>
            </form>
            <div className="divider">OR</div>
            <div className="text-center">
                <p>Do not have an account?</p>
                <Link href={registerLink.href} className={"link link-primary"}>
                    Sign up now
                </Link>
            </div>
        </div>
    );
}