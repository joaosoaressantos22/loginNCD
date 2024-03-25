// Credenciais de exemplo (poderiam vir de um banco de dados)
function salvarDados() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const pergunta = document.getElementById('pergunta').value;

    const data = `${login},${senha},${pergunta}\n`;

    // Cria um Blob com os dados CSV
    const blob = new Blob([data], { type: 'text/csv' });

    // Cria um objeto URL a partir do Blob
    const url = window.URL.createObjectURL(blob);

    // Cria um link para download e simula um clique nele
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dados.csv';
    document.body.appendChild(link);
    link.click();

    // Limpa o objeto URL criado
    window.URL.revokeObjectURL(url);
  }
  function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';

    fileInput.onchange = function() {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = function(event) {
        const content = event.target.result;
        const rows = content.split('\n').map(row => row.split(','));

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const login = row[0].trim();
          const senha = row[1].trim();

          if (login === username && senha === password) {
            alert('Login bem-sucedido!');
            return;
          }
        }

        alert('Login ou senha incorretos.');
      };

      reader.readAsText(file);
    };

    fileInput.click();
  }
