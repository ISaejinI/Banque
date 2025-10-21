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
    const client = getClient(idClient);
    if (client != undefined) {

        if (getAccount(idClient, accountName) != undefined) {
            return console.error("Le compte existe déjà pour ce client");
        }

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

function transfert(idClientDonator, accountNameDonator, idClientReciever, accountNameReciever, transferAmount) {
    const clientDonator = getClient(idClientDonator);
    const clientReciever = getClient(idClientReciever);

    if (clientDonator != undefined && clientReciever != undefined) {
        const accountDonator = getAccount(idClientDonator, accountNameDonator);
        const accountReciever = getAccount(idClientReciever, accountNameReciever);
        if (accountDonator != undefined && accountReciever != undefined) {
            if (typeof transferAmount != "number" || transferAmount < 0 || transferAmount > accountDonator.amount) {
                return console.error("Le montant du transfert doit être un nombre supérieur à 0 et inférieur ou égal au solde du compte");
            }
            accountDonator.amount -= transferAmount;
            let currentTransaction = {
                detail: `Transfert de ${transferAmount}€ vers le compte de ${clientReciever.name} ${clientReciever.lastName}`,
                date: getCurrentDateTime()
            }
            accountDonator.transactions.push(currentTransaction);

            accountReciever.amount += transferAmount;
            currentTransaction = {
                detail: `Transfert de ${transferAmount}€ depuis le compte de ${clientDonator.name} ${clientDonator.lastName}`,
                date: getCurrentDateTime()
            }
            accountReciever.transactions.push(currentTransaction);

            return console.info(`Le transfert de ${transferAmount}€ a été effectué avec succès du compte ${accountDonator.accountName} de ${clientDonator.name} ${clientDonator.lastName} vers le compte ${accountReciever.accountName} de ${clientReciever.name} ${clientReciever.lastName}`);
        } else {
            return console.error("Les deux comptes doivent exister pour effectuer la transaction");
        }
    } else {
        return console.error("Les deux clients doivent exister pour effectuer le transfert");
    }
}

function displayAccountBalance(idClient, accountName) {
    const client = getClient(idClient);
    if (client != undefined) {
        const account = getAccount(idClient, accountName);
        if (account != undefined) {
            return console.info(`Le solde du compte ${accountName} est de ${account.amount}€`);
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

function displayClientBalance(idClient) {
    const client = getClient(idClient);
    if (client != undefined) {
        let totalBalance = 0;
        const allAccounts = datas.accounts.filter(account =>  account.idClient === idClient);
        allAccounts.forEach(account => {
            totalBalance += account.amount;
        });
        return console.log(`La somme totale des compte de ${client.name} ${client.lastName} est de ${totalBalance}€`);
    } else {
        return console.error("Le client demandé n'existe pas");
    }
}