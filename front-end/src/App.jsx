import { AppRoutes } from "@/routes";

function App() {
  return(
    <div className="w-screen h-screen sm:p-8 bg-gradient-to-tl from-gray-200 via-gray-400 to-gray-600">
      <div className="bg-white rounded-md w-full h-full shadow-md border-black/20 overflow-hidden">
        <AppRoutes />
      </div>
    </div>
  )
}

export default App;