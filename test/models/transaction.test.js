const { describe, it } = require('mocha')
const { expect } = require('chai')

const { aTransaction } = require('#test/builder/transaction')

describe('Transaction tests', () => {
    it('Should be return "false" when trying to create a transaction with an invalid value', () => {
        const transaction = aTransaction().withInvalidValue().build()

        expect(transaction.isValid()).to.be.false
    })

    it('Should be return "false" when trying to create a transaction with an invalid type', () => {
        const transaction = aTransaction().withInvalidType().build()

        expect(transaction.isValid()).to.be.false
    })

    it('Should be return "false" when trying to create a transaction without source account', () => {
        const transaction = aTransaction().withoutSourceAccount().build()

        expect(transaction.isValid()).to.be.false
    })

    it('Should be return "false" when trying to create a transaction of type TRANSFERENCIA without target account', () => {
        const transaction = aTransaction().invalidTransfer().build()
        
        expect(transaction.isValid()).to.be.false
    })

    it('Should be return "true" when trying to create a valid transaction', () => {
        const transaction = aTransaction().build()

        expect(transaction.isValid()).to.be.true
    })
})