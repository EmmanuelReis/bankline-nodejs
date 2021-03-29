const { describe, it } = require('mocha')
const { expect } = require('chai')

const { aPlan } = require('#test/builder/account-plan')

describe('Account plan tests', () => {
    it('Should be return "false" when trying to create a plan with an invalid name', () => {
        const plan = aPlan().withInvalidName().build()

        expect(plan.isValid()).to.be.false
    })

    it('Should be return "false" when trying to create a plan with an invalid type', () => {
        const plan = aPlan().withInvalidType().build()

        expect(plan.isValid()).to.be.false
    })

    it('Should be return "false" when trying to create a plan without user', () => {
        const plan = aPlan().withoutUser().build()

        expect(plan.isValid()).to.be.false
    })

    it('Should be return "true" when trying to create a valid plan', () => {
        const plan = aPlan().build()

        expect(plan.isValid()).to.be.true
    })
})