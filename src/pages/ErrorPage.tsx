import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-full min-h-dvh py-8 flex flex-col items-center justify-center text-center">
      {isRouteErrorResponse(error) ? (
        <>
          <div className="bg-slate-400 md:rounded-lg py-2 mb-8">
            <img
              className="w-2/4 m-auto"
              src={
                error.status == 404
                  ? "/images/taken-illustration.svg"
                  : "/images/error-illustration.svg"
              }
            />
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold">
            {error.status} - {error.statusText}
          </h1>
          {error.data?.message && (
            <p className="mt-4 text-xl text-secondary-text">
              {error.data.message}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="bg-slate-400 md:rounded-lg py-2 mb-8">
            <img
              className="w-2/4 m-auto"
              src="/images/error-illustration.svg"
            />
          </div>
          <p className="mt-4 text-2xl  ">
            Sorry, an unexpected error has occurred.
          </p>
        </>
      )}
    </div>
  );
};

export default ErrorPage;
