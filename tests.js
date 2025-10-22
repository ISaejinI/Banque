//NOTE - Test de la fonctionnalité de création de clients
createClient("Lou", "Biet");
createClient("Okami", "Biet");

//NOTE - Test de la fonctionnalité de création de comptes
createAccount(datas.clients[0].id, "Compte courant", 500); // doit créer un compte avec 500€
createAccount(datas.clients[0].id, "Livret A", 1500); // doit créer un compte avec 1500€
// createAccount(datas.clients[0].id, "Livret A", 1500); // doit retourner une erreur car le compte existe déjà
createAccount(datas.clients[1].id, "Compte courant", 300); // doit créer un compte avec 300€
createAccount(datas.clients[1].id, "Livret A", 1500); // doit créer un compte avec 1500€
// createAccount(9999, "Compte inconnu", 100); // doit retourner une erreur car le client n'existe pas
// createAccount(datas.clients[1].id, "Livret B", "100"); // doit retourner une erreur car le montant n'est pas un nombre
// createAccount(datas.clients[1].id, "Livret B", 0); // doit retourner une erreur car le montant n'est pas supérieur à 0

//NOTE - Test de la fonctionnalité de dépôt d'argent
deposit(datas.clients[0].id, "Compte courant", 200); // doit retourner 700€
// deposit(datas.clients[0].id, "Compte courant", -50); // doit retourner une erreur car le montant est négatif
// deposit(datas.clients[0].id, "Compte courant", 0); // doit retourner une erreur car le montant n'est pas supérieur à 0
// deposit(datas.clients[0].id, "Compte inconnu", 100); // doit retourner une erreur car le compte n'existe pas

//NOTE - Test de la fonctionnalité de retrait d'argent
withdrawal(datas.clients[0].id, "Compte courant", 100); // doit retourner 600€
// withdrawal(datas.clients[0].id, "Compte courant", 700); // doit retourner une erreur car le montant est supérieur au solde
// withdrawal(datas.clients[0].id, "Compte inconnu", 100); // doit retourner une erreur car le compte n'existe pas
// withdrawal(datas.clients[0].id, "Compte courant", -50); // doit retourner une erreur car le montant est négatif
// withdrawal(datas.clients[0].id, "Compte courant", 0); // doit retourner une erreur car le montant n'est pas supérieur à 0

//NOTE - Test de la fonctionnalité de transfert d'argent
transfert(datas.clients[0].id, "Compte courant", datas.clients[1].id, "Compte courant", 200); // doit transférer 200€ du client 0 au client 1

//NOTE - Test de la fonctionnalité de suppression de compte
// deleteAccount(datas.clients[0].id, "Livret A"); // doit retourner une erreur car le compte n'est pas vide
withdrawal(datas.clients[0].id, "Livret A", 1500);
deleteAccount(datas.clients[0].id, "Livret A"); // doit supprimer le compte

//NOTE - Test de la fonctionnalité d'affichage du solde d'un compte
displayAccountBalance(datas.clients[0].id, "Compte courant"); // doit afficher le solde du compte courant

//NOTE - Test de la fonctionnalité d'affichage des transactions
displayTransactions(datas.clients[1].id, "Compte courant"); // doit afficher les transactions du compte courant
// displayTransactions(datas.clients[0].id, "Livret A"); // doit retourner une erreur car le compte n'existe plus

//NOTE - Test de la fonctionnalité d'affichage de l'argent total d'un client
displayClientBalance(datas.clients[0].id); // doit afficher le total des comptes du client 0
displayClientBalance(datas.clients[1].id); // doit afficher le total des comptes du client 1

//NOTE - Test de la fonctionnalité d'affichage de l'argent total de la banque
displayBankBalance(); // doit afficher le total des comptes de la banque

//NOTE - Test de la fonctionnalité d'application des intérêts
applyInterests(); // doit appliquer les intérêts à tous les comptes
applyInterests(); // doit parcourir les comptes sans appliquer d'intérêts
displayTransactions(datas.clients[1].id, "Compte courant");
createAccount(datas.clients[1].id, "Compte tierce", 300); // doit créer un compte avec 300€
applyInterests(); // doit appliquer les intérêts au dernier compte créé

//NOTE - Test de la fonctionnalité d'application des frais de tenue de compte
applyFees(); // doit appliquer les frais à tous les comptes
displayTransactions(datas.clients[1].id, "Compte courant");
applyFees(); // doit parcourir les comptes sans appliquer de frais
createAccount(datas.clients[0].id, "Compte épargne", 800); // doit créer un compte avec 800€
applyFees(); // doit appliquer les frais au dernier compte créé
displayTransactions(datas.clients[0].id, "Compte courant");