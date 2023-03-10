import { ProductBusiness } from "../../src/business/ProductBussiness"
import { BaseError } from "../../src/error/BaseError"
import { GenerateIdMock } from "../mocks/GenerateIdMock"
import { ProductDataBaseMock } from "../ProductTestMock/ProductDataBaseMock"
import { UserDataBaseMock } from "../ProductTestMock/UserDataBaseMock"




describe("GetProductsById test", () => {
    const productBusiness = new ProductBusiness(
      new ProductDataBaseMock(),
      new UserDataBaseMock(),
      new GenerateIdMock()
    )

    test("Sucess GetProductById", async () => {
        const id: string = "20"

        const response = await productBusiness.getProductById(id)

        expect(response.data.id).toBe("20")
    })

    test("Validation error when a parameter is not passed as 'string', 'number', etc", async () => {
       expect.assertions(2)
       try {
        const id: any = 20
        
        await productBusiness.getProductById(id)
       } catch (error) {
        if (error instanceof BaseError) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("id parameter is not in string format")
        }
       }
    })

    test("Unfilled fields error", async () => {
        expect.assertions(2)

        try {
             const input: any = undefined

             await productBusiness.getProductById(input)

        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Parameters not passed")
            }
            
        }
    })    

    test("Error if data not found in database", async () => {
        expect.assertions(2)
        try {
            const id: string = "14"

            await productBusiness.getProductById(id)
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("resource not found")
            }
        }

        
    })
})