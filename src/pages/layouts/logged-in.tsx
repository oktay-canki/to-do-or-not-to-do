import Navbar from "../../components/common/Navbar";

type LoggedInLayoutProps = {
  children: React.ReactNode;
};

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({
  children,
}: LoggedInLayoutProps) => {
  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      {children}
    </div>
  );
};

export default LoggedInLayout;
