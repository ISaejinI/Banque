// Définition de la "base de données"
// let bd = {
//     clients: [
//         {id: "", name: "", lastName: ""}
//     ],
//     accounts: [
//         {idClient: "", accountName: "", ammount: "", transactions: [] }
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


//Fonctions de l'application
function createClient(name, lastName) {
    if (typeof name === "string" && typeof lastName === "string") {
        const newClient = {
            id: generateRandomId(),
            name,
            lastName
        }
        datas.clients.push(newClient);
        return console.log(`Le client ${name} ${lastName} a été ajouté avec l'id ${newClient.id}`);
    } else {
       return console.log("Le nom et le prénom doivent être des chaînes de caractères");
    }
}

function createAccount(idClient, accountName, depositAmount) {
    const client = getClient(idClient);
    if (client != undefined) {

        const newAccount = {
            idClient,
            accountName,
            ammount: depositAmount,
            transactions: []
        }
        
        const currentDateTime = new Date();
        console.log(currentDateTime);

        const currentTransaction = {
            detail: "Compte créé",
            date: currentDateTime,
        }
        newAccount.transactions.push(currentTransaction)

        datas.accounts.push(newAccount);
        

        return console.log(`Le compte ${accountName} a été créé avec succès avec ${depositAmount}`);
    } else {
        return console.log("Le client doit être un client existant");
    }
}

function deleteAccount(idClient, accountName) {
    const client = getClient(idClient);
    if (client != undefined) {
        const account = getAccount(idClient, accountName);
        if (account != undefined) {
            if (account.ammount == 0) {
                datas.accounts.splice(datas.accounts.indexOf(account), 1);
                return console.log("Le compte a bien été supprimé");
            } else {
                return console.log("Le compte doit être vide pour pouvoir le supprimer");
            }
        } else {
            return console.log("Le compte doit être existant pour le supprimer");
        }
    } else {
        return console.log("Le client doit être un client existant");
        
    }
}