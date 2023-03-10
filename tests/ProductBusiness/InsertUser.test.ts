import { ProductBusiness } from "../../src/business/ProductBussiness"
import { IInputInsertUserDTO } from "../../src/interfaces/ProductsInterfaces"
import { GenerateIdMock } from "../mocks/GenerateIdMock"
import { UserDataBaseMock } from "../ProductTestMock/UserDataBaseMock"
import { ProductDataBaseMock } from "../ProductTestMock/ProductDataBaseMock"
import { BaseError } from "../../src/error/BaseError"

describe("InsertUser test",  () => {
    const productBusiness = new ProductBusiness(
        new ProductDataBaseMock(),
        new UserDataBaseMock(),
        new GenerateIdMock()
    )
    

    test("Sucess InsertUser", async () => {
        const input: IInputInsertUserDTO = {
            name: "TestLucas",
            delivery: "24/11/2023",
            StoreProduct: "20"
        }

        const response = await productBusiness.insertUser(input)

        expect(response.message).toBe("User created successfully")
    })


    test("Unfilled fields error", async () => {
        expect.assertions(2)
        try {
            const input: any = {
                delivery: "24/11/2023",
                StoreProduct: "20"
            }

            await productBusiness.insertUser(input)
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
            const input: any = {
                name: "TestLucas",
                delivery: "24/11/2023",
                StoreProduct: 20
            }

            await productBusiness.insertUser(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("store product was not passed as a string")
            }
        }
    })

    test("Error if data not found in database", async () => {
        expect.assertions(2)

        try {
            const input: IInputInsertUserDTO = {
                name: "TestLucas",
                delivery: "24/11/2023",
                StoreProduct: "123"
            }

            await productBusiness.insertUser(input)
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("resource not found")
            }
        }
        
    })
})