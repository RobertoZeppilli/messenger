import { storage, db, auth } from '../firebase'
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'


export const uploadImg = async (img, user, setFunction) => {
    const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`)
    try {

        if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath))
        }
        const snap = await uploadBytes(imgRef, img)
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath))

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath
        })

        setFunction("")
        console.log(snap.ref.fullPath)
        console.log(url)

    } catch (error) {
        console.log(error.message)
    }

}

