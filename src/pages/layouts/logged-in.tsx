type LoggedInLayoutProps = {
  children: React.ReactNode;
};

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({
  children,
}: LoggedInLayoutProps) => {
  return <div className="flex flex-col min-h-dvh">{children}</div>;
};

export default LoggedInLayout;
