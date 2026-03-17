import LoginHeader from "../components/login/LoginHeader"
import LoginForm from "../components/login/LoginForm"
import LoginFooter from "../components/login/LoginFooter"

export default function Login() {
  return (
    <div className="bg-background-light min-h-screen flex flex-col font-display">
      <LoginHeader />

      <main className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </main>

      <LoginFooter />
    </div>
  )
}
