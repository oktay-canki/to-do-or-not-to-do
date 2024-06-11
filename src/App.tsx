import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="flex justify-center items-center w-full h-dvh">
        <div className="flex md:gap-10 w-11/12 h-[90dvh] items-center justify-center">
          <div className="min-h-full bg-black ">Left Side Panel</div>
          <div className="min-h-full flex-1 bg-black ">Middle Tasks Panel</div>
          <div className="min-h-full bg-black ">Right Side Details Panel</div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
