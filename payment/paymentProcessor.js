
class PaymentProcessor {
  constructor(members, items) {
    this.members = members;
    // console.log("MEMBEERS", members);
    this.items = items;
    // console.log("ITEEEEEMS", items);
    this.payers = {};
    this.payersDiff = {};

    this._groupPayers();
    this._calculateDiffs();

    
  }


  // send out payment requests for - amounts TO HOST
  // when all is processed (on each payment check if its last payment)
  // send out payment requests for + amounts FROM HOST

  totalMembers() {
    return this.members.length;
  }

  totalPaid() {
    return this.items.reduce((sum, el) => {
      return sum + el.amount;
    }, 0);
  }

  amountPerEach() {
    return (this.totalPaid() / this.totalMembers());
  }

  _groupPayers() {
    let _payers = {}

    this.items.forEach(item => {
      if (!_payers[item.username]) {
        _payers[item.username] = item.amount;
      } else {
        _payers[item.username] += item.amount;
      }
    });
    
    this.payers = _payers; 
  }

  _calculateDiffs() {
    let _payersDiff = {};

    this.members.forEach(member => {
      if (!this.payers[member.username]) {
        _payersDiff[member.username] = 0 - this.amountPerEach();
      } else {
        _payersDiff[member.username] = this.payers[member.username] - this.amountPerEach();
      }
    });

    this.payersDiff = _payersDiff;
    console.log("*******************************");
    console.log("PAYERS DIFF", this.payersDiff);
    console.log("*******************************");
  }
}

module.exports = PaymentProcessor;