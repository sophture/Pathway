function senhasIguais() {
  let senha = input_senha.value;
  let confirmacaoSenha = input_confirmacao_senha.value;

  if (senha != confirmacaoSenha) {
    alert_senhas_erradas.style.display = "block"
    alert_senhas_erradas.innerHTML = "As senhas precisam ser iguais"
  } else {
    alert_senhas_erradas.style.display = "none"
  }
}


function cadastrar() {
  let nomeVar = input_nome.value;
  let emailVar = input_email.value;
  let cidadeEscolhidaVar = select_cidades.value;
  let senhaVar = input_senha.value;
  let confirmacaoSenhaVar = input_confirmacao_senha.value;

  if (
    nomeVar == "" ||
    emailVar == "" ||
    cidadeEscolhidaVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == ""
  ) {
    mensagem_erro.setAttribute('open', '')
    mensagem_erro.innerHTML = `
    <div>
    <img src="./assets/img/logo-folha.png" alt="">
        <p>Try again..</p>
        <span>Cadastro inválido. Insira seus dados corretamente.</span>
      </div>`
      setTimeout(function (){
        mensagem_erro.removeAttribute('open')
      }, 2000)
    return

  } else {
    console.log('Chegou até aqui')
  }

  let temMaiuscula = false;
  let temMinuscula = false;
  let temNumero = false;
  let temCaractereEspecial = false;
  let senhaValida = false;

  let caracteresEspeciais = ['!', '@', '#', '$', '%', '^', '&', '*', '_', '+', '-', '=', '|', '.', '<', '>', '?']

  for (
    let posicao = 0;
    posicao < senhaVar.length;
    posicao++) {
    let caractere = senhaVar[posicao]

    if (caractere >= 'A' &&
      caractere <= 'Z') {
      temMaiuscula = true;
    }

    if (caractere >= 'a' &&
      caractere <= 'z') {
      temMinuscula = true;
    }

    if (caractere >= '0' &&
      caractere <= '9') {
      temNumero = true;
    }

    if (caracteresEspeciais.indexOf(caractere) !== -1) {
      temCaractereEspecial = true;
    }
  }

  if (!temMaiuscula) {
    alert_senhas_erradas.style.display = 'block';
    alert_senhas_erradas.innerHTML = 'A senha deve ter uma letra maiúscula';
  }

  if (!temMinuscula) {
    alert_senhas_erradas.style.display = 'block';
    alert_senhas_erradas.innerHTML = 'A senha deve ter uma letra minúscula';
  }

  if (!temNumero) {
    alert_senhas_erradas.style.display = 'block';
    alert_senhas_erradas.innerHTML = 'A senha deve conter pelo menos um número';
  }

  if (!temCaractereEspecial) {
    alert_senhas_erradas.style.display = 'block';
    alert_senhas_erradas.innerHTML = 'A senha deve conter pelo menos 1 caractere especial';
  }

  if (temMaiuscula && temMinuscula && temNumero && temCaractereEspecial && (senhaVar == confirmacaoSenhaVar)) {
    alert_senhas_erradas.innerHTML = '';
    senhaValida = true
  }


  if (senhaValida) {
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        cidadeEscolhidaServer: cidadeEscolhidaVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
        mensagem_erro.setAttribute('open', '')
        mensagem_erro.innerHTML = `

      <div>
        <img src="./assets/img/logo-folha.png" alt="">
        <p>Welcome!</p>
        <span>Cadastro realizado. Você está sendo redirecionado para a tela de login.</span>
      </div>
      `
      setTimeout(function(){
        window.location = "../tela-login.html";}, 4000)

      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });


  }
}

