function displayFields(form, customHTML) {
    form.setShowDisabledFields(true);
    form.setHidePrintLink(true);

    var atividadeStr = getValue("WKNumState");
    var atividade = (atividadeStr != null && atividadeStr != "") ? parseInt(atividadeStr) : 0;
    
    var utilizador = getValue("WKUser");
    var numProcesso = getValue("WKNumProces");

    // =========================================================
    // INJETA AS VARIÁVEIS PARA O HTML SABER EM QUE ETAPA ESTÁ
    // =========================================================
    customHTML.append("<script>");
    customHTML.append("  var ATIVIDADE_ATUAL = " + atividade + ";");
    customHTML.append("  var MODO_FORMULARIO = '" + form.getFormMode() + "';");
    customHTML.append("</script>");

    if (numProcesso != null && numProcesso > 0) {
        form.setValue("nSolicitacao", numProcesso);
    }

    // =========================================================
    // INÍCIO (0 ou 3)
    // =========================================================
    if (atividade == 0 || atividade == 3) {
        var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
        form.setValue("dataAbertura", sdf.format(new java.util.Date()));

        var filter = new java.util.HashMap();
        filter.put("colleaguePK.colleagueId", utilizador);
        var colleague = getDatasetValues("colleague", filter);
        
        if (colleague.size() > 0) {
            form.setValue("solicitante", colleague.get(0).get("colleagueName"));
        }
    }

    // =========================================================
    // RESPOSTA RH / BPO (Atividade 4)
    // =========================================================
    if (atividade == 4) {
        var filter = new java.util.HashMap();
        filter.put("colleaguePK.colleagueId", utilizador);
        var colleague = getDatasetValues("colleague", filter);
        if (colleague.size() > 0) {
            form.setValue("cpRespGestor2", colleague.get(0).get("colleagueName"));
        }
    }
}