function DepartmentList({ departments = [] }) {
  return (
    <div className="list-container">
      <h2>Departamentos Cadastrados</h2>

      {departments.length === 0 ? (
        <p>Nenhum departamento cadastrado.</p>
      ) : (
        <ul>
          {departments.map((dept) => (
            <li key={dept.id} className="list-item">
              <strong>{dept.acronym}</strong> - {dept.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DepartmentList;