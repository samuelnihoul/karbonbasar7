import data from '../../data/contact-data'
export default function Contact() {
    return (
        <section className="bg-green-300 rounded-md m-[2rem] p-[2rem]" >
            <h1>Contact Us</h1>
            {data.map(
                (el) => {
                    return (
                        <ul key={el.title}>
                            <li>
                                <h3 className='font-bold'>{el.title}</h3>
                                <span>{el.description}</span>
                            </li></ul>
                    )
                }
            )}
        </section>
    )
}