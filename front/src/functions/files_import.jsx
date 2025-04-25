import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function ImportarPatrimonios() {
  const [arquivo, setArquivo] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate()

  const handleArquivoChange = (event) => {
    setArquivo(event.target.files[0]);
  };

  const handleEnviar = async () => {
    if (!arquivo) {
      setMensagem('Selecione um arquivo JSON antes de enviar.');
      return;
    }

    const formData = new FormData();
    formData.append('arquivo', arquivo);

    try {
      const response = await axios.post('http://localhost:8000/api/importar/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMensagem(response.data.mensagem || 'Importação realizada com sucesso!');
      navigate('/home')
    } catch (error) {
      const erroMsg = error.response?.data?.erro || 'Erro ao importar o arquivo.';
      setMensagem(erroMsg);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Importar Patrimônios</h2>
      <input type="file" accept=".json" onChange={handleArquivoChange} />
      <br /><br />
      <button onClick={handleEnviar}>Enviar</button>
      <br /><br />
      {mensagem && <div><strong>{mensagem}</strong></div>}
    </div>
  );
}

export default ImportarPatrimonios;
