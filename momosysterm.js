let usersDataBase = [
    {
        id: 547363882,
        phoneNumber: 547363882,
        name: "mike",
        pin: 1234,
        balance: 2000,
        transactionsHistory: [],
        isLocked: false,
        failedPinAttempts: 0,
    }
]

const transferMoney = (senderPhoneNumber, receiverPhoneNumber, pin, amount)=> {

    const sender = usersDataBase.find((user)=>  user.phoneNumber === senderPhoneNumber)
    
    if (!sender) return "User not Found"
    
    if(sender.isLocked) return "Account is locked due to too many failed PIN attempts"
    
    if(senderPhoneNumber === receiverPhoneNumber) return "Invalid request"
    
    if(pin !== sender.pin) {
        sender.failedPinAttempts += 1;
        
        console.log(sender)
        
        if(sender.failedPinAttempts >= 3){
            sender.isLocked = true
            return "Invalid PIN. Account has been locked after 3 failed attempts";       
        }
        
        return "Your Pin Is Invalid. Attempts remaining: " + (3 - sender.failedPinAttempts);
    }
    
    if(amount > sender.balance) return "Not enough funds"
    
    sender.balance -= amount
    
    
  return "Transaction successful to " + receiverPhoneNumber + ". New balance: " + sender.balance    
}

console.log(transferMoney(547363882,547363892,1234, 60))