import Product from './ProductInterface'
export default function ProductDetail(product: Product) {

    return (
        <>
            <p>{product.description.FR}</p>
        </>
    )

}