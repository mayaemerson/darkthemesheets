function ensureOnOpenTrigger() {
  const triggers = ScriptApp.getProjectTriggers(); 
  let onOpenExists = false;

  
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onOpen') {
      onOpenExists = true; 
    }
  });

  
  if (!onOpenExists) {
    ScriptApp.newTrigger('onOpen')
      .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
      .onOpen()
      .create();
    
    //Logger.log('Gatilho onOpen criado com sucesso!');
  } else {
    //Logger.log('Gatilho onOpen já está configurado.');
  }
}
