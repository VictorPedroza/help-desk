import axios from 'axios';

export const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita recarregar a página

    try {
      const response = await axios.post('http://localhost:8088/api/auth/login', {
        email: "admin@admin.com",
        password: "admin"
      },{
        withCredentials: true
      });
      console.log('Resposta da API:', response.data);
    } catch (error) {
      if(error.response.status === 401) {
        console.errors(error.response.message)
      }
    }
  };

  return (
    <div className="h-full w-full bg-red-200 flex flex-col items-center justify-center">
      <div className="bg-white w-full p-2 flex justify-center items-center">
        <h1 className="text-2xl font-bold font-sans uppercase">Login</h1>
      </div>

      <form onSubmit={handleLogin}>
        <button
          type="submit"
          className="bg-orange-500 px-4 py-2 text-xl rounded-lg shadow text-white font-bold mt-4"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};
