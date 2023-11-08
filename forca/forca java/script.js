var entrada;
var respostaAtual;
var perguntaAtual;
var maxTentativas = 6;
var tentativas = maxTentativas;
var faseAtual;
var ganhou;
var perdeu;
var acertos;
var evento;

var aluno = new Array();
aluno[1]  = "Adriano";		
aluno[2]  = "Ane Karoliny";
aluno[3]  = "Antonio";
aluno[4]  = "Braulio";
aluno[5]  = "Caio Rocha";
aluno[6]  = "Cassio";
aluno[7]  = "Devocy";
aluno[8]  = "Dione";
aluno[9]  = "Estevão";
aluno[10] = "Flavio";
aluno[11] = "Hiago";
aluno[12] = "Ingrid";
aluno[13] = "Jean Carvalho";
aluno[14] = "Jean dos Santos";
aluno[15] = "Kaio Cesar";
aluno[16] = "Kleyson";
aluno[17] = "Luis Filipe";
aluno[18] = "Luiz Paulo";
aluno[19] = "Marcelo";
aluno[20] = "Marcos";
aluno[21] = "Matheus Franco";
aluno[22] = "Matheus Fontinele";
aluno[23] = "Michael";
aluno[24] = "Natanael";
aluno[25] = "Pedro";
aluno[26] = "Saulo";
aluno[27] = "Wagner";
aluno[28] = "Wanderson";
aluno[29] = "Wescley";

//Esquipe: 3 9 11 13 21 24
var invalido = new Array();
invalido[0] = aluno[3];
invalido[1] = aluno[9];
invalido[2] = aluno[11];
invalido[3] = aluno[13];
invalido[4] = aluno[21];
invalido[5] = aluno[24];

var msg = new Array();
msg[0] = "Informe uma letra.";
msg[1] = "Parabéns, você acertou!";
msg[2] = "Errou! Preste mais atenção na próxima vez.";
msg[3] = "Este jogador não pode participar do jogo.";
msg[4] = "Ocorreu um erro, tente novamente.";
msg[5] = "Informe uma resposta.";
msg[6] = "Este jogador já foi sorteado!";
msg[7] = "Esta letra já foi informada!";
msg[8] = "Letra errada, tente outra.";

var pergunta = new Array();
pergunta[1] = "Qual a identidade secreta do Batman?" ;
pergunta[2] = "Sai de casa...";
pergunta[3] = "O que estamos buscando?";

var resposta = new Array();
resposta[1] = "Bruce Wayne";
resposta[2] = "Comi pacarai";
resposta[3] = "Trapezio";

var imagem = new Array();
imagem[0] = "https://4.bp.blogspot.com/-psq1cvp8ZqA/V1S9Jxrju4I/AAAAAAAAA_4/VGZ7GeSGWaY1UQY0WpENjBUnE621fJVPACLcB/s200/forca0.png";
imagem[1] = "https://3.bp.blogspot.com/-G70a1KHVTs0/V1S9J0BgL9I/AAAAAAAAA_w/ND8WKk6ffeIA3k9ii1bTfyp-HlOK_4I6QCLcB/s200/forca1.png";
imagem[2] = "https://1.bp.blogspot.com/-RB6o0ECFMQU/V1S9J1YE1-I/AAAAAAAAA_0/Zod7jdOPLg4nxihqX8DyQoLTLqr1EUS1QCLcB/s200/forca2.png";
imagem[3] = "https://1.bp.blogspot.com/-_8-j5ol9Fvg/V1S9Kb1_1cI/AAAAAAAABAA/ywK-WN8MYZQTAA9LXUfcoFAEFL3OHdLfQCLcB/s200/forca3.png";
imagem[4] = "https://2.bp.blogspot.com/-dTFL3jVSS5Q/V1S9KQRuuxI/AAAAAAAABAE/hDo6y6m01tMJ0QmwEeEQyi0CNdxP9HeGwCLcB/s200/forca4.png";
imagem[5] = "https://3.bp.blogspot.com/-1HoOX4Aze8c/V1S9KiHxpyI/AAAAAAAABAQ/pcnHKw0UbwAKdcaMl6xfkD6ohNLJQnzowCLcB/s200/forca5.png";
imagem[6] = "https://2.bp.blogspot.com/-AJjWekfS3nQ/V1S9KlnvFMI/AAAAAAAABAM/978o9oBROYoOm4tPJTDk5Zb8hxmN6sqYgCLcB/s200/forca6.png";

var letraInformada = new Array();
var letraErrada = new Array();
var todasLetras = new Array();
var historico = new Array();

$(document).ready(function inicio(){
	$("#forca").append("<img id='imgForca' src='" + imagem[0] + "' width='50%' />");
	ganhou = false;
	perdeu = false;
	faseAtual = 1;
	acertos = 0;
	$("#resposta").text(" ").hide();
	$("#respostaInformada").text(" ").hide();
	$("#perguntas").hide();
	$("#mensagem").hide();
	$("#bntNovoJogo").hide();
	$("#faseAtual").text("Fase " + faseAtual);
	$("#numTentativas").text("Tentativas: " + tentativas);

	montaPalavra();
	memento();
});

function trocaImagem(){
	var valor;
	switch(tentativas){
		case 0: 
			$("#imgForca").attr("src", imagem[6]);
			break;
		case 1: 
			$("#imgForca").attr("src", imagem[5]);
			break;
		case 2: 
			$("#imgForca").attr("src", imagem[4]);
			break;
		case 3:
			$("#imgForca").attr("src", imagem[3]);
			break;
		case 4:
			$("#imgForca").attr("src", imagem[2]);
			break;
		case 5:
			$("#imgForca").attr("src", imagem[1]);
			break;
		case 6:{
			$("#imgForca").attr("src", imagem[0]);
			break;
		}
	}
}

$("#bntGeraJogador").click(function gerarJogador(){
	$("#faseAtual").text("Fase " + faseAtual);
	$("#numTentativas").text("Tentativas: " + tentativas);
	
	elementosHabilitados();
	
	$("#mensagem").text(" ");
	var jogadorEscolhido;
	jogadorEscolhido = Math.floor((Math.random() * aluno.length) + 1);
	
	localStorage.setItem("jogadorEscolhido", jogadorEscolhido);
	
	for(var i = 0; i < invalido.length; i++){
		
		if(invalido[i] == aluno[jogadorEscolhido]){
			elementosDesabilitados();
			if(i > 5){
				$("#mensagem").removeClass("sucesso");
				$("#mensagem").text(msg[6]).show().addClass("erro");
			}else{
				$("#mensagem").removeClass("sucesso");
				$("#mensagem").text(msg[3]).show().addClass("erro");
			}
		}else if(aluno[jogadorEscolhido] == "undefined"
			|| aluno[jogadorEscolhido] == null){
			$("#mensagem").removeClass("sucesso");
			$("#mensagem").text(msg[4]).show().addClass("erro");
		}else{
			$("#perguntas").show();
			$("#jogadorGerado").text(aluno[jogadorEscolhido]);
		}
	}
	invalido[++i] = aluno[jogadorEscolhido];
	
	entrada = null;
	$("#entradaLetra").val(null);
	$("#entradaResposta").val(null);
});

$("#entradaLetra").keyup(function informaLetra(){
	entrada = $("#entradaLetra").val().toUpperCase();
	$("#entradaResposta").val(null);
	
	localStorage.setItem("entradaLetra", entrada);
	
});


$("#bntTentar").click(function tentarLetra(){
	$("#mensagem").text(" ");
	var entradaLetra = $("#entradaLetra").val();
	if(entrada == null){
		$("#mensagem").removeClass("sucesso");
		$("#mensagem").text(msg[0]).show().addClass("erro");
	}else{
		if(entradaLetra == null || entradaLetra == "" || entradaLetra == "undefined"){
			//entrada = null;
			$("#mensagem").removeClass("sucesso");
			$("#mensagem").text(msg[0]).show().addClass("erro");	
		}else{
			if(letraInformada.indexOf(entrada) < 0){
				letraInformada.push(entrada);
				todasLetras.push(entrada);
				$("#letraEscolhida").text("Letras informadas: " + todasLetras.join());
				
				localStorage.setItem("todasLetras", todasLetras.join());
				
				preencheLacuna();	
			}else{
				$("#mensagem").removeClass("sucesso");
				$("#mensagem").text(msg[7]).show().addClass("erro");	
			}
		}
	}
	//$("#entradaLetra").val(null);
	$("#entradaResposta").val(null);
	entrada = null;
});

$("#entradaResposta").keyup(function informaResposta(){
	entrada = $("#entradaResposta").val().toUpperCase();
	$("#entradaLetra").val(null);
	
	localStorage.setItem("entradaResposta", entrada);
});

$("#bntResponder").click(function responder(){
	var entradaResposta = $("#entradaResposta").val();;
	$("#mensagem").text(" ").show();
	
	if(entrada == null){
		$("#mensagem").removeClass("sucesso");
		$("#mensagem").text(msg[5]).show().addClass("erro");
	}else{
			if(entradaResposta == null || entradaResposta == "" || entradaResposta == "undefined"){
			//entrada = null;
			$("#mensagem").removeClass("sucesso");
			$("#mensagem").text(msg[5]).show().addClass("erro");	
		}else{
			$("#respostaInformada").text("Resposta Informada: " + entrada).show();
			fase();
			if(perdeu){
				gameOver();
			}
		}
	}
	entrada = null;
	$("#entradaLetra").val(null);
});

function fase(){
	perguntaAtual = pergunta[faseAtual];
	respostaAtual = resposta[faseAtual].toUpperCase();
	
	localStorage.setItem("perguntaAtual", perguntaAtual);
	localStorage.setItem("respostaAtual", respostaAtual);
	
	$("#perguntaAtual").text(perguntaAtual);
	
	if(entrada == respostaAtual){
		ganhou = true;
		perdeu = false;
		preencheLacuna();
		vitoria();
	
	}else{
		perdeu = true;
		$("#mensagem").removeClass("sucesso");
		$("#mensagem").text(msg[2]).addClass("erro");
		$("#numTentativas").text("Tentativas: " + tentativas); 
	}
	
}

function montaPalavra(){
	respostaAtual = resposta[faseAtual].toUpperCase();
	var qntLetras = respostaAtual.length;
	
	for(var i=0; i<qntLetras; i++){
		
	$("#palavra").append('<input id="l' + i + '" class="letra" type="text" disabled="disabled" size="1" />');	
		if(respostaAtual.charAt(i) == "-"){
			$("#l"+i).val("-");
		}else if(respostaAtual.charAt(i) == " "){
			$("#l"+i).addClass("invisivel");
			$("#l"+i).val(null);
		}else{
			$("#l"+i).val(null);
		}
	}
	fase();
}

function preencheLacuna(){
	var qntLetras = respostaAtual.length;
	var letraInformada = respostaAtual.search(entrada);

	if(ganhou){	
		for(var i=0; i<=qntLetras; i++){	
			$("#l"+i).val(respostaAtual.charAt(i));
		}	
	}else{
		var acertoLetra = 0;
		if(letraInformada > -1){
			acertos++;
			
			if(acertos >= qntLetras){
				vitoria();
			}	
		
			for(var i=0; i<=qntLetras; i++){	
				if(entrada == respostaAtual.charAt(i)){
					$("#l"+i).val(respostaAtual.charAt(letraInformada));
					acertoLetra++;
				}
			}	
			acertos = acertos + acertoLetra -1;
			//$("#l"+letraInformada).val(respostaAtual.charAt(letraInformada));
		}else{
			letraErrada.push(entrada);	
			$("#letraErrada").text("Letras Erradas: " + letraErrada.join());
			tentativas--;
			trocaImagem();
			$("#mensagem").removeClass("sucesso");
			$("#mensagem").text(msg[8]).show().addClass("erro");
			$("#numTentativas").text("Tentativas: " + tentativas);
			if(tentativas <= 0){
				gameOver();
			}
		}
	}
}

function elementosHabilitados(){
	$("#bntResponder").removeAttr("disabled", "disabled");
	$("#bntTentar").removeAttr("disabled", "disabled");
	$("#entradaResposta").removeAttr("disabled", "disabled");
	$("#entradaLetra").removeAttr("disabled", "disabled");
}

function elementosDesabilitados(){
	$("#numTentativas").text("Tentativas: " + tentativas);
	$("#bntResponder").attr("disabled", "disabled");
	$("#bntTentar").attr("disabled", "disabled");
	$("#entradaResposta").attr("disabled", "disabled");
	$("#entradaLetra").attr("disabled", "disabled");
}

function gameOver(){
	$("#imgForca").attr("src", imagem[6]);
	var qntLetras = respostaAtual.length;
	elementosDesabilitados();
	faseAtual++;
	
	localStorage.setItem("faseAtual", faseAtual);
	
	perguntaAtual = pergunta[faseAtual];
	perdeu = true;
	$("#mensagem").removeClass("sucesso");
	$("#mensagem").text(msg[2]).addClass("erro");
	$("#bntNovoJogo").show();
	$("#bntGeraJogador").attr("disabled", "disabled");
	//fim();
}

function vitoria(){
	$("#mensagem").removeClass("erro");
	$("#mensagem").text(msg[1]).addClass("sucesso").show();
	faseAtual++;
	
	localStorage.setItem("faseAtual", faseAtual);
	
	tentativas = maxTentativas;
	elementosDesabilitados();
	perguntaAtual = pergunta[faseAtual];
	$("#bntNovoJogo").show();
	$("#bntGeraJogador").attr("disabled", "disabled");
	//fim();
}

$("#bntNovoJogo").click(function zeraCampos(){
	fim();
	$("#faseAtual").text("Fase " + faseAtual);
	$("#numTentativas").text("Tentativas: " + tentativas);
	$("#resposta").text("A resposta correta é: " + respostaAtual).show();
	$("#perguntaAtual").text("Questão: " + perguntaAtual);
	
	var qntLetras = respostaAtual.length;
	for(var i=0; i<=qntLetras; i++){	
		$("#l"+i).remove();
	}
	$("#bntGeraJogador").removeAttr("disabled", "disabled");
	$("#respostaInformada").text(" ");
	$("#letraErrada").text(" ");
	$("#letraEscolhida").text(" ");
	$("#jogadorGerado").text(" ");
	$("#resposta").text(" ").hide();
	$("#respostaInformada").text(" ").hide();
	$("#entradaResposta").val(null);
	$("#entradaLetra").val(null);
	$("#perguntas").hide();
	$("#mensagem").hide();
	
	$("#bntNovoJogo").hide();
	
	acertos = 0;
	//entrada = null;
	tentativas = maxTentativas;
	ganhou = false;
	perdeu = false;	
	letraInformada = new Array();
	letraErrada = new Array();
	todasLetras = new Array();
	
	$("#bntNovoJogo").hide();
	
	$("#imgForca").attr("src", imagem[0]);
	montaPalavra();
});

function fim(){
	if(perguntaAtual == "undefined"
		|| perguntaAtual == ""
		|| perguntaAtual == null){
		
		$("html").append("<h1>Isso é tudo pessoal!</h1>");
		$("#jogo").remove();
	}
}

function memento(){
	
	var passo = localStorage.getItem("passo");
	
	if(passo == null || passo == "undefined"
		|| passo == ""){
		evento = 0;
	}
	evento++;
	historico.push(evento);
	localStorage.setItem("passo", evento);
}
