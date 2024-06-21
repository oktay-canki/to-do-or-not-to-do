type LoggedOutLayoutProps = {
  children?: React.ReactNode;
};

const LoggedOutLayout = ({ children }: LoggedOutLayoutProps) => {
  return <div className="flex flex-col min-h-dvh">{children}</div>;
};

export default LoggedOutLayout;
