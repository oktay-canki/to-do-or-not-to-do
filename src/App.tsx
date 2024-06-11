import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-dvh">
        <Navbar />
        <div className="flex flex-1 md:gap-10 w-11/12 items-center justify-center m-auto mt-4">
          <div className="min-h-full bg-black ">Left Side Panel</div>
          <div className="min-h-full flex-1 bg-black">Middle Tasks Panel</div>
          <div className="min-h-full bg-black ">Right Side Details Panel</div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
