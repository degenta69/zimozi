import { FcGoogle } from "react-icons/fc";

interface RegistrationFormProps {
  error: string | null;
  handleGoogleLogin: () => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => void;
  handleRegister: (email: string, password: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  registration: boolean;
  setRegistration: (registration: boolean) => void;
}

export default function RegistrationForm({
  error,
  handleGoogleLogin,
  handleLogin,
  handleRegister,
  email,
  setEmail,
  password,
  setPassword,
  registration,
  setRegistration,
}: RegistrationFormProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
          {registration ? "Register" : "Sign in"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => handleLogin(e, email, password)}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full border rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              className="w-full border rounded-md p-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {registration ? (
            <button
              type="button"
              className="w-full bg-indigo-600 text-white p-2 rounded-md"
              onClick={() => handleRegister(email, password)}
            >
              Register
            </button>
          ) : (
            <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md">
              Sign in
            </button>
          )}
          <button
            type="button"
            className="w-full flex items-center justify-center border p-2 rounded-md mt-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="h-5 w-5" />
            <span className="ml-2">Sign in with Google</span>
          </button>
          <p className="text-center text-sm mt-4">
            {registration ? "Already have an account?" : "Don't have an account?"}{" "}
            <a
              className="text-indigo-600 cursor-pointer"
              onClick={() => setRegistration(!registration)}
            >
              {registration ? "Sign in" : "Register"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
