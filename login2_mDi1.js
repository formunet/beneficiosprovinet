$( document ).ready(function() {
	$("input").on("focus",function(){
		MostrarClase($(this));	 
	});
	$("input").on("blur",function(){
		ocultarclase($(this));	
	});
	$("#nuevoIngreso").on("click touchstart",newIngreso);
	$(".boton-submit").on("click touchstart",login_action);
	$(".recuperar").on("click touchstart",recuperar);
	$("#cedula").keypress(function(e){
		formatoDoc();
		var keycode =  e.keyCode ? e.keyCode : e.which;
		if(keycode == 8){
			$(this).val($(this).val().substring(0,$(this).val().length-1))
		}
	});
	$("#password").keyup(function(){
		mostrarOcultarIcono();	
	});
	$('#cedula').focus(function(){
		formatoDoc();
	});
	$('#password').focus(function(){
		mostrarOcultarIcono();
	});
	$('#cedula, #password').keyup(function(){
        if(($("#cedula").val().length <1) || ($("#password").val().length<8 ) || ($("#password").val().length>16 )){
           	$('button[type="submit"]').attr('disabled','disabled');         
        }else{
           	$('button[type="submit"]').removeAttr('disabled');
        }
     });
	$(".icono-password").click(function(){
		if ($("#password").attr("type") == "password") {
			$("#password").attr("type", "text");
			$(".show-Password").hide();
			$(".hide-Password").show();
		} else {
			$("#password").attr("type", "password");
			$(".show-Password").show();
			$(".hide-Password").hide();
		}
	 });
    $("#cedula, #cedula2, #password").on('paste copy', function(e){
    	e.preventDefault();
  	});
  	document.getElementById("select_doc").addEventListener('keydown', inputCharacters);
  	document.getElementById("cedula").addEventListener('keydown', inputCharacters2);
  	document.getElementById("chkFrecuentes").addEventListener('keydown', inputCharacters2);
  	document.getElementById("password").addEventListener('keydown', inputCharacters3);
});
function login_action(){
	var tipo = $("#select_doc").val();
	var iden = $("#cedula2").val();
	var pass = $("#password").val();
	$("#cedula, #cedula2, #password ").attr("readonly","readonly");
	var recordatorio = localStorage.getItem('recordatorio');
	if(recordatorio) {
		if(recordatorio=="si"){	
			var key = localStorage.getItem("tipo_nac_wc");
			var hash3 = CryptoJS.AES.decrypt(iden, key).toString(CryptoJS.enc.Utf8);
			iden = atob(hash3);
		}
	}else{
		guardarDoc();
	}
	var form = document.createElement("form");
	form.setAttribute('method',"post");
	form.setAttribute('target',"_top");
	form.setAttribute('action',config.url_login);
	form.setAttribute('style',"display:none");
	var inTipo = document.createElement("input"); 
	inTipo.setAttribute('type',"password");
	inTipo.setAttribute('name','tipoNacionalidad');
	inTipo.setAttribute('value',tipo);
	form.appendChild(inTipo);
	var inIden = document.createElement("input"); 
	inIden.setAttribute('type',"password");
	inIden.setAttribute('name','numCedula');
	inIden.setAttribute('value',iden);
	form.appendChild(inIden);
	var inPass = document.createElement("input"); 
	inPass.setAttribute('type',"password");
	inPass.setAttribute('name','claveIngreso');
	inPass.setAttribute('value',pass);
	form.appendChild(inPass);
	var submit = document.createElement("input"); 
	submit.setAttribute('type',"submit");
	submit.setAttribute('value',"Submit");
	form.appendChild(submit);
	document.getElementsByTagName('body')[0].appendChild(form);
	form.submit();
	limpiarForm();
	$(".boton-submit").attr("disabled","disabled");
	
}
function limpiarForm(){
	document.getElementById("cedula").value="";
	document.getElementById("password").value="";
	$("input").removeClass("focus-label");
	$("#cedula, #cedula2, #password ").removeAttr("readonly");
	$(".icono-password").css("display", "none");
	document.getElementById("chkFrecuentes").checked= false;
}
function MostrarClase($element){
	if (!$element.hasClass('focus-label')) {
		$element.addClass('focus-label');
	}
}
function ocultarclase($element){
	if ($element.val()==="" ){
		$element.removeClass('focus-label');
	}
}
function recuperar(){
	window.location.href = config.url_recuperar; 
}
function registrar(){
	window.location.href = config.url_registrar;
}
function MostrarToolTipp(){
	document.getElementById("tool_tip_docIde").style.display="block";
}
function OcultarToolTipp(){
	document.getElementById("tool_tip_docIde").style.display="none";
}
function Cambio(){
	document.getElementById("cedula").focus();
	document.getElementById("cedula").maxlength=10;
	document.getElementById("submit").disabled=true;
	$("input").val("");
	$ ("#password").removeClass("focus-label");
	formatoDoc();
	formatoPass();
}
function inputCharacters(event) {
	if (event.keyCode == 13) {
		document.getElementById("cedula").focus();
	}
}
function inputCharacters2(event) {
	if (event.keyCode == 13) {
		document.getElementById("password").focus();
	}
}
function inputCharacters3(event) {
	if (event.keyCode == 13) {
		document.getElementById("submit").focus();
	}
}
function EnmascaraV2(CampoMask,CampoHidd,bolDes){var iniAnt,mskCar;var tempBull="500";var objCMask=document.getElementById(CampoMask);var objCHidd=document.getElementById(CampoHidd);var tempValIni="";var tempValFin="";var LognMask=objCMask.value.length;var CaulBol=bolDes?LognMask:(LognMask-1);var tamMask=objCMask.getAttribute("maxlength")>0?((objCMask.getAttribute("maxlength"))-0):2000000;for(x=0;x<LognMask;x++){mskCar=objCMask.value.charAt(x);iniAnt=objCHidd.value.charAt(x);if ((mskCar!=decodeURI ('*'))&&(mskCar!=decodeURI (','))&&(mskCar!=decodeURI ('.'))&&(mskCar!=decodeURI ('-'))&&(mskCar!=decodeURI ('#'))&&(mskCar!=decodeURI ('+'))&&(mskCar!=decodeURI (';'))&&(mskCar!=decodeURI ('('))&&(mskCar!=decodeURI (')'))&&(mskCar!=decodeURI ('\\'))&&(mskCar!=decodeURI ('/'))&&(mskCar!=decodeURI ('$'))&&(mskCar!=decodeURI ('&'))&&(mskCar!=decodeURI ('%20'))&&(mskCar!=decodeURI ('N'))&&(mskCar!=decodeURI ('n'))){tempValIni+=mskCar;if(x<tamMask&&x!=CaulBol)tempValFin+=decodeURI ('%2A');else
	tempValFin+=mskCar;}else{tempValIni+=iniAnt;if(iniAnt!=""){if(x<tamMask)tempValFin+=decodeURI ('%2A');else
	tempValFin+=iniAnt;}}}objCHidd.value=tempValIni;objCMask.value="";objCMask.value=tempValFin;eval('clearTimeout(det_'+CampoMask+');');eval('det_'+CampoMask+' = setTimeout(\'EnmascaraV2("'+CampoMask+'","'+CampoHidd+'",true);\','+tempBull+');');}function Enmascaraedc(CampoMask,CampoHidd,bolDes){var iniAnt,mskCar;var tempBull="1999";var objCMask=document.getElementById(CampoMask);var objCHidd=document.getElementById(CampoHidd);var tempValIni="";var tempValFin="";var LognMask=objCMask.value.length;var CaulBol=bolDes?LognMask:(LognMask-1);var tamMask=objCMask.getAttribute("maxlength")>5?((objCMask.getAttribute("maxlength"))-5):2000000;for(x=0;x<LognMask;x++){mskCar=objCMask.value.charAt(x);iniAnt=objCHidd.value.charAt(x);if ((mskCar!=decodeURI ('*'))&&(mskCar!=decodeURI (','))&&(mskCar!=decodeURI ('.'))&&(mskCar!=decodeURI ('-'))&&(mskCar!=decodeURI ('#'))&&(mskCar!=decodeURI ('+'))&&(mskCar!=decodeURI (';'))&&(mskCar!=decodeURI ('('))&&(mskCar!=decodeURI (')'))&&(mskCar!=decodeURI ('\\'))&&(mskCar!=decodeURI ('/'))&&(mskCar!=decodeURI ('$'))&&(mskCar!=decodeURI ('&'))&&(mskCar!=decodeURI ('%20'))&&(mskCar!=decodeURI ('N'))&&(mskCar!=decodeURI ('n'))){tempValIni+=mskCar;if(x<tamMask&&x!=CaulBol)tempValFin+=decodeURI ('%u25CF');else
	tempValFin+=mskCar;}else{tempValIni+=iniAnt;if(iniAnt!=""){if(x<tamMask)tempValFin+=decodeURI ('%u25CF');else
	tempValFin+=iniAnt;}}}objCHidd.value=tempValIni;objCMask.value="";objCMask.value=tempValFin;eval('clearTimeout(det_'+CampoMask+');');eval('det_'+CampoMask+' = setTimeout(\'EnmascaraV2("'+CampoMask+'","'+CampoHidd+'",true);\','+tempBull+');');}
	function Enmascaraedc(CampoMask,CampoHidd,bolDes){
		var iniAnt, mskCar;
		var tempBull = "500";
		var objCMask = document.getElementById(CampoMask);
		var objCHidd = document.getElementById(CampoHidd);
		var tempValIni = "";
		var tempValFin = "";
		var LognMask = objCMask.value.length;
		var CaulBol = bolDes ? LognMask : (LognMask - 1);
		var tamMask = objCMask.getAttribute("maxlength")>0?((objCMask.getAttribute("maxlength"))-0):2000000;
		for (x=0;x<LognMask;x++){
			mskCar = objCMask.value.charAt(x);
			iniAnt = objCHidd.value.charAt(x);
			if ((mskCar!=decodeURI ('*'))&&(mskCar!=decodeURI (','))&&(mskCar!=decodeURI ('.'))&&(mskCar!=decodeURI ('-'))&&(mskCar!=decodeURI ('#'))&&(mskCar!=decodeURI ('+'))&&(mskCar!=decodeURI (';'))&&(mskCar!=decodeURI ('('))&&(mskCar!=decodeURI (')'))&&(mskCar!=decodeURI ('\\'))&&(mskCar!=decodeURI ('/'))&&(mskCar!=decodeURI ('$'))&&(mskCar!=decodeURI ('&'))&&(mskCar!=decodeURI ('%20'))&&(mskCar!=decodeURI ('N'))&&(mskCar!=decodeURI ('n'))){
				tempValIni+=mskCar;
				if (x<tamMask && x != CaulBol)
					tempValFin += decodeURI ('*');
				else
					tempValFin += mskCar;
			} else {
				tempValIni+=iniAnt;
				if (iniAnt!="") {
					if (x<tamMask)
						tempValFin += decodeURI ('*');
					else 
						tempValFin += iniAnt;
				}
			}
		}
		objCHidd.value = tempValIni;
		objCMask.value = "";
		objCMask.value = tempValFin;
		eval('clearTimeout(det_' + CampoMask + ');');
		eval('det_' + CampoMask + ' = setTimeout(\'EnmascaraV2("' + CampoMask +'","' + CampoHidd + '",true);\',' + tempBull + ');');
}
function extraerNombre(nombreCompleto){
	var fields = nombreCompleto.split(/\s+/);
	return fields[0];
}
function cargarDoc(){
	// debugger;
	var recordatorio = localStorage.getItem('recordatorio');
	if(recordatorio) {
		if(recordatorio=="si"){	
			var Name = null;
			Name = localStorage.getItem("Nombre");
			if (Name != null){
				Name = extraerNombre(Name);
				var Name2 = Name.substring(1, Name.length);
				Name = Name[0] + Name2.toLowerCase();
				document.getElementById("h_titulo_clave").innerHTML = "&iexcl;Bienvenido "+ Name +"&#33;";
				document.getElementById("container_main").style.display = "none";
				document.getElementById("nuevoIngreso").style.display = "block";
				document.getElementById("divFrecuentes").style.display = "none";
				document.getElementById("titulo1").style.display = "none";
				document.getElementById("chkFrecuentes").checked=true;
				document.getElementById("cedula").value = localStorage.getItem("cedula_wc");
				document.getElementById("cedula2").value = localStorage.getItem("cedula_wc");
				document.getElementById("form").select_doc.value = atob(localStorage.getItem("tipo_nac_wc"));
			}else{
				localStorage.clear();
				// document.getElementById("h_titulo_clave").innerHTML = "&iexcl;Bienvenido&#33;";
				document.getElementById("container_main").style.display = "block";
				document.getElementById("titulo1").style.display = "block";
				document.getElementById("chkFrecuentes").checked=false;
				document.getElementById("h_titulo_clave").style.display = "block";
				document.getElementById("nuevoIngreso").style.display = "none";
			}
	// 	}else{
	// 		document.getElementById("container_main").style.display = "block";
	// 		document.getElementById("titulo1").style.display = "block";
	// 		document.getElementById("chkFrecuentes").checked=false;
	// 		document.getElementById("h_titulo_clave").style.display = "block";
	// 		document.getElementById("nuevoIngreso").style.display = "none";
	// 	}	
	// }else {	
	// 	document.getElementById("container_main").style.display = "block";
	// }	
	}
}	
}
function guardarDoc() {
	localStorage.clear();
	if(document.getElementById("chkFrecuentes").checked){
		var tipo = $("#select_doc").val();
		var iden = $("#cedula2").val();
		var hash = btoa(tipo);
		var hash2 = btoa(iden);
		iden = CryptoJS.AES.encrypt(hash2,hash);
		localStorage.setItem("recordatorio",'si');
		localStorage.setItem("cedula_wc", iden);
		localStorage.setItem("tipo_nac_wc", hash);
	}	
}
function newIngreso() {	
	localStorage.clear();
	document.getElementById("container_main").style.display = "block";
	document.getElementById("titulo1").style.display = "block";
	document.getElementById("divFrecuentes").style.display = "block";
	document.getElementById("chkFrecuentes").checked=false;
	document.getElementById("h_titulo_clave").style.display = "none";
	document.getElementById("nuevoIngreso").style.display = "none";
	$("#select_doc").attr("value","C&eacute;dula de Identidad");
	$("input").val("");
}
function mostrarOcultarIcono(){
	if(($("#password").val() != "")){
		if($("#img-password").is(':hidden') && $("#img-password2").is(':hidden') && ($("#password").attr("type") == "password")) {
			$(".show-Password").show();
			$(".hide-Password").hide();
		}else if($("#img-password").is(':hidden') && ($("#password").attr("type") == "text")) {
			$(".show-Password").hide();
			$(".hide-Password").show();
		}
	}else{
		formatoPass();
	}
}
function formatoDoc(){
	$("#cedula").attr("type", "tel");
	$("#cedula").attr("inputmode", "numeric");
	document.getElementById("cedula").maxlength=10;
}
function formatoPass(){
	$("#password").attr("type","password");
	$(".show-Password").hide();
	$(".hide-Password").hide();
	document.getElementById("cedula").maxlength=16;
}


function eliminarCaracteresNoPermitidosClaveAcceso(idInput){
		
        $('#'+idInput).on('input',function (e) {
            var txt = $('#'+idInput).val().slice(-1);
            var value = txt.charCodeAt(0);
            if(
                (value >= 'a'.charCodeAt(0) && value <= 'z'.charCodeAt(0)) ||
                (value >= 'A'.charCodeAt(0) && value <= 'Z'.charCodeAt(0)) ||
                (value == 8) ||
                (value == '='.charCodeAt(0)) ||
                (value == '/'.charCodeAt(0)) ||
                (value == '.'.charCodeAt(0)) ||
                (value == '$'.charCodeAt(0)) ||
                (value == '#'.charCodeAt(0)) ||
                (value == '*'.charCodeAt(0)) ||
                (value == '-'.charCodeAt(0)) ||
                (value >= '0'.charCodeAt(0) && value <= '9'.charCodeAt(0))
            )
            {
                return true;
            }
            else{
                var valor= $('#'+idInput).val();
                var camb=valor.replace(txt,"");
                return $('#'+idInput).val(camb);
            }
        });
    
    }
window.onload=cargarDoc;