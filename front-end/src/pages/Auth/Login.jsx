export const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você trata o login (ex: valida, envia pro backend etc)
        console.log("Login enviado!");
    };

    return (
        <div className="p-4 max-w-md mx-auto flex flex-col ">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1 text-sm font-medium">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};
