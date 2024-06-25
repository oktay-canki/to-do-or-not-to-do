import { SidebarProvider } from "../../contexts/SidebarContext";

type LoggedInLayoutProps = {
  children: React.ReactNode;
};

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({
  children,
}: LoggedInLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-dvh">{children}</div>
    </SidebarProvider>
  );
};

export default LoggedInLayout;
