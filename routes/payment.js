
var senderArray = [];
var reciverArray = [];
var hostAmount = 0;
var feeAmount = 0;
var medianValue = 0;

list = [
    // { who: "arnau", amount: 5 },
    { who: "brad", amount: 10 }, { who: "matias", amount: 56 },
    { who: "arnau", amount: 52 },
    { who: "tair", amount: 55 },
    { who: "matias", amount: 56 },
]

logOfPayments();

function logOfPayments() {

    splitPayments(list);

    senderArray.forEach(function (element, index) {

        hostAmount += (this.medianValue.toFixed(2) - element.amount.toFixed(2));
        senderArray[index].paid = (this.medianValue.toFixed(2) - element.amount.toFixed(2));

        if (((this.medianValue.toFixed(2) - element.amount.toFixed(2)) * 0.02) > 0.25){
            this.feeAmount += (this.medianValue.toFixed(2) - element.amount.toFixed(2)) * 0.02;
            console.log("greater");
        } else {
            this.feeAmount += 0.25;
            console.log("lower");
        }

        senderArray[index].amount += senderArray[index].paid;


        console.log("********* sending payments *********");
        console.log("finish sending", senderArray);
        console.log("Host amount", hostAmount);
        console.log("************************************");

    }, this);

    reciverArray.forEach(function (element, index) {

        hostAmount -= (element.amount - this.medianValue);
        element.amount -= (element.amount - this.medianValue);

        console.log("********* reciving payments ********");
        console.log("median", this.medianValue);
        console.log("element.amount", element.amount);
        console.log("finish reciving", reciverArray);
        console.log("Host amount", hostAmount);
        console.log("************************************");

    }, this);


    console.log("********* FINISHED payments ********");
    console.log("senderArray", senderArray);
    console.log("reciverArray", reciverArray);
    console.log("Host amount", hostAmount);
    console.log("************************************");
}




// This function create two arrays to know who is going to pay
// and who is going to ged paid.
function splitPayments(list) {

    this.medianValue = median(list);

    console.log("******** split payments ********");
    for (let i = 0; i < list.length; i++) {

        if (list[i].amount > this.medianValue) {
            console.log("reciver value: ", list[i]);
            reciverArray.push(list[i]);
        } else {
            console.log("sender value: ", list[i]);
            senderArray.push(list[i]);
            senderArray[i].paid = 0;
        }
    }

    console.log("reciver", reciverArray);
    console.log("sender", senderArray);
    console.log("********************************");
}

// Get the media of the list amount
function median(list) {

    var totalamount = 0;

    for (let i = 0; i < list.length; i++) {
        totalamount += list[i].amount;
    }

    return totalamount / list.length;
}