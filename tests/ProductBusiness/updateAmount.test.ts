import { ProductBusiness } from "../../src/business/ProductBussiness"
import { BaseError } from "../../src/error/BaseError"
import { IAmountProductInputDTO } from "../../src/interfaces/ProductsInterfaces"
import { GenerateIdMock } from "../mocks/GenerateIdMock"
import { ProductDataBaseMock } from "../ProductTestMock/ProductDataBaseMock"
import { UserDataBaseMock } from "../ProductTestMock/UserDataBaseMock"



describe("UpdateAmount test", () => {
    const productBusiness = new ProductBusiness(
        new ProductDataBaseMock(),
        new UserDataBaseMock(),
        new GenerateIdMock()
    )

    test("sucess updateAmount", async () => {
        const input: IAmountProductInputDTO = {
            id: "20",
            amount: 5
        }

        const response = await productBusiness.updateAmount(input)

        expect(response.message).toBe("updated product")
    })

    test("Unfilled fields error", async () => {
        expect.assertions(2)
        try {
            const amount = 20 as any

            await productBusiness.updateAmount(amount)

        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Parameters not passed")
            }
        }
    })

    test("Validation error when a parameter is not passed as 'string', 'number', etc", async () => {
        expect.assertions(2)
        try {
            const input = {
                id: "20",
                amount: "!212121"
            } as any
            
            await productBusiness.updateAmount(input)
            
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("amount parameter is not in number")
            }
        }
    })

    test("Error if data not found in database", async () => {
        expect.assertions(2)
        try {
            const input: IAmountProductInputDTO = {
                id: "19",
                amount: 5
            }

            await productBusiness.updateAmount(input)
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("resource not found")
            }
            
            
        }
    })
})