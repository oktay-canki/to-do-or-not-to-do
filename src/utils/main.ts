import RequestError from "../types/RequestError";

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function isRequestError(error: unknown): error is RequestError {
  return (error as RequestError).code !== undefined;
}

export const firebaseErrorMessage = (error: RequestError): string => {
  let message;

  if (error.code === "auth/claims-too-large")
    message =
      "The claims payload exceeds the maximum allowed size of 1000 bytes";
  else if (error.code === "auth/email-already-exists")
    message = "The provided email is already in use by an existing user";
  else if (error.code === "auth/id-token-expired")
    message = "ID token is expired.";
  else if (error.code === "auth/id-token-revoked")
    message = "ID token has been revoked";
  else if (error.code === "auth/internal-error")
    message =
      "The Authentication server encountered an unexpected error while trying to process the request";
  else if (
    ["auth/invalid-credential", "auth/invalid-password"].includes(error.code)
  )
    message = "Invalid credentials";
  else if (error.code === "auth/invalid-email")
    message = "Email address is invalid";
  else if (error.code === "auth/invalid-id-token")
    message = "ID token is invalid";
  else if (error.code === "auth/invalid-uid") message = "Invalid UID";
  else if (error.code === "auth/missing-uid") message = "Missing UID";
  else if (error.code === "auth/session-cookie-expired")
    message = "Session cookie expired";
  else if (error.code === "auth/too-many-requests")
    message = "The number of requests exceeds the maximum allowed";
  else if (error.code === "auth/user-not-found")
    message =
      "There is no existing user record corresponding to the provided identifier";
  else message = error.message;

  return message;
};
