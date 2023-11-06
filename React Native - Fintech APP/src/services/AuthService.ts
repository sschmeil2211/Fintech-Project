import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

class Auth {

    // Método para registrar un nuevo usuario con email y contraseña
    static async signUp(email: string, password: string, phoneNumber: string): Promise<{ success: boolean, error?: string }> {
        try {
            await auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => userCredential.user.sendEmailVerification())
            return { success: true };
        }
        catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : 'An error occurred.';
            return { success: false, error: errorMessage };
        } 
    }

    // Método para iniciar sesión con email y contraseña
    static async signIn(email: string, password: string): Promise<{ success: boolean, error?: string }> {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            console.log("Signed in!");
            return { success: true };
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : 'An error occurred.';
            return { success: false, error: errorMessage };
        }
    }

    // Método para cerrar sesión
    static async signOut(): Promise<void> {
        auth()
            .signOut()
            .then(() => console.log("User signed out!"));
    }

    static async reloadUser(): Promise<void> {
        await auth().currentUser?.reload();
    }

    static async getEmailVerified(): Promise<boolean | undefined> {
        return auth().currentUser?.emailVerified;
    }

    static onAuthStateChanged(callback: (user: FirebaseAuthTypes.User | null) => void) {
        return auth().onAuthStateChanged(callback);
    }

    static getCurrentUser() {
        return auth().currentUser
    }
}

export default Auth;