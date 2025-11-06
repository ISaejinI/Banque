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

function getClient(idClient) {
    const client = datas.clients.find(client => client.id === idClient);
    if (client === undefined) {
        console.error("Le client demandé n'existe pas");
        return false;
    }
    return client;
}

function getAccount(idClient, accountName) {
    const account = datas.accounts.find(account => account.idClient === idClient && account.accountName === accountName);
    if (account === undefined) {
        console.error("Le compte demandé n'existe pas");
        return false;
    }
    return account;
}

function isValidNumber(value) {
    if (typeof value !== 'number' || value <= 0) {
        console.error("La valeur doit être un nombre supérieur à 0");
        return false;
    }
    return true;
}

function getCurrentDateTime() {
    return new Date();
}

function createTransaction(account, detail) {
    const newTransaction = {
        detail,
        date: getCurrentDateTime()
    }
    account.transactions.push(newTransaction);
}

//Fonctionnalités de l'application
function createClient(name, lastName) {
    if (typeof name === "string" && typeof lastName === "string") {
        const newClient = {
            id: generateRandomId(),
            name,
            lastName
        }
        datas.clients.push(newClient);
        return { status: 'success', message: `Le client ${name} ${lastName} a été ajouté avec l'id ${newClient.id}` };
        // return console.info(`Le client ${name} ${lastName} a été ajouté avec l'id ${newClient.id}`);
    } else {
        //    return console.error("Le nom et le prénom doivent être des chaînes de caractères");
        return { status: 'error', message: "Le nom et le prénom doivent être des chaînes de caractères" };
    }
}

function createAccount(idClient, accountName, depositAmount) {
    const client = getClient(idClient);
    const account = getAccount(idClient, accountName);
    const number = isValidNumber(depositAmount);
    console.log(typeof depositAmount);
    if (client === false || number === false) {
        return { status: 'error', message: "Client ou montant invalide" };
    }
    if (account != false) {
        return { status: 'error', message: "Le compte existe déjà pour ce client" };
        // return console.error("Le compte existe déjà pour ce client");
    }
    const newAccount = {
        idClient,
        accountName,
        amount: depositAmount,
        transactions: []
    }
    createTransaction(newAccount, `Compte créé avec un dépôt initial de ${depositAmount}€`);
    datas.accounts.push(newAccount);
    // return console.info(`Le compte ${accountName} a été créé avec succès avec ${depositAmount}€ à l'intérieur`);
    return { status: 'success', message: `Le compte ${accountName} a été créé avec succès avec ${depositAmount}€ à l'intérieur` };
}

function deleteAccount(idClient, accountName) {
    const client = getClient(idClient);
    const account = getAccount(idClient, accountName);
    if (client === false || account === false) {
        return;
    }
    if (account.amount > 0) {
        return console.error("Le compte doit être vide pour pouvoir le supprimer");
    }
    datas.accounts.splice(datas.accounts.indexOf(account), 1);
    return console.info("Le compte a bien été supprimé");
}

function deposit(idClient, accountName, depositAmount) {
    const client = getClient(idClient);
    const account = getAccount(idClient, accountName);
    const number = isValidNumber(depositAmount);
    if (client === false || account === false || number === false) {
        return;
    }
    account.amount += depositAmount;
    createTransaction(account, `Dépôt de ${depositAmount}€`);
    // return console.info(`Le dépôt de ${depositAmount}€ a été effectué avec succès. Nouveau solde : ${account.amount}€`);
    return { status: 'success', message: `Le dépôt de ${depositAmount}€ a été effectué avec succès. Nouveau solde : ${account.amount}€` };
}

function withdrawal(idClient, accountName, withdrawalAmount) {
    const client = getClient(idClient);
    const account = getAccount(idClient, accountName);
    const number = isValidNumber(withdrawalAmount);
    if (client === false || account === false || number === false) {
        return;
    }
    if (withdrawalAmount > account.amount) {
        return console.error("Vous ne pouvez pas retirer plus que le solde actuel du compte");
    }
    account.amount -= withdrawalAmount;
    createTransaction(account, `Retrait de ${withdrawalAmount}€`);
    return console.info(`Le retrait de ${withdrawalAmount}€ a été effectué avec succès. Nouveau solde : ${account.amount}€`);
}

function transfert(idClientDonator, accountNameDonator, idClientReciever, accountNameReciever, transferAmount) {
    const clientDonator = getClient(idClientDonator);
    const accountDonator = getAccount(idClientDonator, accountNameDonator);
    const clientReciever = getClient(idClientReciever);
    const accountReciever = getAccount(idClientReciever, accountNameReciever);
    const number = isValidNumber(transferAmount);
    if (clientDonator === false || clientReciever === false || accountDonator === false || accountReciever === false || number === false) {
        return;
    }
    if (transferAmount > accountDonator.amount) {
        return console.error("Vous ne pouvez pas transférer plus que le solde actuel du compte");
    }
    accountDonator.amount -= transferAmount;
    createTransaction(accountDonator, `Transfert de ${transferAmount}€ vers le compte de ${clientReciever.name} ${clientReciever.lastName}`);
    accountReciever.amount += transferAmount;
    createTransaction(accountReciever, `Transfert de ${transferAmount}€ depuis le compte de ${clientDonator.name} ${clientDonator.lastName}`);
    return console.info(`Le transfert de ${transferAmount}€ a été effectué avec succès du compte ${accountDonator.accountName} de ${clientDonator.name} ${clientDonator.lastName} vers le compte ${accountReciever.accountName} de ${clientReciever.name} ${clientReciever.lastName}`);
}

function displayAccountBalance(idClient, accountName) {
    const client = getClient(idClient);
    const account = getAccount(idClient, accountName);
    if (client === false || account === false) {
        return;
    }
    return console.info(`Le solde du compte ${accountName} est de ${account.amount}€`);
}

function displayTransactions(idClient, accountName) {
    const client = getClient(idClient);
    const account = getAccount(idClient, accountName);
    if (client === false || account === false) {
        return;
    }
    console.table(account.transactions);
}

function displayClientBalance(idClient) {
    const client = getClient(idClient);
    if (client === false) {
        return;
    }
    const allAccounts = datas.accounts.filter(account => account.idClient === idClient);
    let totalBalance = 0;
    allAccounts.forEach(account => {
        totalBalance += account.amount;
    });
    return console.log(`La somme totale des comptes de ${client.name} ${client.lastName} est de ${totalBalance}€`);
}

function displayBankBalance() {
    let totalBankBalance = 0;
    datas.accounts.forEach(account => {
        totalBankBalance += account.amount;
    });
    return console.log(`La somme totale des comptes de la banque est de ${totalBankBalance}€`);
}

// Bonus
function applyInterests() {
    const interest = 0.015;
    datas.accounts.forEach(account => {
        const lastInterestTransaction = account.transactions.findLast(transaction => transaction.detail == 'Application des intérêts');
        const copyDateLastInterestTransaction = (lastInterestTransaction === undefined ? "" : new Date(lastInterestTransaction.date));
        if (account.amount > 0 && lastInterestTransaction === undefined || account.amount > 0 && lastInterestTransaction !== undefined && getCurrentDateTime() >= copyDateLastInterestTransaction.setFullYear(copyDateLastInterestTransaction.getFullYear() + 1)) {
            account.amount += account.amount * interest;
            createTransaction(account, `Application des intérêts`);
        }
    })
    return console.log("Les intérêts ont été appliqués à tous les comptes");
}

function applyFees() {
    const fee = 2;
    datas.accounts.forEach(account => {
        const lastFeeTransaction = account.transactions.findLast(transaction => transaction.detail == 'Application des frais de tenue de compte');
        const copyDateLastFeeTransaction = (lastFeeTransaction === undefined ? "" : new Date(lastFeeTransaction.date));
        if (account.amount > 0 && lastFeeTransaction === undefined || account.amount > 0 && lastFeeTransaction !== undefined && getCurrentDateTime() >= copyDateLastFeeTransaction.setMonth(copyDateLastFeeTransaction.getMonth() + 1)) {
            account.amount -= fee;
            createTransaction(account, `Application des frais de tenue de compte`);
        }
    })
    return console.log("Les frais de tenue de compte ont été appliqués à tous les comptes");
}

//Fonctionnalités de la V2

//Gestion de la boite d'alerte
function showAlert(type, message) {
    const alert = document.getElementById('alert');
    alert.className = type;
    alert.innerText = message;
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

//Gestion des valeurs des selects
function putClientsInSelects() {
    const selects = document.querySelectorAll('.clientIdSelect');
    const clients = datas.clients;
    let inputs = `<option selected value="">Sélectionner un client</option>`;
    clients.forEach(client => {
        inputs += `<option value="${client.id}">${client.name} ${client.lastName} - ${client.id}</option>`;
    });
    selects.forEach(select => {
        select.innerHTML = '';
        select.innerHTML += inputs;
    })
}

function putAccountsInSelects(idClient, selectId) {
    const select = document.getElementById(selectId);
    const accounts = datas.accounts.filter(account => account.idClient === idClient);
    let inputs = `<option selected value="">Sélectionner un compte</option>`;
    accounts.forEach(account => {
        inputs += `<option value="${account.accountName}">${account.accountName} - ${account.amount}€</option>`;
    });
    select.innerHTML = '';
    select.innerHTML += inputs;
}

// Gestion des formulaires
document.addEventListener('DOMContentLoaded', () => {
    putClientsInSelects();

    //Gestion du formulaire de création de client
    const createClientButton = document.getElementById('createClient');
    createClientButton.addEventListener('click', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('createClientFirstName').value;
        const lastName = document.getElementById('createClientLastName').value;
        const result = createClient(firstName, lastName);
        document.getElementById('createClientFirstName').value = '';
        document.getElementById('createClientLastName').value = '';
        showAlert(result.status, result.message);
        putClientsInSelects();
    })

    //Gestion du formulaire de création de compte
    const createAccountButton = document.getElementById('createAccount');
    createAccountButton.addEventListener('click', (e) => {
        e.preventDefault();
        const idClient = document.getElementById('createAccountClient').value;
        const accountName = document.getElementById('createAccountName').value;
        const depositAmount = Number(document.getElementById('createAccountInitialDeposit').value);
        const result = createAccount(idClient, accountName, depositAmount);
        document.getElementById('createAccountClient').value = '';
        document.getElementById('createAccountName').value = '';
        document.getElementById('createAccountInitialDeposit').value = '';
        showAlert(result.status, result.message);
    })

    //Gestion du formulaire de dépot d'argent
    const depositButton = document.getElementById('deposit');
    const depositAccountSelect = document.getElementById('depositAccountClient');
    depositAccountSelect.addEventListener('change', (e) => {
        const idClient = e.target.value;
        putAccountsInSelects(idClient, 'depositAccountName');
    });
    depositButton.addEventListener('click', (e) => {
        e.preventDefault();
        const idClient = document.getElementById('depositAccountClient').value;
        const accountName = document.getElementById('depositAccountName').value;
        const depositAmount = Number(document.getElementById('depositAmount').value);
        const result = deposit(idClient, accountName, depositAmount);
        document.getElementById('depositAccountClient').value = '';
        document.getElementById('depositAccountName').value = '';
        document.getElementById('depositAmount').value = '';
        showAlert(result.status, result.message);
    })

    //Gestion du formulaire de retrait d'argent
});