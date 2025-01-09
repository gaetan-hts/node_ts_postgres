import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string | void> {
    if (!password || password.length < 6) { // Vérification manuelle
        console.error('Mot de passe invalide: trop court ou vide');
        return;
    }

    // On va hash un mot de passe
    try {
        const hash = await argon2.hash(password, {
            type: argon2.argon2id, // utilisation de l'algo argon2id pour le hashage -> le + recommandé

            // v options hardware en dessous
            memoryCost: 2 ** 16, // 2^16=65536=64MB
            timeCost: 3, // 3 passes -> cad 3 itérations pour le hashage
            parallelism: 1, // 1 thread (coeur CPU) utilisé pour le hashage 
            salt: Buffer.from("SuperSaltGentil") // "clé" ou salt de hashage pour rendre le hashage unique
        })

        console.log('Mot de passe hashé: ', hash);
        return hash;
    } catch (err) {
        console.error('Erreur de hashage: ', err);
    }
}

// On vérifie que le mot de passe hashé et en clair matches bien
export async function verifyPassword(hashedPassword: string, inputPassword: string): Promise<boolean> {
    try {
        console.log(hashedPassword);
        console.log(inputPassword);

        const result = await argon2.verify(hashedPassword, inputPassword);
        console.log(result);
        return result
        
    } catch (err) {
        console.error('Erreur lors de la vérification: ', err);
        return false;
    }
}
