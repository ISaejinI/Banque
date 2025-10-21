// Définition de la "base de données"
// let bd = {
//     clients: [
//         {id: "", name: "", lastName: ""}
//     ],
//     accounts: [
//         {idClient: "", accountName: "", amount: "", transactions: [] }
//     ],
// }

// Initialisation de la "base de données"
let datas = {
    clients: [],
    accounts: []
}

//Fonctions globales
const generateRandomId = () => crypto.randomUUID();

function getAccount(idClient, accountName) {
    return datas.accounts.find(account => account.idClient === idClient && account.accountName === accountName);
}

function getClient(idClient) {
    return datas.clients.find(client => client.id === idClient);
}

function getCurrentDateTime() {
    return new Date();
}


//Fonctions de l'application
function createClient(name, lastName) {
    if (typeof name === "string" && typeof lastName === "string") {
        const newClient = {
            id: generateRandomId(),
            name,
            lastName
        }
        datas.clients.push(newClient);
        return console.info(`Le client ${name} ${lastName} a été ajouté avec l'id ${newClient.id}`);
    } else {
       return console.error("Le nom et le prénom doivent être des chaînes de caractères");
    }
}

function createAccount(idClient, accountName, depositAmount) {
    //TODO - Vérifier si le compte existe déjà pour ce client
    const client = getClient(idClient);
    if (client != undefined) {

        if (typeof depositAmount != "number" || depositAmount < 0) {
            return console.error("Le montant du dépôt doit être un nombre supérieur à 0");
        }

        const newAccount = {
            idClient,
            accountName,
            amount: depositAmount,
            transactions: []
        }

        const currentTransaction = {
            detail: "Compte créé",
            date: getCurrentDateTime(),
        }
        newAccount.transactions.push(currentTransaction)
        datas.accounts.push(newAccount);
        
        return console.info(`Le compte ${accountName} a été créé avec succès avec ${depositAmount}€ à l'intérieur`);
    } else {
        return console.error("Le client doit être un client existant");
    }
}

function deleteAccount(idClient, accountName) {
    const client = getClient(idClient);
    if (client != undefined) {
        const account = getAccount(idClient, accountName);
        if (account != undefined) {
            if (account.amount == 0) {
                datas.accounts.splice(datas.accounts.indexOf(account), 1);
                return console.info("Le compte a bien été supprimé");
            } else {
                return console.error("Le compte doit être vide pour pouvoir le supprimer");
            }
        } else {
        return console.error("Le client doit être un client existant");
    }
    } else {
        return console.error("Le client doit être un client existant");
    }
}

function deposit(idClient, accountName, depositAmount) {
    const client = getClient(idClient);
    if (client != undefined) {
        if (typeof depositAmount != "number" || depositAmount < 0) {
            return console.error("Le montant du dépôt doit être un nombre supérieur à 0");
        }

        const account = getAccount(idClient, accountName);
        if (account != undefined) {
            account.amount += depositAmount;
            const currentTransaction = {
                detail: `Dépôt de ${depositAmount}€`,
                date: getCurrentDateTime(),
            }
            account.transactions.push(currentTransaction);
            return console.info(`Le dépôt de ${depositAmount}€ a été effectué avec succès. Nouveau solde : ${account.amount}€`);
        } else {
            return console.error("Le compte n'existe pas");
        }
    } else {
        return console.error("Le client demandé n'existe pas");
    }
}

function withdrawal(idClient, accountName, withdrawalAmount) {
    const client = getClient(idClient);
    if (client != undefined) {
        const account = getAccount(idClient, accountName);
        if (account != undefined) {
            if (typeof withdrawalAmount != "number" || withdrawalAmount < 0 || withdrawalAmount > account.amount) {
                return console.error("Le montant du retrait doit être un nombre supérieur à 0 et inférieur ou égal au solde du compte");
            }
            account.amount -= withdrawalAmount;
            const currentTransaction = {
                detail: `Retrait de ${withdrawalAmount}€`,
                date: getCurrentDateTime(),
            }
            account.transactions.push(currentTransaction);
            return console.info(`Le retrait de ${withdrawalAmount}€ a été effectué avec succès. Nouveau solde : ${account.amount}€`);
        } else {
            return console.error("Le compte n'existe pas");
        }
    } else {
        return console.error("Le client demandé n'existe pas");
    }
}

function displayTransactions (idClient, accountName) {
    const client = getClient(idClient);
    if (client != undefined) {
        const account = getAccount(idClient, accountName);
        if (account != undefined) {
            console.table(account.transactions);
        } else {
            return console.error("Le compte n'existe pas");
        }
    } else {
        return console.error("Le client demandé n'existe pas");
    }
}




// Test des fonctions
createClient("Lou", "Biet");
createClient("Okami", "Biet");
createAccount(datas.clients[0].id, "Compte courant", 500);
createAccount(datas.clients[0].id, "Livret A", 1500);
createAccount(datas.clients[1].id, "Compte courant", 500);
createAccount(datas.clients[1].id, "Livret A", 1500);
deposit(datas.clients[0].id, "Compte courant", 200);
displayTransactions(datas.clients[0].id, "Compte courant");
withdrawal(datas.clients[0].id, "Compte courant", 100);
displayTransactions(datas.clients[0].id, "Compte courant");
deleteAccount(datas.clients[0].id, "Livret A");
withdrawal(datas.clients[0].id, "Livret A", 1500);
deleteAccount(datas.clients[0].id, "Livret A");