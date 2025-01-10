import bcrypt from "bcrypt";

// Fonction de hashage du mot de passe
export async function hashPassword(password: string): Promise<string | void> {
    if (!password || password.length < 6) {
        console.error('Mot de passe invalide: trop court ou vide');
        return;
    }

    try {
        // Génération du salt
        const saltRounds = 10; // Le nombre de rounds d'encryption
        const hash = await bcrypt.hash(password, saltRounds);
        
        return hash;
    } catch (err) {
        console.error('Erreur de hashage: ', err);
    }
}

// Fonction de vérification du mot de passe
export async function verifyPassword(hashedPassword: string, inputPassword: string): Promise<boolean> {
    try {

        // Vérification du mot de passe
        const result = await bcrypt.compare(inputPassword, hashedPassword);
        return result;
    } catch (err) {
        console.error('Erreur lors de la vérification: ', err);
        return false;
    }
}
