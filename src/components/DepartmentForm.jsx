import { useState } from "react";

function DepartmentForm({ onCadastrar, departments = [] }) {
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nome = name.trim();
    const sigla = acronym.trim().toUpperCase();

    if (!nome) {
      setError("Digite o nome do departamento.");
      return;
    }

    if (!/^[A-Za-zÀ-ÿ]{2,5}$/.test(sigla)) {
      setError("A sigla deve conter entre 2 e 5 letras.");
      return;
    }

    const acronymExists = departments.some(
      (dept) => dept.acronym?.toUpperCase() === sigla
    );

    if (acronymExists) {
      setError("Esta sigla já está cadastrada em outro departamento.");
      return;
    }

    setIsSubmitting(true);

    const newDepartment = {
      name: nome,
      acronym: sigla
    };

    try {
      await onCadastrar(newDepartment);
      setName("");
      setAcronym("");
    } catch (error) {
      setError("Não foi possível cadastrar o departamento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Departamento</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Nome do Departamento:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Sigla:
          <input
            type="text"
            value={acronym}
            onChange={(e) => setAcronym(e.target.value)}
            required
            maxLength={5}
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}

export default DepartmentForm;