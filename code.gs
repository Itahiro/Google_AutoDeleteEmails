/**
 * Point d'entr�e du programme
 * Appel de la fonction de cr�ation des labels
 * Appel de la fonction delete
 */
function AutoDelete() {
  // Liste des labels
  var labels = new Array();
  labels[0] = "Autodelete";
  labels[1] = "Autodelete/1 jour";
  labels[2] = "Autodelete/7 jours";
  
  // Cr�ation des labels
  // createLabels(labels);
  
  // Suppression des emails
  deleteEmail(1, labels[1]);
  deleteEmail(7, labels[2]);
}

/**
 * Suppression automatique des messages de gmail
 * @param delayDays Nombre de jours avant suppression
 * @param filterName Label correspondant
 */
function deleteEmail(delayDays, filterName) {
  // Date de suppression
  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate()-delayDays);

  // R�cup�ration du filtre
  var label = GmailApp.getUserLabelByName(filterName);
  
  // R�cup�ration de tous les messages du filtre
  var threads = label.getThreads();
  
  // Mise � la corbeille si la date limite est d�pass�e
  for (var i = 0; i < threads.length; i++)
  {
    if (threads[i].getLastMessageDate()<maxDate)
    {
      threads[i].markRead();
      threads[i].moveToTrash();
    }
  }
}

/**
 * Fonction de cr�ation des labels manquants
 * @param labels Liste des labels
 */
function createLabels(labels)
{
  var currentLabels = GmailApp.getUserLabels();
  for (var i = 0; i < labels.length; i++)
  {
    if(existLabel(currentLabels, labels[i]) == false)
    {
      GmailApp.createLabel(labels[i]);
    }
  }
}

/**
 * Fonction qui retourne vrai si le label existe
 * @param labels Liste des labels
 * @param filterName Label correspondant
 */
function existLabel(labels, filterName)
{
  for (var i = 0; i < labels.length; i++)
  {
    if(labels[i].getName() == filterName)
      return true;
  }
  return false;
}
