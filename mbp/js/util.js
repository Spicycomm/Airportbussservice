//#####################
//# VALIDAÇÃO DA DATA #
//#####################
function VerificaData(cData) {

	var data = cData; 
	var tam = data.length;
	if (tam != 10)  return false;
	
	var dia = data.substr(0,2);
	var mes = data.substr (3,2);
	var ano = data.substr (6,4);

	if (isNaN(dia)) return false;
	if (isNaN(mes)) return false;
	if (isNaN(ano)) return false;
		
	if (ano < 1900)	  return false;

	switch (mes) {

  case '01':

 	 if  (dia <= 31) 

    return (true);

 	 break;

  case '02':

 	 if  (dia <= 29) 

    return (true);

 	 break;

  case '03':

 	 if  (dia <= 31) 

    return (true);

 	 break;

  case '04':

 	 if  (dia <= 30) 

    return (true);

 	 break;

  case '05':

 	 if  (dia <= 31) 

    return (true);

 	 break;

  case '06':

 	 if  (dia <= 30) 

    return (true);

 	 break;

  case '07':

 	 if  (dia <= 31) 

    return (true);

 	 break;

  case '08':

 	 if  (dia <= 31) 

    return (true);

 	 break;

  case '09':

 	 if  (dia <= 30) 

    return (true);

 	 break;

  case '10':

 	 if  (dia <= 31) 

    return (true);

 	 break;

  case '11':

 	 if  (dia <= 30) 

    return (true);

 	 break;

  case '12':

 	 if  (dia <= 31) 

    return (true);

 	 break;

	}

	{

  return false;

	}

	return true; 

}

//############################################
//# Limpa um textBox caso o que foi digitado #
//# não esteja em uma lista pre-definida     #
//############################################
function LimparCampo(campo,lista){
	var textoDigitado = campo.val();
	var achou = false;

	$.each(lista, function(index, value) {
		if (value.value == textoDigitado){
			achou = true;
			return;
		}
	});
				
	if(!achou){
		campo.val('');
	}
}

//#################################
//# Tira os acentos de uma string #
//#################################
String.prototype.filterData = function() { 
 	var str = this.toLowerCase(),
	specialChars = [
					    {val:'a', let:'áàãâä'},
 					{val:'e', let:'éèêë'},
					{val:'i', let:'íìîï'},
					{val:'o', let:'óòõôö'},
					{val:'u', let:'úùûü'},
					{val:'c', let:'ç'},
		],
		regex;
			 
		for (var i in  specialChars) {
		regex = new RegExp('[' + specialChars[i].let + ']', 'g');
		str = str.replace(regex, specialChars[i].val);
		regex = null;
		}
	 
		return str;
};