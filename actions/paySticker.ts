'use server'
import db from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import schema from '@/schemas/address'
export default async function (data: FormData) {
    const address = data.get('address')
    const zip = data.get('zip')
    const city = data.get('city')
    const country = data.get('country')
    const email = data.get('email')
    const doc = {
        address,
        zip,
        city,
        country,
        email
    }
    try { schema.parse(doc) }
    catch { alert('Please verify your form data.') }
    addDoc(collection(db, 'purchases'), doc)
}