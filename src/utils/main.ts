import RequestError from "../types/RequestError";
import TaskGroup from "../types/TaskGroup";

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
  else if (error.code === "aborted") message = "The operation was aborted";
  else if (error.code === "already-exists")
    message = "The document you're trying to create already exists";
  else if (error.code === "cancelled") message = "The operation was cancelled";
  else if (error.code === "data-loss")
    message = "Unrecoverable data loss or corruption";
  else if (error.code === "deadline-exceeded")
    message = "Operation took too long to complete";
  else if (error.code === "aborted")
    message = "Operation took too long to complete";
  else if (error.code === "failed-precondition")
    message =
      "The operation was rejected because it was invalid in the current state";
  else if (error.code === "internal") message = "An internal error occurred";
  else if (error.code === "invalid-argument")
    message = "The client specified an invalid argument";
  else if (error.code === "not-found")
    message = "The specified document was not found";
  else if (error.code === "out-of-range")
    message = "Operation was attempted past the valid range.";
  else if (error.code === "permission-denied")
    message = "Insufficient permission to execute the specified operation";
  else if (error.code === "resource-exhausted")
    message = "The resource you are trying to access has been exhausted";
  else if (error.code === "unauthenticated")
    message =
      "The request does not have valid authentication credentials for the operation";
  else if (error.code === "unavailable")
    message =
      "The service is currently unavailable. This is a transient condition and may be corrected by retrying with a backoff";
  else if (error.code === "unimplemented")
    message =
      "Operation is not implemented or not supported/enabled in this service";
  else if (error.code === "unknown")
    message = "Unknown error or an error from a different error domain.";
  else if (error.detailMessage) message = error.detailMessage;
  else if (error.message) message = error.message;
  else message = "An unknown error occurred";

  return message;
};

export const sortByGroupOrder = (
  taskGroups: TaskGroup[],
  asc: boolean = true
) => {
  return taskGroups.sort((a, b) =>
    asc ? a.groupOrder - b.groupOrder : b.groupOrder - a.groupOrder
  );
};
