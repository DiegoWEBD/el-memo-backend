import { type Request } from 'express'
import { type ProductServices } from '../../../application'
import { CustomError } from '../../../errors'
import { makeHttpResponse } from '../../../utils'
import { type HttpResponse } from '../../../utils/types'
import { adaptProduct } from '../product.adapter'

export const createProductRequestHandler = (
	productServices: ProductServices
) => {
	return async (request: Request): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				const products = await productServices.getProducts()
				return makeHttpResponse(200, products)
			}
			case 'POST': {
				const newProduct = request.body
				const product = await productServices.addProduct(
					newProduct.code,
					newProduct.description,
					newProduct.price,
					newProduct.buy_price,
					newProduct.stock
				)
				return makeHttpResponse(201, product)
			}
			case 'PUT': {
				const productCode = request.params.code
				const newValues = adaptProduct(request.body)
				const updatedProduct = await productServices.updateProduct(
					productCode,
					newValues
				)

				return makeHttpResponse(200, { updatedProduct })
			}
			case 'DELETE': {
				const productCode = request.params.code
				await productServices.deleteProduct(productCode)
				return makeHttpResponse(200, { message: 'Producto eliminado' })
			}
			default: {
				throw new CustomError(405, `Método ${request.method} no permitido`)
			}
		}
	}
}
