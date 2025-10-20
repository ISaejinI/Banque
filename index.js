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

const generateRandomId = () => crypto.randomUUID();

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
    const client = datas.clients.find(client => client.id === idClient);
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