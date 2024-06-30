import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import LoadingProvider from "./provider/IsLoadingProvider.jsx";

const App = () => {
  return (
    <LoadingProvider>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </LoadingProvider>
  );
};

export default App;



// ! With profiler for developing

// import React, { Profiler } from "react";
// import Header from "./components/Header.jsx";
// import { Outlet } from "react-router-dom";
// import { Container } from "react-bootstrap";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import LoadingProvider from "./provider/IsLoadingProvider.jsx";

// const onRenderCallback = (
//   id,
//   phase,
//   actualDuration,
//   baseDuration,
//   startTime,
//   commitTime,
//   interactions
// ) => {
//   console.log({
//     id,
//     phase,
//     actualDuration,
//     baseDuration,
//     startTime,
//     commitTime,
//     interactions
//   });
// };

// const App = () => {
//   return (
//     <LoadingProvider>
//       <Profiler id="Header" onRender={onRenderCallback}>
//         <Header />
//       </Profiler>
//       <ToastContainer />
//       <Container className="my-2">
//         <Profiler id="Outlet" onRender={onRenderCallback}>
//           <Outlet />
//         </Profiler>
//       </Container>
//     </LoadingProvider>
//   );
// };

// export default App;