const expect = require('chai').expect;
const { calculation, processDiscount } = require('./operations');

const test_data_cash_in = { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } };
const test_data_cash_out = { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } };
const test_data_legal_min = { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 1.00, "currency": "EUR" } };
describe('calculation', () => {
    it('should return expected cash_in result', () => {
        const cash_in_commission = calculation.cash_in(test_data_cash_in);
        expect(cash_in_commission).to.be.equal(5);
    });

    it('should return expected cash_out result', () => {
        const cash_out_commission = calculation.cash_out(test_data_cash_out);
        expect(cash_out_commission).to.be.equal(90);
    });

    it('should be equal to minimum commission on legal person', () => {
        const cash_out_legal_min = calculation.cash_out(test_data_legal_min);
        expect(cash_out_legal_min).to.be.equal(0.50);
    });
});

describe('processDiscount', () => {
    it('should return expected processed discount', () => {
        const discount = processDiscount(test_data_cash_out, 90);
        expect(discount).to.be.equal(0);
    });
});