import { Toaster } from "sonner";
import Board from "./components/board";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Board />
      <Toaster />
    </>
  );
}

export default App;
