import Product from './ProductInterface'
export default function ProductOverview(product: Product) {
    return (<>
        <p className="text-[2rem]">{product.name.FR}</p>
        <span className="p-10 text-m">${product.price}/0.1 CO2e tonne</span>
        <div className="my-4">
            <span className="mainColor">{t('quantity')}</span>
            <input
                className="placeholder-black text-black"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
            />
        </div>

        <div>
            {product.description.FR}
        </div>

        <div className="my-4">
            {product.tags.map(chip => <Chip label={t(chip)} key={chip} color="primary" />)}
        </div>

        <div>
            <span className="mainColor">{t('availablestock')}</span> {product.stock}
            <br />
            <span className="mainColor">{t('methodology')}</span> {product.methodology}
        </div>
    </>
    )
}