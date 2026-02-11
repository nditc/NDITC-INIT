export default function VerifySuccess() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-650 p-4 text-white">
      <div className="w-full max-w-lg space-y-4 text-center">
        <h1 className="Bebas GradText text-center text-3xl tracking-wide md:text-4xl 2xl:text-5xl">
          Account Email Verified!
        </h1>
        <p className="text-lg text-gray-300">
          Your account has been successfully verified. You can now log in to
          access your dashboard.
        </p>
        <div className="pt-4">
          <a
            href="/login"
            className="btn-prim Nunito mx-auto flex w-fit items-center justify-center rounded-full px-10 py-2 text-xl"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}
