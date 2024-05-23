function cadastrar(){
    var nomeVar = input_nome.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    console.log('Chegou ate aqui')
    
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == ""
    ) { 
        alert ("Mensagem de erro para todos os campos em branco");
    } else {
      console.log('Chegou ate aqui')
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
          senhaServer: senhaVar
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
       
    
    }
    }