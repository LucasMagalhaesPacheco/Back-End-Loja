import { ProductBusiness } from "../../src/business/ProductBussiness"
import { BaseError } from "../../src/error/BaseError"
import { IGetProductsInputDTO } from "../../src/interfaces/ProductsInterfaces"
import { GenerateIdMock } from "../mocks/GenerateIdMock"
import { ProductDataBaseMock } from "../ProductTestMock/ProductDataBaseMock"
import { UserDataBaseMock } from "../ProductTestMock/UserDataBaseMock"


describe("GetAllProducts test", () => {
    const productBusiness =  new ProductBusiness(
        new ProductDataBaseMock(),
        new UserDataBaseMock(),
        new GenerateIdMock()
    )

    test("Sucess GetAllProducts", async () => {
        const input: IGetProductsInputDTO = {
            search: "",
            order: "name",
            sort: "ASC",
            limit: "10",
            page: "1"

        }

        const response = await productBusiness.getAllProducts(input)

        expect(response.data.length).toBe(7)
    })

    test("Validation error when a parameter is not passed as 'string', 'number', etc", async () => {
        expect.assertions(2)
        try {
            const input = {
                search: "",
                order: 2,
                sort: "ASC",
                limit: "10",
                page: "1"
            } as any 

            await productBusiness.getAllProducts(input)
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Your ordering is not in string format")
            }
        }
    })
})