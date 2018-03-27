//####################################
//# Busca do URL de Redirecionamento #
//####################################
function BuscaURL(empresa, origem, destino, dtIda, dtVolta, grupo) {
    var uesrid = "1";
    var Type = "POST";
    var ContentType = "application/json; charset=utf-8";
    var Url = "http://srvparceiros.netviagem.com.br/srvparceiro.svc/BuscarURLAmigavelEmpresa";
    var DataType = "jsonp"; 
	var ProcessData = false;
    var method = "BuscarURLAmigavelEmpresa";

    Data = {
        nrEmpresa: empresa
		, cdOrigem: origem
		, cdDestino: destino
		, dataIda: dtIda
		, dataVolta: dtVolta
		, grupoEmpresa: grupo
		, paradaOrigem: 1
		, paradaDestino: 1
    };

    $.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        success: function (result) {//On Successfull service call
            if (DataType == "jsonp") {
                document.location = result; /* Problem, While calling 'Hello1' method I do not get the value in the return string*/
            }
        }
    });
}

//#####################################################
//# Filtra destinos de acordo com a origem informada  #
//#####################################################			
function FiltrarDestino(lista,id_origem){
	var destinosFiltrados = [];
								
	$.each(lista, function(i, item) {
		if (item.id_origem == id_origem)
			destinosFiltrados.push(item);
	});
				
	return destinosFiltrados
}

$(function(){
	$('#data-ida').datepicker({
		showOn: "both",
		buttonImage: "http://www.airportbusservice.com.br/site/mbp/img/ico_data.png",
		buttonImageOnly: true,
		numberOfMonths: 2,
		showAnim: '',
		numberOfMonths: 2,
		showButtonPanel: true,
		dateFormat: 'dd/mm/yy',
		minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 
		maxDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
		onClose: function( selectedDate ) {
            $("#data-volta").datepicker( "option", "minDate", selectedDate );
        }
	});
		
	$('#data-volta').datepicker({
        showOn: "both",
        buttonImage: "http://www.airportbusservice.com.br/site/mbp/img/ico_data.png",
        buttonImageOnly: true,
        numberOfMonths: 2,
        showAnim: '',
        numberOfMonths: 2,
        showButtonPanel: true,
        dateFormat: 'dd/mm/yy',
        minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        maxDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
    });

    $.widget( "custom.catcomplete", $.ui.autocomplete, {
		_renderMenu: function( ul, items ) {
            var that = this,
			currentCategory = "";
		    $.each( items, function( index, item ) {
			if ( item.category != currentCategory ) {
			    ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
                    currentCategory = item.category;
                }
			that._renderItemData( ul, item );
            });
        }
    });

	Origens = $.map(Origens, function(item) {
	    return {
		    label: item.txt,
			value: item.txt,
			id_origem: item.id_origem
		};
	});
			
	Destinos = $.map(Destinos, function(item) {
		return {
			label: item.txt,
			value: item.txt,
			id_origem: item.id_origem,
			id_destino: item.id_destino
		};
	});

    //Desabilitando o campo de destino
	$('#destino').attr("disabled", true);

	$( "#origem" ).autocomplete({
		delay: 0,
		autoFocus: true,
		minLength: 0,
		source: function(request,response) {
			response( $.grep( Origens, function( value ) {
				value = value.label || value.value || value;
				return value.filterData().search(request.term.filterData()) > -1;
			}))
		},
		select: function (event, ui) {
			//setando o codigo da localidade
			$('#cdOrigem').val(ui.item.id_origem);
					
			//habilitando o campo destino
			$('#destino').val("");
			$('#destino').attr("disabled", false);
					
			$( "#destino" ).autocomplete({
				delay: 0,
				autoFocus: true,
				minLength: 0,
				source: function(request,response) {
					response( $.grep( FiltrarDestino(Destinos,ui.item.id_origem), function( value ) {
						value = value.label || value.value || value;
						return value.filterData().search(request.term.filterData()) > -1;
					}))
				},
				select: function (event, ui) {
					$('#cdDestino').val(ui.item.id_destino);
				}
			});
		}
	});

    $( "#origem").blur(function(){
	    LimparCampo($(this),Origens);
    });
			
    $( "#destino").blur(function(){
	    LimparCampo($(this),Destinos);
    });

    $( "#btnPesquisar").click(function(){
        var nrEmpresa = $('#hiddNrEmpresa').val();
        var cdOrigem = $('#cdOrigem').val();
        var cdDestino = $('#cdDestino').val();
        var dtIda = $('#data-ida').val();
        var dtVolta = $('#data-volta').val();

		if ($('#origem').val() == ""){
            alert("Cidade de origem obrigatorio.");
            return;
        }

		if ($('#destino').val() == ""){
            alert("Cidade de destino obrigatorio.");
            return;
        }

		if (dtIda == ""){
            alert("Data de Ida Obrigatorio.");
            return;
        }

		if (!VerificaData(dtIda)){
            alert("Data de Ida invalida.");
            $('#data-ida').val('');
            return;
        }

		if (dtVolta != "" && !VerificaData(dtVolta)){
            alert("Data de Volta invalida.");
            $('#data-volta').val('');
            return;
        }

        if (dtVolta == "Opcional") dtVolta == "";

        BuscaURL(nrEmpresa, cdOrigem, cdDestino, dtIda, dtVolta, '');
    });
});
