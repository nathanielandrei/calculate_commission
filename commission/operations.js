const { config } = require('./config');

const NU_discount = [];

const calculation = {
    cash_in: (data) => {
        const { operation } = data;
        const result = operation * config[data.type].percents;
        return result < config[data.type].max.amount ? result : config[data.type].max.amount;
    },
    cash_out: (data) => {
        const { operation } = data;
        let result = 0;
        if(!NU_discount[data.user_id]) {
            NU_discount.push({
                user_id: data['user_id'],
                allowance: 1000,
                date_started: data['date']
            });
        }

        const percent = config[data.type][data.user_type] ? config[data.type][data.user_type].percents : 0;
        const commission = operation.amount * percent;;
        if (data.user_type === 'natural') {
            result = processDiscount(data, commission);
        } else {
            const minimum = config[data.type][data.user_type].min.amount;
            result = commission < minimum ? minimum : commission;
        }

        return result;
    }
}

const processDiscount = (data, commission) => {
    const current_NU_discount = NU_discount.find(user => user.user_id === data.user_id);
    const sd = new Date(current_NU_discount.date_started);
    const td = new Date(data.date);
    const dayDifference = (td.getTime() - sd.getTime()) / (1000 * 3600 * 24);
    if (dayDifference > 7) {
        current_NU_discount.date_started = data.date;
        current_NU_discount.allowance = 1000;
    }

    const availableDiscount = current_NU_discount.allowance;
    let result = 0;
    if (availableDiscount < commission) {
        result = commission - availableDiscount;
        current_NU_discount.allowance = result;
    } else {
        current_NU_discount.allowance = current_NU_discount.allowance - commission;
    }

    return result;
}

module.exports = {
    calculation,
    processDiscount
}