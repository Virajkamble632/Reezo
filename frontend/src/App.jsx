import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import socket from "./socket/socket";
import { useState } from "react";

function App() {

   useEffect(() => {
      socket.connect();
      return () => {
         socket.disconnect();
      };
   }, []);

   return <AppRoutes/>;
}

export default App;