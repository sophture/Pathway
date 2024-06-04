function cadastrar(){
    var nomeVar = input_nome.value;
    var emailVar = input_email.value;
    var cidadeEscolhidaVar =  select_cidades.value;
    var senhaVar = input_senha.value;
    
    if (
      nomeVar == "" ||
      emailVar == "" ||
      cidadeEscolhidaVar == "" ||
      senhaVar == ""
    ) { 
        alert ("Mensagem de erro para todos os campos em branco");
    } else {
      console.log('Chegou até aqui')

      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/usuario.js
          nomeServer: nomeVar,
          emailServer: emailVar,
          cidadeEscolhidaServer : cidadeEscolhidaVar,
          senhaServer: senhaVar
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
          window.location = "../tela-login.html";
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
       
    
    }
    }