import { useFetch } from "./hooks/useFetch.js";
import DepartmentForm from "./components/DepartmentForm.jsx";
import DepartmentList from "./components/DepartmentList.jsx";
import "./App.css";

const url = "http://localhost:3000/departments";

function App() {
  const { data: departments, setData: setDepartments, loading } = useFetch(url);

  const handleCadastrar = async (novoDepto) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoDepto),
      });

      const deptoSalvo = await res.json();
      setDepartments((prev) => [...prev, deptoSalvo]);
    } catch (error) {
      console.error("Erro ao realizar o POST:", error);
    }
  };

  return (
    <div>

      <header>
        <h1>Gerenciamento de Departamentos</h1>
        <p>
          Cadastre e acompanhe os departamentos da empresa.
        </p>
      </header>

      <DepartmentForm onCadastrar={handleCadastrar} departments={departments} />

      {loading && <p>Carregando...</p>}

      {!loading && <DepartmentList departments={departments} />}
    </div>
  );
}

export default App;
