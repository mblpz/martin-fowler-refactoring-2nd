export class Site {
    constructor(customer) {
        this._customer = customer;
    }

    get customer() {
        return (this._customer === "unknown") ? new UnknownCustomer() :  this._customer;
    }
}


export class Customer {
    constructor(name, billingPlan, paymentHistory) {
        this._name = name;
        this._billingPlan = billingPlan;
        this._paymentHistory = paymentHistory;
    }

    get name() {
        return this._name;
    }

    get billingPlan() {
        return this._billingPlan
    }

    set billingPlan(arg) {
        this._billingPlan = arg;
    }

    get paymentHistory() {
        return this._paymentHistory;
    }

    get isUnknown() {return false;}

}

export class UnknownCustomer {
    get isUnknown() {return true;}

    get name() {
        return "occupant";
    }
}

function isUnknown(arg) {
    if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
        throw new Error(`investigate bad value: <${arg}>`);

    return arg.isUnknown;
}


// client 1…

export function customerName(site) {
    return site.customer.name;
}


//client 2

const registry = {
    billingPlans: {
        basic: "basic"
    }
};

export function billingPlan(site) {
    const aCustomer = site.customer;

    const plan = isUnknown(aCustomer) ?
        registry.billingPlans.basic
        : aCustomer.billingPlan;

    return plan;
}


//client 3
export function changeBillingPlan(site, newPlan) {
    const aCustomer = site.customer;

    if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;
    return aCustomer;
}

//client 4
export function weeksDelinquent(site) {
    const aCustomer = site.customer;

    const weeksDelinquent = isUnknown(aCustomer) ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;
    return weeksDelinquent;
}
